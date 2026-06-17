# 工具注册表

## 索引

### 理解阶段

| 工具 ID | 名称 | 描述 | 推荐场景 |
|--------|------|------|---------|
| builtin-concept | 概念法 | 理解抽象概念 | "这是什么"类问题 |
| builtin-situation | 情境法 | 理解现象/趋势 | "为什么"类问题 |
| builtin-person | 人物法 | 理解人/角色 | 理解他人 |
| builtin-system | 系统法 | 理解系统结构 | 理解架构/机制 |
| ljg-skills | ljg-skills（李继刚） | 认知工具箱 | 综合理解 |

### 分析阶段

| 工具 ID | 名称 | 描述 | 推荐场景 |
|--------|------|------|---------|
| builtin-value-cost | 价值-成本矩阵 | 判断优先级 | 多选项排序 |
| builtin-four-dimension | 四维评估 | 来源/逻辑/假设/可验证 | 判断可靠性 |
| builtin-element | 要素分析 | MECE拆解 | 结构化拆解 |
| builtin-first-principles | 第一性原理 | 推翻假设重建 | 颠覆性思考 |
| builtin-swot | SWOT | 优势/劣势/机会/威胁 | 竞争分析 |
| hv-analysis | hv-analysis（卡兹克） | 横纵深度研究 | 深度调研 |
| slavingia | slavingia-skills | 极简创业十件套 | 创业决策 |

### 执行阶段

| 工具 ID | 名称 | 描述 | 推荐场景 |
|--------|------|------|---------|
| builtin-plan-driven | 计划驱动 | 按步执行 | 目标清晰 |
| builtin-feedback-driven | 反馈驱动 | 边做边调 | 目标部分清晰 |
| builtin-exploratory | 探索驱动 | 目标模糊 | 探索方向 |
| huashu | huashu-skills（花叔） | 内容创作21合1 | 内容生产 |
| superpowers-zh | superpowers-zh | AI编程超能力 | 代码任务 |

### 交付阶段

| 工具 ID | 名称 | 描述 | 推荐场景 |
|--------|------|------|---------|
| builtin-external | 外部交付 | 给客户/老板 | 外部沟通 |
| builtin-internal | 内部交付 | 给下一步 | 内部传递 |
| builtin-cognitive | 认知交付 | 给他人大脑 | 知识传播 |
| khazix-writer | khazix-writer（卡兹克） | 四层自检写作 | 文字交付 |
| guizang-ppt | guizang-ppt-skill（归藏） | 网页PPT生成 | 演示交付 |

## 评分存储

每个工具的评分记录在 `scores/<tool-id>.md`，格式：

```markdown
# <工具名> 评分

- 总使用次数：N
- 平均分：X.X / 5
- 最近3次评分：3, 4, 5
- 状态：活跃 | 降权 | 待替换
- 最后使用：YYYY-MM-DD
```
