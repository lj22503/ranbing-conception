#!/usr/bin/env node

import { createRequire } from 'module';
import { program } from 'commander';
import chalk from 'chalk';
import { startSession, resumeSession, listSessions } from '../src/core/engine.js';
import { validateConfig } from '../src/utils/config.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

program
  .name('opc')
  .description('认知循环 CLI —— 理解 → 分析 → 执行 → 交付')
  .version(version);

program
  .command('start <question>')
  .description('开始一个新的认知循环')
  .option('--auto', '自动模式（不交互，直接跑完）')
  .option('--framework <name>', '指定分析框架（自动模式使用）')
  .option('--model <name>', '指定 LLM 模型', 'claude-3-5-sonnet-20241022')
  .action(async (question, options) => {
    if (!validateConfig()) {
      process.exit(1);
    }
    try {
      await startSession(question, options);
    } catch (error) {
      console.error(chalk.red('❌'), error.message);
      process.exit(1);
    }
  });

program
  .command('resume [session-id]')
  .description('继续未完成的会话')
  .action(async (sessionId) => {
    if (!sessionId) {
      const sessions = await listSessions();
      if (sessions.length === 0) {
        console.log(chalk.yellow('没有未完成的会话。'));
        return;
      }
      console.log(chalk.blue('未完成的会话:'));
      sessions.forEach((s, i) => {
        console.log(`  ${i + 1}. ${s.id} — ${s.question} (${s.currentStage})`);
      });
      console.log(chalk.gray('\n运行 opc resume <session-id> 继续'));
    } else {
      try {
        await resumeSession(sessionId);
      } catch (error) {
        console.error(chalk.red('❌'), error.message);
        process.exit(1);
      }
    }
  });

program
  .command('list')
  .description('列出所有会话')
  .action(async () => {
    const sessions = await listSessions();
    if (sessions.length === 0) {
      console.log(chalk.gray('还没有会话记录。'));
      return;
    }
    sessions.forEach((s) => {
      const status = s.completed
        ? chalk.green('✅ 完成')
        : chalk.yellow(`⏳ ${s.currentStage}`);
      console.log(`${status}  ${s.id} — ${s.question}`);
    });
  });

program.parse();
