# Registry 目录说明

## 目录结构

```
registry/
├── tools-index.md          # 工具总索引
├── add-tool.md            # 添加工具模板
├── scores/                # 评分记录
│   └── index.md
└── discovered/            # 发现的外部skill索引
    └── index.md           # 20个外部skill + 6个内置标准化skill
```

## Discovered Skill 索引

`discovered/index.md` 记录了用户已安装的20个外部skill，包括：
- ljg-skills（李继刚）
- huashu-skills（花叔）
- khazix-writer、hv-analysis 等

以及v2.0新增的内置标准化skill（swot-analysis、first-principles-thinking等）。

这些skill可直接调用，当用户在认知循环中需要特定能力时，可通过Skill工具加载。
