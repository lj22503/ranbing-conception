# opc-cognitive-workflow

燃冰认知模型 Skill 包。基于四步认知循环：**理解 → 分析 → 执行 → 交付**。

## v2.0 更新

分析层框架已升级为标准化 SKILL.md 格式，支持 AI 自动发现和加载。

## 安装

将整个 `opc-cognitive-workflow/` 目录放入 Agent 的 skill 目录即可。

## 结构

```
opc-cognitive-workflow/
├── package.json              # 包元数据
├── README.md                 # 本文件
├── initialize.md             # 初始化引导
├── core/
│   └── SKILL.md              # 总纲：四步模型 + 核心原则
├── stages/
│   ├── understand/           # 理解层
│   │   ├── router.md         # 路由：判断类型 → 选方法
│   │   └── methods/          # 4种理解方法
│   ├── analyze/              # 分析层 (v2.0 标准化)
│   │   ├── router.md         # 路由：判断任务类型 → 选框架
│   │   └── frameworks/       # 6种分析框架 (标准化)
│   │       ├── swot/skills/SKILL.md
│   │       ├── first-principles/skills/SKILL.md
│   │       ├── four-dimension/skills/SKILL.md
│   │       ├── element/skills/SKILL.md
│   │       ├── value-cost/skills/SKILL.md
│   │       └── cross-longitudinal/skills/SKILL.md
│   ├── execute/              # 执行层
│   │   ├── router.md         # 路由：判断方法类型 + 产出形态
│   │   └── methods/          # 3种执行方法
│   └── deliver/              # 交付层
│       ├── router.md         # 路由：判断交付类型 + 产出形态
│       └── checklists/        # 3类检查清单
├── loops/
│   ├── execute-checkpoint.md # 执行检查点
│   ├── quality-gate.md       # 质量门
│   ├── internal-handoff.md   # 内部交付检查
│   └── degradation-detection.md # 退化检测
├── registry/
│   ├── tools-index.md        # 工具总索引
│   ├── scores/index.md       # 评分记录
│   ├── add-tool.md          # 添加工具模板
│   └── discovered/
│       └── index.md          # 20个外部skill + 6个内置标准化skill索引
└── memory/
    ├── user-profile.md       # 用户画像
    └── session-logs/        # 会话日志
```

## 使用

Agent 加载后自动按四步模型引导对话。核心原则：**不替用户下结论，只提供框架和选项**。

分析层框架已标准化，可使用 Skill 工具直接加载：
- `stages/analyze/frameworks/swot/skills/SKILL.md`
- `stages/analyze/frameworks/first-principles/skills/SKILL.md`
- `stages/analyze/frameworks/four-dimension/skills/SKILL.md`
- `stages/analyze/frameworks/element/skills/SKILL.md`
- `stages/analyze/frameworks/value-cost/skills/SKILL.md`
- `stages/analyze/frameworks/cross-longitudinal/skills/SKILL.md`

## v2.0 标准化内容

| Skill | Description | When to Use |
|-------|-------------|--------------|
| swot-analysis | 战略分析框架 | "strategy", "competitive", "positioning" |
| first-principles-thinking | 第一性原理思考 | "从根基", "推倒重来", "假设" |
| four-dimension-evaluation | 四维评估法 | "可信吗", "判断", "评估可靠" |
| element-analysis | 要素分析法 | "拆解", "要素", "结构" |
| value-cost-matrix | 价值成本矩阵 | "优先级", "取舍", "值不值得" |
| cross-longitudinal-analysis | 横纵分析法 | "来龙去脉", "竞品对比", "时间线" |
