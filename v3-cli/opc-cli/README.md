# @opc/cli

认知循环 CLI —— 在终端里跑通 **理解 → 分析 → 执行 → 交付**。

## 安装

```bash
npm install -g @opc/cli
```

或直接使用：

```bash
npx @opc/cli start "你的问题"
```

## 配置

创建 `.env` 文件：

```env
ANTHROPIC_API_KEY=sk-ant-...
OPC_MODEL=claude-3-5-sonnet-20241022
```

## 使用

### 交互模式

```bash
opc start "要不要引入AI生成UI组件库？"
```

按提示选择工具，每个阶段完成后确认是否继续。

### 自动模式

```bash
opc start "要不要引入AI生成UI组件库？" --auto
```

全程不等待输入，直接跑完输出结果。

### 指定分析框架（自动模式）

```bash
opc start "要不要引入AI生成UI组件库？" --auto --framework value-cost
```

### 断点续跑

```bash
opc list                     # 查看所有会话
opc resume <session-id>      # 从断点继续
```

## 阶段说明

| 阶段 | 产出 | 下一阶段输入 |
|------|------|-------------|
| 理解 | 理解摘要 + 冲突点 + 迁移场景 | 分析阶段输入 |
| 分析 | 结论 + 行动方案 | 执行阶段输入 |
| 执行 | 实际产出物 + 文件路径 | 交付阶段输入 |
| 交付 | 交付类型 + 接收方 + 确认状态 | 循环完成 |

## 会话存储

所有会话保存在 `~/.opc/sessions/`，JSON 格式，支持断点续跑。

## 与 Skill 包 / Prompt 版的关系

| 版本 | 适用场景 |
|------|---------|
| Skill 包 | Claude/Cursor 等支持 skill 加载的 Agent |
| Prompt 版 | 任意 Agent（复制粘贴系统提示词） |
| CLI 版 | 终端、自动化脚本、CI/CD、不想依赖特定 Agent 平台 |

## License

MIT
