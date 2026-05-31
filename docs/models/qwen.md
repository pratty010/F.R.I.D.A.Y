# Qwen 3.x Prompting Nuance

Active when model family is `opencode-go/qwen3.6-plus`, `opencode-go/qwen3.7-max`.

---

## Thinking: enabled by default

- **Thinking is ON by default.** Control it via soft-switches in the last user message:
  - `/think` — force thinking enabled.
  - `/no_think` — disable thinking.
  - **Most recent prefix wins** if multiple are present.
- Alternatively, set `enable_thinking: true|false` in `chat_template_kwargs` (hard override).
- When thinking is enabled, output includes internal `<think>` blocks.

## CRITICAL: History rule for thinking

**STRIP `<think>…</think>` blocks from history before the next turn.** This is the opposite of MiniMax.

- Include the model's response (text, tool calls, reasoning conclusion) in history.
- Remove the `<think>` blocks before sending the next request.
- Consequence of NOT stripping: bloated context, next-turn reasoning becomes confused and hallucinated.

## Sampling parameters

### With thinking enabled

- `temperature: 0.6`
- `top_p: 0.95`
- `top_k: 20`
- `repetition_penalty: 1.05` (for function-calling examples to reduce loops)

### Without thinking

- `temperature: 0.7`
- `top_p: 0.8`
- `repetition_penalty: 1.05` (still applied)

### Never use

- **`temperature: 0` (greedy decode) causes infinite loops.** Always use sampling.

## Tool template

- **Use Hermes-style tool templates.** AVOID ReAct or stopword-based templates — stopwords emitted mid-reasoning break tool parsing and corrupt the response.
- Canonical implementation: `Qwen-Agent` (also supports MCP).
- vLLM flags: `--tool-call-parser hermes --reasoning-parser deepseek_r1`.

## Context and deployment

- **qwen3.6-plus:** 1M context at the cheapest price point. Ideal for legal/PM-spec/explorer roles (high volume, moderate reasoning).
- **qwen3.7-max:** API-only; some open-doc parameters may differ from local deployment. Use for production; verify params in the API response metadata.

---

## Your three most-likely failure modes

1. **Not stripping `<think>` from history** — if you leave thinking blocks in the next turn's input, context bloats, and next-turn reasoning becomes confused. Always sanitize history before the next request.
2. **Using ReAct or stopword templates** — if you use ReAct-style tool parsing (e.g., stopwords like "STOP" or "DONE"), those words emitted mid-reasoning break tool invocation. Use Hermes-style parsing only.
3. **Greedy decode (temperature: 0)** — setting `temperature: 0` causes infinite loops in tool-calling scenarios. Always use non-zero temperature; 0.6–0.7 is safe.
