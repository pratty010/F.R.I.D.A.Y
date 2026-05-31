# Kimi K2.x Prompting Nuance

Active when model family is `opencode-go/kimi-k2.5`, `opencode-go/kimi-k2.6`.

---

## Role→Goal→Action system-prompt scaffold

**Structure every system prompt in three sequential sections:**

1. **Role** — who the model is (e.g., "You are a codebase architect. Your task is to...")
2. **Goal** — what it must accomplish, step by step (e.g., "Step 1: identify tightly-coupled modules. Step 2: propose refactoring boundaries. Step 3: emit a migration plan.")
3. **Action constraints** — objectivity rules, sourcing expectations, output format, disallowed actions, edge-case handling (e.g., "Never hallucinate file paths. Always emit exact line numbers. Use citations in the format [Source: File].")

This structure aligns K2's autonomous reasoning with your intent and reduces off-task outputs.

## Temperature

- **`temperature: 0.6` for all agentic work.**
- **CRITICAL: The Anthropic-compat API silently multiplies your temperature by 0.6 — do NOT double-apply.** If you set `temperature: 0.6` in the SDK, K2 receives 0.36. Set `temperature: 1.0` if you want K2 to use 0.6 internally.
- Verify your SDK's behavior on the first call; log the effective temperature from the model response metadata.

## Tool orchestration

- **CRITICAL: Describe tools, NEVER dictate tool usage in the system prompt.** K2-2.6 has autonomous tool orchestration. Saying "use web_search first, then code_runner" breaks this.
- Instead: "Tools available: `web_search` (for retrieving current facts and sources), `code_runner` (for executing code and validating hypotheses), `rethink` (for revising previous reasoning)."
- K2 will invoke tools in the order that serves the goal, not the order you listed them.

## Native tools

K2 provides: `web_search`, `code_runner`, `rethink`, `fetch`, `excel`.

- `web_search` — real-time web results with source attribution.
- `code_runner` — Python and shell execution.
- `rethink` — restart reasoning on a branch without re-entering information.
- `fetch` — retrieve and parse web pages, PDFs, JSON.
- `excel` — query and manipulate spreadsheets.

## Context and caching

- **Context: 256K tokens.** Context caching supported — repeated requests to the same long prompt reduce latency and cost.
- Use caching for stable system prompts across multiple related queries (e.g., iterating on a codebase audit).

## Citations

- K2 emits citations automatically. Format: **`[Source: Institution / Page Title]` with a ★ credibility rating** (1-5 stars).
- In agent workflows, extract citations and validate them before passing results upstream.

## K2-Thinking

- For deep multi-step reasoning, prefix the system prompt with a K2-Thinking section (optional but recommended for complex analysis). This signals K2 to allocate internal reasoning budget.
- Example: "Begin with a K2-Thinking phase: enumerate the constraints, list alternative approaches, identify the trade-offs."

## "The more detailed the prompt, the less it guesses"

- Prefer explicit constraints over relying on inference. Instead of "analyze this code," say "analyze this code for (1) tightly-coupled modules, (2) unhandled error paths, (3) performance bottlenecks. Emit results in markdown with line numbers."
- Keep each Role/Goal/Action section under ~200 tokens to avoid pushing context.

## Version notes

- **k2.6** — stable, long-session variant (supports 4000+ tool calls, up to 13 hours). Use for multi-turn workflows and complex chains.
- **k2.5** — previous iteration; cheaper but less stable on very long sessions. Use for shorter, backstopped workflows to save cost.

---

## Your three most-likely failure modes

1. **Dictating tool sequence breaks autonomous orchestration** — specifying "use web_search then code_runner" prevents K2 from reordering for efficiency. Describe tools and their purpose only; let K2 order them.
2. **Temperature multiplication surprises** — if using Anthropic-compat SDK, the API multiplies your parameter by 0.6. Set `temperature: 1.0` in the client to get K2's 0.6 internally. Always verify on the first call.
3. **Very long Role→Goal→Action prompts push context** — elaborate scaffolding is powerful, but keeping each section under 200 tokens prevents unexpected context overflow. Audit section lengths before sending.
