# Furaidē's Fleet: OpenCode Setup

> *"Twenty-four spirits, four gate-guardians, and one fox. The Fleet is ready."*

Furaidē's [OpenCode](https://opencode.ai) configuration: a multi-agent fleet of named shikigami specialists, four gate plugins enforcing workflow integrity, and Kitsune's brand-builder domain (opt-in). Part of the [F.R.I.D.A.Y.](https://github.com/pratty010/F.R.I.D.A.Y) collection.

---

## What's included

| Component | What it is |
|-----------|------------|
| `agents/` | 24 specialist + subagent shikigami |
| `plugins/` | 4 gate shikigami (Niō, Nurikabe, Komainu, Migawari) |
| `rules/` | Memory-check contract loaded via `instructions` |
| `scripts/` | Workflow state, verification, and safety scripts (`.mjs`) |
| `command/` | Slash commands for agent orchestration |
| `docs/` | Architecture, routing manifest, model guides, OPERATOR guide |
| `brand-builder-plugin/` | Kitsune (Brand Builder, opt-in per project) |

---

## Install

### Default: full Fleet install

```bash
git clone https://github.com/pratty010/opencode.git ~/.config/opencode
cd ~/.config/opencode
bun install
```

The 4 gate plugins and 24 specialists are ready. The `opencode.jsonc` already wires everything.

---

### Selective install: pick what you need

<details>
<summary><strong>Gate plugins only</strong>: workflow guards without the specialist agents</summary>

```bash
git clone https://github.com/pratty010/opencode.git ~/furaidee-fleet
cd ~/furaidee-fleet && bun install
```

Add to your existing `opencode.json`:

```json
{
  "plugin": [
    "~/furaidee-fleet/plugins/nio.js",
    "~/furaidee-fleet/plugins/nurikabe.js",
    "~/furaidee-fleet/plugins/komainu.js",
    "~/furaidee-fleet/plugins/migawari.js"
  ]
}
```

</details>

<details>
<summary><strong>Specialist agents only</strong>: the 24 shikigami without gate plugins</summary>

Copy the `agents/` directory into your OpenCode config:

```bash
git clone https://github.com/pratty010/opencode.git ~/furaidee-fleet
cp -r ~/furaidee-fleet/agents ~/.config/opencode/agents
```

OpenCode discovers agents placed in `~/.config/opencode/agents/`.

</details>

<details>
<summary><strong>Kitsune (Brand Builder)</strong>: opt-in per project</summary>

> [!NOTE]
> Kitsune opens a per-project SQLite DB on init. It is intentionally not registered . Add it only to projects where you want brand analysis.

```bash
# Install the Fleet first (for the brand-builder plugin dependency):
git clone https://github.com/pratty010/opencode.git ~/.config/opencode
cd ~/.config/opencode/brand-builder-plugin && bun install
```

Then add to your project's `.opencode/opencode.json`:

```json
{
  "plugin": ["~/.config/opencode/brand-builder-plugin/plugin/brand-builder.mjs"]
}
```

</details>

<details>
<summary><strong>Merging into an existing OpenCode config</strong></summary>

If you already have `~/.config/opencode/opencode.json`, add the gate plugins to your `"plugin"` array:

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

Copy agents and rules as needed:

```bash
cp -r agents ~/.config/opencode/agents
cp -r rules ~/.config/opencode/rules
```

</details>

---

## The Fleet

### 24 Specialist Shikigami

| Shikigami | Role |
|-----------|------|
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
| Fudō (Security) | Security analysis and threat modeling |

### 4 Gate Shikigami (always active)

| Shikigami | Role |
|-----------|------|
| Niō (Gate Enforcer) | Blocks tools when workflow verdict is critical |
| Nurikabe (Delivery Gate) | Holds replies at checkpoint until verdict clears |
| Komainu (Security Patterns) | Screens edits for dangerous patterns |
| Migawari (Model Failover) | Cross-vendor fallback chain |

### Kitsune's Domain (Brand Builder, opt-in)

Kitsune orchestrates 8 sub-familiars for professional profile review and improvement:

| Shikigami | Role |
|-----------|------|
| Kuda-gitsune | Current-state scoring and role-fit judgment |
| Akashi | GitHub portfolio proof evaluation |
| Hyakume | ATS keyword coverage audit |
| Kodama | Growth roadmap and gap analysis |
| Kurabokko | Artifact intake and memory hygiene |
| Migaki | LinkedIn section diagnosis and rewrite |
| Kataribe | Brand strategy and website brief |
| Amanojaku | Adversarial claim-grounding reviewer |

---

## Tests

```bash
bun test scripts/tests/
```

---

## Part of F.R.I.D.A.Y.

This config is one of Furaidē's domains. The full collection lives at [pratty010/F.R.I.D.A.Y](https://github.com/pratty010/F.R.I.D.A.Y).
