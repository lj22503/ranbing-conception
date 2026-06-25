# 燃冰认知模型（ranbing-conception）

> 理解 → 分析 → 执行 → 交付，四步认知模型。三个形态适配不同使用方式。

---

## 解决什么问题？

| 现状 | 用燃冰认知模型 |
|------|-------------|
| AI 输出的东西没有你的风格 | Context 不可复制，模型学习你的认知方式 |
| 团队决策没有统一框架 | 四步模型统一语言：理解→分析→执行→交付 |
| 不知道用哪个版本 | Prompt 版/Skill 包版/CLI 版，按场景选 |
| 流程跑完没有产出 | 每步强制输出：判断 + 选项 + 引导 |

---

## 四步认知模型

```
理解 → 分析 → 执行 → 交付
```

每一步 AI 做三件事：**判断 → 提供选项 → 引导走完**。不替用户下结论，不跳步。

---

## 三个版本，怎么选？

| 版本 | 适用场景 | 复杂度 |
|------|---------|--------|
| **Prompt 版** | 任意 AI Agent，复制粘贴系统提示词 | ⭐ 最简 |
| **Skill 包版** | Claude/Cursor 等支持 Skill 加载的 Agent | ⭐⭐ 中等 |
| **CLI 版** | 终端、自动化脚本、CI/CD | ⭐⭐⭐ 完整 |

---

## 快速开始

**Prompt 版（最简单）**
复制 `v1-prompt/dist/prompt.txt` 全文到 AI 系统提示词。

**Skill 包版（推荐）**
将 `v2-skill-package/opc-cognitive-workflow/` 放入 Agent 的 skill 目录。

**CLI 版**
```bash
cd v3-cli/opc-cli && npm install && npm start "你的问题"
# 或全局安装
npm install -g ./v3-cli/opc-cli && opc start "你的问题"
```

---

## 触发词映射（Agent 调用索引）

| 用户说 | 调用版本 |
|--------|---------|
| "用认知模型分析" | Prompt 版（直接加到系统提示词） |
| "加载认知Workflow" | Skill 包版 |
| "命令行跑认知流程" | CLI 版 |
| "帮我理解这个问题" | 理解步 |
| "帮我分析下" | 分析步 |
| "下一步怎么做" | 执行步 |

---

## 项目结构

```
ranbing-conception/
├── v1-prompt/dist/prompt.txt        # Prompt 版（1 个文件）
├── v2-skill-package/opc-cognitive-workflow/  # Skill 包版（35 个文件）
└── v3-cli/opc-cli/                 # CLI 版（14 个文件）
```

---

## FAQ

**Q：三个版本功能一样吗？**

A：核心模型完全一致，区别只是接入方式。Prompt 版直接改系统提示词，Skill 版更结构化，CLI 版支持脚本自动化。

**Q：和其他 Agent 框架有什么区别？**

A：燃冰模型专注"认知过程"，不是"任务分解"。每步强制要求 AI 做判断+选项+引导，不替用户做决定。

**Q：适合什么团队用？**

A：适合需要统一决策语言的产品/运营/战略团队。四步模型让讨论不跑偏。

---

*版本：v1.0 | MIT License*
