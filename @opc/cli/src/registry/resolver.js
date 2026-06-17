// src/registry/resolver.js

const FALLBACK_TOOLS = {
  understand: [
    { id: 'builtin-concept', name: '概念法', description: '理解抽象概念（"这是什么"类）' },
    { id: 'builtin-situation', name: '情境法', description: '理解现象/趋势（"为什么"类）' },
    { id: 'builtin-person', name: '人物法', description: '理解人/角色行为动机' },
    { id: 'builtin-system', name: '系统法', description: '理解系统结构和机制' },
  ],
  analyze: [
    { id: 'builtin-value-cost', name: '价值-成本矩阵', description: '多选项排优先级' },
    { id: 'builtin-four-dimension', name: '四维评估', description: '来源/逻辑/假设/可验证' },
    { id: 'builtin-element', name: '要素分析', description: 'MECE 结构化拆解' },
    { id: 'builtin-first-principles', name: '第一性原理', description: '颠覆假设，从根基重建' },
    { id: 'builtin-swot', name: 'SWOT', description: '优势/劣势/机会/威胁分析' },
    { id: 'builtin-cross-longitudinal', name: '横纵分析', description: '时间线 + 跨期对比' },
  ],
  execute: [
    { id: 'builtin-plan-driven', name: '计划驱动', description: '目标清晰，按步骤执行' },
    { id: 'builtin-feedback-driven', name: '反馈驱动', description: '边做边调，快速迭代' },
    { id: 'builtin-exploratory', name: '探索驱动', description: '目标模糊，探索方向' },
  ],
  deliver: [
    { id: 'builtin-external', name: '外部交付', description: '给客户/老板/用户' },
    { id: 'builtin-internal', name: '内部交付', description: '给下一步/团队' },
    { id: 'builtin-cognitive', name: '认知交付', description: '给别人大脑传播思想/方法' },
  ],
};

export async function resolveTools(stage) {
  const tools = FALLBACK_TOOLS[stage] || [];
  return tools;
}
