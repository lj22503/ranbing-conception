# ranbing-conception

燃冰认知模型 — 理解 → 分析 → 执行 → 交付，三个形态的完整实现。

## 项目结构

```
conceptionOS skill/
├── conception 想法.txt           # 原始设计文档
├── v1-prompt/                    # Prompt 版（1 个文件）
│   └── dist/prompt.txt           # 复制粘贴到 Agent 系统提示词
├── v2-skill-package/             # Skill 包版（35 个文件）
│   └── opc-cognitive-workflow/   # 放入 Agent skill 目录
└── v3-cli/                       # CLI 版（14 个文件）
    └── opc-cli/                  # npm install -g && opc start
```

## 三个版本

| 版本 | 文件数 | 适用场景 |
|------|--------|---------|
| Prompt 版 | 1 | 任意 Agent，复制粘贴系统提示词即可 |
| Skill 包 | 35 | Claude/Cursor 等支持 skill 加载的 Agent |
| CLI 版 | 14 | 终端、自动化脚本、CI/CD |

## 四步认知模型

```
理解 → 分析 → 执行 → 交付
```

每个阶段 Agent 做三件事：**判断 → 提供选项 → 引导走完**。不替用户下结论，不跳步。

## 安装

### Prompt 版

复制 `v1-prompt/dist/prompt.txt` 全文到 Agent 系统提示词。

### Skill 包

将 `v2-skill-package/opc-cognitive-workflow/` 整个目录放入 Agent 的 skill 目录。

### CLI 版

```bash
cd v3-cli/opc-cli
npm install
npm start "你的问题"
```

或全局安装：

```bash
npm install -g ./v3-cli/opc-cli
opc start "你的问题"
```

## License

MIT
