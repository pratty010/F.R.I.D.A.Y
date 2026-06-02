# Furaidē's Fleet — OpenCode Setup

> *"Twenty-four spirits, four gate-guardians, and one fox. The Fleet is ready."*

This is Furaidē's [OpenCode](https://opencode.ai) configuration: a v9.1 multi-agent fleet of named shikigami specialists, four gate plugins enforcing workflow integrity, and Kitsune's brand-builder domain (opt-in). Part of the [F.R.I.D.A.Y.](https://github.com/pratty010/F.R.I.D.A.Y) collection.

## What's included

| Component | What it is |
|---|---|
| `agents/` | 24 specialist + subagent shikigami |
| `plugins/` | 4 gate shikigami (Niō, Nurikabe, Komainu, Migawari) |
| `rules/` | Memory-check contract loaded via `instructions` |
| `scripts/` | Workflow state, verification, and safety scripts (`.mjs`) |
| `docs/` | Architecture, routing manifest, model guides, OPERATOR guide |
| `brand-builder-plugin/` | Kitsune (Brand Builder) — opt-in per project |

## Install

### 1. Clone
```bash
git clone https://github.com/pratty010/opencode.git ~/.config/opencode
cd ~/.config/opencode
```

### 2. Install dependencies (gate plugins)
```bash
bun install
# or: npm install
```

### 3. Register in your global `opencode.json`
The plugins are already wired in `opencode.jsonc`. If you have your own existing config, add the gate plugins to your `"plugin"` array:
```json
{
  "plugin": [
    "./plugins/nio.js",
    "./plugins/nurikabe.js",
    "./plugins/komainu.js",
    "./plugins/migawari.js"
  ]
}
```

### 4. Enable brand-builder (Kitsune) per project — optional
Kitsune (Brand Builder) opens a SQLite DB on init; it is intentionally NOT registered globally.
To enable it in a specific project:
```json
// your-project/.opencode/opencode.json
{
  "plugin": ["~/.config/opencode/brand-builder-plugin/plugin/brand-builder.mjs"]
}
```
Then install its dependencies:
```bash
cd ~/.config/opencode/brand-builder-plugin
bun install
```

## The Fleet

### 24 Specialist Shikigami

| Shikigami | Role |
|---|---|
| Tanuki (General) | Cost-aware generalist |
| Tsukumo (Coder) | Multi-file implementation |
| Bakeneko (Debugger) | Root-cause analysis |
| Oni (Reviewer) | Adversarial review |
| Tsuchigumo (Deep Researcher) | Deep multi-source research |
| Mujina (Brand Strategist) | Brand strategy and positioning |
| Soroban (Data Analyst) | Quantitative analysis |
| Tengu (Designer) | Visual and UX design |
| Daidarabotchi (DevOps/SRE) | Infrastructure reliability |
| Enma (Legal/Compliance) | Legal and compliance judgment |
| Tsukuyomi (PM/Spec) | Product requirements |
| Daikoku (Financial) | Financial domain |
| Yamabiko (Source Retriever) | External doc and source fetch |
| Kagami (Fact-Checker) | Claim verification |
| Azukiarai (Extractor) | Bulk structured data extraction |
| Kotodama (Prose Wordsmith) | Publication-quality prose |
| Yumemi (Writer) | Creative and expository writing |
| Makimono (Technical Writer) | API docs and changelogs |
| Henge (Formatter) | Format transformation |
| Karakuri (Code Runner) | Command and script execution |
| Mikoshi (Explorer) | Read-only codebase navigation |
| Karasu-tengu (Scout) | Library and dependency lookup |
| Jorōgumo (Synthesizer) | Evidence → structured deliverable |
| Fudō (Security) | Security analysis |

### 4 Gate Shikigami (always active)

| Shikigami | Role |
|---|---|
| Niō (Gate Enforcer) | Blocks tools when workflow verdict is critical |
| Nurikabe (Delivery Gate) | Holds replies at the checkpoint |
| Komainu (Security Patterns) | Screens edits for dangerous patterns |
| Migawari (Model Failover) | Cross-vendor fallback chain |

### Kitsune's Domain (Brand Builder — opt-in)

Kitsune orchestrates 8 sub-familiars for professional profile review and improvement: Kuda-gitsune (Diagnostician), Akashi (GitHub Proof), Hyakume (ATS), Kodama (Growth Planner), Kurabokko (Knowledge Steward), Migaki (LinkedIn), Kataribe (Narrative Brand), Amanojaku (Anti-Voice).

## Tests

```bash
bun test scripts/tests/
```

## Part of F.R.I.D.A.Y.

This config is one of Furaidē's domains. The full collection lives at [pratty010/F.R.I.D.A.Y](https://github.com/pratty010/F.R.I.D.A.Y).
