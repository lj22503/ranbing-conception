# 执行阶段路由器

## 触发条件

分析阶段完成后，用户有了行动方案。

## 路由逻辑（二维决策）

### 第一维：判断执行方法

| 特征 | 方法 |
|------|------|
| 目标明确、路径清晰 | 计划驱动 |
| 目标明确、路径不确定 | 反馈驱动 |
| 目标模糊、边走边看 | 探索驱动 |

### 第二维：判断产出形态

| 产出形态 | 对应工具 |
|---------|---------|
| 文档/文章 | Auto-WeChat-Writing / huashu-skills |
| 数据/表格 | csv-data-summarizer |
| PPT | guizang-ppt-skill / huashu-skills |
| 配图/卡片 | canghe-skills / any2html / qiaomu-info-card-designer |
| 代码 | mattpocock-skills / superpowers-zh / opc-skills |
| 翻译 | translate-book |
| 其他 | 使用内置逻辑 |

### 第三维：选择来源（builtin / discovered / custom）

与理解层相同。

### 输出：进入对应 methods/<method>.md 的引导流程
