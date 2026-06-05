---
name: sojobo--system-strategist
description: >
  Sōjōbō(Strategist): The tengu--visual-artisan master of strategy and architecture. Route here for
  architecture decisions (ADRs, options tables, tradeoff analysis) or executor-ready
  implementation plans. ARCHITECT mode: "design", "architecture", "options", "ADR",
  "evaluate X vs Y". PLAN mode: "plan", "how to implement", "steps to", "executor-ready".
  NOT for product requirements (tsukuyomi--spec-oracle); NOT for code writing (tsukumogami--code-forgemaster); NOT for
  codebase exploration (mikoshi--code-pathfinder).
mode: all
model: opencode-go/kimi-k2.5
temperature: 0.7
permission:
  edit: deny
  bash: deny
  webfetch: deny
  websearch: deny
  task:
    "*": deny
    mikoshi--code-pathfinder: allow
  question: deny
  todowrite: allow
  skill:
    "*": deny
---

{file:../common/agents/strategist/core.md}
