---
name: value-cost-matrix
description: Use when user needs to prioritize among multiple options, make trade-off decisions, or evaluate resource allocation
---

# Value-Cost Matrix

## Overview

A prioritization framework that maps options into a 2x2 matrix based on value and cost dimensions. Enables systematic trade-off decisions and resource allocation.

## When to Use

**Trigger conditions:**
- User says "which should I choose?", "what's the priority?", "should I do X or Y?"
- Multiple competing options with limited resources
- Resource allocation decisions
- phrases like "优先级", "取舍", "资源分配", "值不值得"

**When NOT to use:**
- When only one option exists (no choice needed)
- When cost is clearly prohibitive (obvious elimination)
- When value is clearly superior (obvious choice)
- When decision is irreversible with high stakes (more analysis needed)

## Core Framework

### The 2x2 Matrix

```
                    HIGH VALUE
                        │
         ┌─────────────┼─────────────┐
         │             │             │
  HIGH   │  STRATEGIC │    QUICK    │
  COST   │   INVEST    │    WIN      │
         │             │             │
         ├─────────────┼─────────────┤
         │             │             │
  LOW    │   TRAP      │   NICHE     │
  COST   │             │             │
         └─────────────┴─────────────┘
                        │
                   LOW VALUE
```

### Priority Order

| Quadrant | Decision | Rationale |
|----------|----------|----------|
| Quick Win | Execute first | High value, low cost = immediate return |
| Strategic Invest | Plan deliberately | High value, high cost = significant return with investment |
| Trap | Avoid or exit | Low value, high cost = resource drain |
| Niche | Deprioritize | Low value, low cost = marginal value |

## Implementation Steps

1. **List alternatives** — "What options are you considering?"
2. **Assess value** — "What value does each option provide? To whom? How much?"
3. **Assess cost** — "What does each option cost? Money, time, effort, risk?"
4. **Map to matrix** — Place each option in appropriate quadrant
5. **Derive priority** — Order by quadrant priority
6. **Decide** — User selects based on constraints

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Undefined value | Clarify: value TO WHOM, in WHAT DIMENSION |
| Incomplete cost | Include ALL costs: direct, indirect, opportunity |
| Subjective mapping | Use explicit criteria, not gut feeling |
| Ignoring constraints | Budget/time constraints affect feasibility |

## Quick Reference

| Dimension | Questions to Ask |
|-----------|-----------------|
| Value | "What benefit? To whom? How much? How likely?" |
| Cost | "Money? Time? Effort? Risk? Opportunity cost?" |

## Completion Criteria

- [ ] All candidate options listed
- [ ] Each option's value explicitly stated
- [ ] Each option's cost explicitly stated
- [ ] Options correctly placed in matrix
- [ ] User articulates priority rationale
