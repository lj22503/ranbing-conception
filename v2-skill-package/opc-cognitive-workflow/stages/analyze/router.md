# 分析阶段路由器

## 触发条件

理解阶段完成后，或用户直接表达"帮我分析/判断/决定 XXX"。

## 路由逻辑（二维决策）

### 第一维：判断任务类型

| 任务类型 | 用户表述特征 | 对应框架 |
|---------|------------|---------|
| 价值判断 | "值不值得""要不要做""选哪个" | value-cost-matrix / four-dimension-evaluation |
| 根源诊断 | "为什么""什么原因""根在哪" | element-analysis / first-principles-thinking |
| 战略选择 | "下一步怎么走""路线选哪个" | swot-analysis / cross-longitudinal-analysis / value-cost-matrix |
| 结构拆解 | "怎么分解""拆开看" | element-analysis / first-principles-thinking |
| 风险评估 | "有什么风险""最坏会怎样" | swot-analysis / four-dimension-evaluation |

### 第二维：选择框架来源

同理解层，列出 builtin + discovered + custom 选项让用户选。

### 输出：进入对应 frameworks/<framework>/skills/SKILL.md

## 标准化 Skill 索引

| Framework | Skill File | Description Trigger |
|-----------|------------|-------------------|
| swot-analysis | swot/skills/SKILL.md | "strategy", "competitive", "positioning", "risk" |
| first-principles-thinking | first-principles/skills/SKILL.md | "从根基", "推倒重来", "假设是什么" |
| four-dimension-evaluation | four-dimension/skills/SKILL.md | "可信吗", "怎么判断", "靠不靠谱" |
| element-analysis | element/skills/SKILL.md | "要素", "拆解", "组成部分" |
| value-cost-matrix | value-cost/skills/SKILL.md | "优先级", "取舍", "资源分配" |
| cross-longitudinal-analysis | cross-longitudinal/skills/SKILL.md | "来龙去脉", "时间线", "对比", "演进" |

## Skill 加载规则

使用 Skill 工具加载标准化的 SKILL.md 文件。每个 skill 包含：
- description: 自动发现触发词
- When to Use: 显式触发条件
- Core Framework: 核心方法
- Implementation Steps: 执行步骤
- Common Mistakes: 避坑指南
- Completion Criteria: 完成标志
