import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import chalk from 'chalk';
import inquirer from 'inquirer';

import { callLLM } from './llm.js';
import { getStagePrompt } from '../prompts/templates.js';
import { resolveTools } from '../registry/resolver.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SESSIONS_DIR = path.join(os.homedir(), '.opc', 'sessions');

await fs.mkdir(SESSIONS_DIR, { recursive: true });

// ===== 状态管理 =====

function getSessionPath(sessionId) {
  return path.join(SESSIONS_DIR, `${sessionId}.json`);
}

async function loadState(sessionId) {
  const raw = await fs.readFile(getSessionPath(sessionId), 'utf-8');
  return JSON.parse(raw);
}

async function saveState(state) {
  state.updatedAt = new Date().toISOString();
  await fs.writeFile(getSessionPath(state.id), JSON.stringify(state, null, 2));
}

function generateSessionId() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function getDefaultState(question, options) {
  return {
    id: generateSessionId(),
    question,
    auto: options.auto || false,
    model: options.model || 'claude-3-5-sonnet-20241022',
    currentStage: 'understand',
    completed: false,
    context: { rawInput: question },
    history: [],
    options: {
      selectedFramework: options.framework || null,
      selectedTool: null,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ===== 阶段路由 =====

const STAGE_ORDER = ['understand', 'analyze', 'execute', 'deliver'];

function getNextStage(current) {
  const idx = STAGE_ORDER.indexOf(current);
  return idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : null;
}

// ===== 阶段执行器 =====

async function runStage(state) {
  const stageName = state.currentStage;

  console.log(chalk.cyan(`\n${'─'.repeat(56)}`));
  console.log(chalk.cyan(`▶ ${stageName.toUpperCase()} 阶段`));
  console.log(chalk.cyan(`${'─'.repeat(56)}`));

  // 1. 加载阶段模块
  const stageModule = await import(`../stages/${stageName}.js`);

  // 2. 解析可用工具
  const availableTools = await resolveTools(stageName, state.context);

  // 3. 选择工具
  let selectedTool = state.options.selectedTool;
  if (!selectedTool) {
    if (state.auto && state.options.selectedFramework) {
      selectedTool =
        availableTools.find((t) =>
          t.id.includes(state.options.selectedFramework)
        )?.id || availableTools[0]?.id;
    } else if (state.auto) {
      selectedTool = availableTools[0]?.id;
    }
  }

  if (!state.auto && !selectedTool) {
    const choices = [
      ...availableTools.map((t) => ({
        name: `${t.name} — ${t.description || ''}`,
        value: t.id,
      })),
      { name: '【使用内置逻辑】', value: 'builtin' },
    ];

    const { tool } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tool',
        message: '选择工具：',
        choices,
      },
    ]);
    selectedTool = tool;
    state.options.selectedTool = selectedTool;
  }

  // 4. 构建 prompt 并调用 LLM
  const prompt = getStagePrompt(stageName, {
    context: state.context,
    selectedTool,
    history: state.history,
    auto: state.auto,
  });

  console.log(chalk.gray(`  调用 ${state.model} …`));
  const response = await callLLM(prompt, state.model);

  // 5. 解析产出
  const output = stageModule.parse(response, state.context);

  // 6. 记录历史
  state.history.push({
    stage: stageName,
    tool: selectedTool,
    input: state.context,
    output,
    timestamp: new Date().toISOString(),
  });

  // 7. 更新 context（下一阶段输入 = 本阶段产出）
  state.context = {
    ...state.context,
    [`${stageName}Output`]: output,
    rawInput:
      output.summary ||
      output.conclusion ||
      output.output ||
      output.actionPlan ||
      '完成',
  };

  // 8. 展示结果摘要
  console.log(chalk.green(`  ✅ ${stageName} 完成`));
  if (output.summary) console.log(chalk.gray(`  ${output.summary}`));
  if (output.conclusion) console.log(chalk.gray(`  结论：${output.conclusion}`));
  if (output.actionPlan) console.log(chalk.gray(`  方案：${output.actionPlan}`));

  // 9. 保存状态
  await saveState(state);

  // 10. 判断下一阶段
  const next = getNextStage(stageName);
  if (!next) {
    state.completed = true;
    await saveState(state);
    console.log(chalk.green('\n🎉 认知循环完成！'));
    console.log(chalk.gray(`会话 ID: ${state.id}`));
    console.log(chalk.gray(`日志: ${getSessionPath(state.id)}`));
    return;
  }

  if (state.auto) {
    state.currentStage = next;
    await runStage(state);
    return;
  }

  // 交互模式：询问是否继续
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: `进入 ${next} 阶段？`,
      default: true,
    },
  ]);

  if (proceed) {
    state.currentStage = next;
    state.options.selectedTool = null; // 清空工具选择，下一阶段重新选
    await runStage(state);
  } else {
    console.log(
      chalk.yellow(`\n⏸ 已暂停。运行 opc resume ${state.id} 继续。`)
    );
    await saveState(state);
  }
}

// ===== 公开 API =====

export async function startSession(question, options) {
  const state = getDefaultState(question, options);
  await saveState(state);
  console.log(chalk.gray(`会话 ID: ${state.id}`));
  await runStage(state);
}

export async function resumeSession(sessionId) {
  const state = await loadState(sessionId);
  if (state.completed) {
    console.log(chalk.green('✅ 会话已完成'));
    return;
  }
  console.log(chalk.gray(`从 ${state.currentStage} 继续 …`));
  await runStage(state);
}

export async function listSessions() {
  const files = await fs.readdir(SESSIONS_DIR);
  const sessions = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    try {
      const raw = await fs.readFile(path.join(SESSIONS_DIR, file), 'utf-8');
      const data = JSON.parse(raw);
      sessions.push({
        id: data.id,
        question: data.question,
        currentStage: data.currentStage,
        completed: data.completed || false,
        updatedAt: data.updatedAt,
      });
    } catch {
      // 忽略损坏的文件
    }
  }
  sessions.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return sessions;
}
