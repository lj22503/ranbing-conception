# 添加新工具

## 添加 builtin 工具

在对应的 `stages/<stage>/methods/` 或 `stages/<stage>/frameworks/` 目录下新建 `.md` 文件，并更新 `router.md` 和 `tools-index.md`。

## 添加 discovered 工具

在 `registry/discovered/index.md` 中新增一条目：

```markdown
### [序号]. [名称] — [作者]

| 字段 | 内容 |
|------|------|
| **名称** | `[skill名称]` |
| **作者** | [作者名] |
| **功能** | [一句话描述] |
| **阶段映射** | 理解 / 分析 / 执行 / 交付 |
| **类型/形态** | [具体类型或产出形态] |
| **安装命令** | [实际可执行的安装命令] |
| **来源类型** | `discovered` |
| **推荐权重** | 7.0（初始） |
```

## 添加 custom 工具

用户自行安装的外部 skill 会被自动扫描识别，无需手动添加。
