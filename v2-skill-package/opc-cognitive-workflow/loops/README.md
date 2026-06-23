# Loops 目录说明

## 目录结构

```
loops/
├── execute-checkpoint.md      # 执行检查点
├── degradation-detection.md   # 退化检测
├── internal-handoff.md        # 内部交付检查
├── quality-gate.md           # 质量门
└── gates/                    # v2.0 新增：纪律层配置
    ├── config.md             # 门禁强度配置
    └── anti-rationalization.md  # Anti-Rationalization 规则库
```

## 门禁机制

### 门禁文件索引

| 文件 | 作用 | 默认强度 |
|------|------|---------|
| execute-checkpoint.md | 执行阶段每步检查 | SOFT |
| degradation-detection.md | 全程退化监控 | SOFT |
| internal-handoff.md | 阶段间交接检查 | HARD |
| quality-gate.md | 交付前质量检查 | HARD |
| gates/config.md | 门禁强度配置表 | 可调整 |
| gates/anti-rationalization.md | 反借口规则库 | 强制 |

### 强度说明

- **HARD**：强制拦截，不满足不能进入下一步
- **SOFT**：警告提醒，用户可选择继续

## Anti-Rationalization

`gates/anti-rationalization.md` 包含：
- 四大原则的禁止行为清单
- 常见借口及真相
- 修复协议

## 配置变更

在对话开始时可通过声明调整强度：

```
[使用严格模式] - 所有SOFT升级为HARD
[使用宽松模式] - 所有HARD降级为SOFT
[使用创意模式] - 退化检测暂停，质量门降为SOFT
```
