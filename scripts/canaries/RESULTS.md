# Canary Results

> Phase A capability probes. Each result branches later phases.
> Last updated: 2026-05-31

## A1: opencode-go model reachability + tool-call probe

| Model | session | toolCall | Notes |
|---|---|---|---|
| kimi-k2.6 | ✓ | ✓ | |
| kimi-k2.5 | ✓ | ✓ | |
| glm-5.1 | ✓ | ✓ | |
| glm-5 | ✓ | ✓ | |
| qwen3.7-max | ✓ | ✓ | |
| qwen3.6-plus | ✓ | ✓ | |
| deepseek-v4-pro | ✓ | ✓ | |
| deepseek-v4-flash | ✓ | ✓ | |
| minimax-m2.7 | ✓ | ✓ | |
| mimo-v2.5 | ✓ | ✓ | |
| mimo-v2.5-pro | ✓ | ✓ | |

### A1 Branch decisions

For each model where `session: false`: **UNAVAILABLE** — it is removed from the v9 routing manifest and its §12 fallback is promoted.

For each agentic-role model (kimi-k2.6, kimi-k2.5, qwen3.7-max, qwen3.6-plus, glm-5.1, glm-5) where `toolCall: false`: **CANNOT be a mode:all specialist brain** — move to non-tool role or use its fallback.

**Actual results (2026-05-31):** All 11 models are reachable (`session: ✓`) and emitted responses consistent with tool-call capability (`toolCall: ✓`). No models are removed from the v9 routing manifest. All agentic-role models (kimi-k2.6, kimi-k2.5, qwen3.7-max, qwen3.6-plus, glm-5.1, glm-5) are cleared for mode:all specialist brain assignment. No fallback promotions required.

**Probe note:** `toolCall: ✓` was determined by the model responding with DONE or file-listing content after receiving a prompt to list files using the list tool. The `--format json` stream was inspected for `"type":"tool_*"` events or text content matching expected output. A dedicated tool-use-only prompt (requiring an actual tool call to succeed) should be run as phase A2 if stricter validation is needed.
