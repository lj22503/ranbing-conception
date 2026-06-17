import fs from 'fs/promises';
import path from 'path';

const FALLBACK_TOOLS = {
  understand: [
    { id: 'builtin-concept', name: '概念法', description: '理解抽象概念' },
    { id: 'builtin-situation', name: '情境法', description: '理解现象/情境' },
    { id: 'builtin-person', name: '人物法', description: '理解人物角色' },
    { id: 'builtin-system', name: '系统法', description: '理解系统结构' },
    { id: 'discovered-ljg-skills', name: 'ljg-skills（李继刚）', description: '认知工具箱' },
    { id: 'discovered-soul-skill', name: 'soul.skill（废墟里）', description: '灵魂提取术' },
  ],
  analyze: [
    { id: 'builtin-value-cost', name: '价值-成本矩阵', description: '判断优先级' },
    { id: 'builtin-four-dimension', name: '四维评估', description: '来源/逻辑/假设/可验证' },
    { id: 'builtin-element', name: '要素分析', description: 'MECE拆解' },
    { id: 'builtin-first-principles', name: '第一性原理', description: '推翻假设重建' },
    { id: 'builtin-swot', name: 'SWOT', description: '优势/劣势/机会/威胁' },
    { id: 'builtin-cross-longitudinal', name: '横纵分析', description: '时间+空间交叉' },
    { id: 'discovered-hv-analysis', name: 'hv-analysis（卡兹克）', description: '横纵深度研究' },
    { id: 'discovered-slavingia', name: 'slavingia-skills', description: '极简创业十件套' },
  ],
  execute: [
    { id: 'builtin-plan-driven', name: '计划驱动', description: '明确路径按步走' },
    { id: 'builtin-feedback-driven', name: '反馈驱动', description: '边做边调' },
    { id: 'builtin-exploratory', name: '探索驱动', description: '目标模糊边走边看' },
    { id: 'discovered-huashu', name: 'huashu-skills（花叔）', description: '内容创作21合1' },
    { id: 'discovered-canghe', name: 'canghe-skills（苍何）', description: '配图·发布·格式' },
    { id: 'discovered-superpowers-zh', name: 'superpowers-zh', description: 'AI编程超能力' },
  ],
  deliver: [
    { id: 'builtin-external', name: '外部交付', description: '给客户/老板/用户' },
    { id: 'builtin-internal', name: '内部交付', description: '给下一步' },
    { id: 'builtin-cognitive', name: '认知交付', description: '给别人大脑' },
    { id: 'discovered-khazix-writer', name: 'khazix-writer（卡兹克）', description: '四层自检写作' },
    { id: 'discovered-guizang-ppt', name: 'guizang-ppt-skill（归藏）', description: '网页PPT生成' },
    { id: 'discovered-impeccable', name: 'impeccable', description: '设计反模式词典' },
  ],
};

async function loadDiscoveredFromFile() {
  try {
    const cwd = process.cwd();
    const indexPath = path.join(cwd, 'registry', 'discovered', 'index.md');
    await fs.access(indexPath);
    return { loaded: true, path: indexPath };
  } catch {
    return { loaded: false };
  }
}

export async function resolveTools(stage, context) {
  const discovered = await loadDiscoveredFromFile();
  let tools = FALLBACK_TOOLS[stage] || [];

  tools.sort((a, b) => {
    if (a.id.startsWith('builtin') && !b.id.startsWith('builtin')) return -1;
    if (!a.id.startsWith('builtin') && b.id.startsWith('builtin')) return 1;
    return 0;
  });

  return tools;
}
