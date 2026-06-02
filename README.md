# F.R.I.D.A.Y.

> *"All systems online. Shikigami assembled. What are we working on today?"*

**F.R.I.D.A.Y.** is Furaidē's collection, an AI assistant setup for [Claude Code](https://claude.ai/code) and [OpenCode](https://opencode.ai). Each component is a named shikigami (式神), a spirit-familiar named for its function.

Two independent plugins. Install one, the other, or both.

---

## What's included

| Domain | Plugin | What it is |
|--------|--------|------------|
| `claude-code/` | [**Satori** (Skill Overseer)](https://github.com/pratty010/claude-code) | Claude Code plugin that watches every skill invocation and judges its effectiveness offline. Includes Furaidē's global `~/.claude` config bundle. |
| `opencode/` | [**Furaidē's Fleet**](https://github.com/pratty010/opencode) | OpenCode multi-agent setup: 24 specialist shikigami, 4 gate guardians, and Kitsune's brand-builder domain (opt-in). |

---

## Install

### Default: install everything

```bash
git clone --recurse-submodules https://github.com/pratty010/F.R.I.D.A.Y.git ~/F.R.I.D.A.Y
cd ~/F.R.I.D.A.Y
```

Then follow the setup sections in each submodule README:
- [`claude-code/README.md`](claude-code/README.md): Satori plugin, CLI, config bundle
- [`opencode/README.md`](opencode/README.md): Fleet agents, gate plugins, Kitsune

---

### Selective install: pick what you need

<details>
<summary><strong>Satori only</strong>: Claude Code skill observability plugin</summary>

**Option A: Claude Code marketplace** (once listed):

```bash
claude plugin install satori@pratty010
```

**Option B: direct from git:**

```bash
claude plugin install https://github.com/pratty010/claude-code.git
```

**Option C: local dev-link** (for contributors):

```bash
git clone https://github.com/pratty010/claude-code.git ~/satori
ln -sfn ~/satori ~/.claude/plugins/satori
```

Then install the analytics CLI:

```bash
cd ~/satori/cli && uv sync
```

See [`claude-code/README.md`](claude-code/README.md) for full usage and the `/satori` skill.

</details>

<details>
<summary><strong>Config bundle only</strong>: Furaidē's global Claude Code config</summary>

Installs CLAUDE.md, keybindings, settings, and statusline (no plugin required).

```bash
git clone https://github.com/pratty010/claude-code.git ~/satori
cp ~/satori/config/CLAUDE.md ~/.claude/CLAUDE.md
cp ~/satori/config/keybindings.json ~/.claude/keybindings.json
cp ~/satori/config/statusline-command.sh ~/.claude/statusline-command.sh
# Merge relevant keys from ~/satori/config/settings.json into ~/.claude/settings.json
```

See [`claude-code/config/README.md`](claude-code/config/README.md) for component-by-component instructions.

</details>

<details>
<summary><strong>Furaidē's Fleet only</strong>: OpenCode multi-agent setup</summary>

```bash
git clone https://github.com/pratty010/opencode.git ~/.config/opencode
cd ~/.config/opencode
bun install
```

The 4 gate plugins wire in automatically via `opencode.jsonc`. If you have an existing OpenCode config, merge the `"plugin"` array manually. See [`opencode/README.md`](opencode/README.md).

</details>

<details>
<summary><strong>Kitsune (Brand Builder) only</strong>: opt-in per project</summary>

> [!NOTE]
> Kitsune requires the Fleet to be installed first. It opens a per-project SQLite DB and is intentionally not registered globally.

Add to your project's `.opencode/opencode.json`:

```json
{
  "plugin": ["~/.config/opencode/brand-builder-plugin/plugin/brand-builder.mjs"]
}
```

Then install its dependencies:

```bash
cd ~/.config/opencode/brand-builder-plugin && bun install
```

</details>

---

## The Shikigami

### Satori: Claude Code

| Shikigami | Role |
|-----------|------|
| **Satori** | Watches every skill invocation; judges effectiveness offline via LLM-as-judge; reports via HTML + evidence packs |

### Furaidē's Fleet: OpenCode

| Shikigami | Role |
|-----------|------|
| Tanuki | General-purpose (handles tasks outside any specialist's scope) |
| Tsukumo | Multi-file coding and implementation |
| Bakeneko | Debugging and root-cause analysis |
| Oni | Adversarial code review |
| Tsuchigumo | Deep multi-source research |
| Mujina | Brand strategy and positioning |
| Soroban | Quantitative analysis and telemetry |
| Tengu | Visual and UX design |
| Daidarabotchi | DevOps and infrastructure reliability |
| Enma | Legal judgment and compliance |
| Tsukuyomi | Product requirements and spec writing |
| Daikoku | Financial domain |
| Yamabiko | External documentation and source retrieval |
| Kagami | Fact-checking and claim verification |
| Azukiarai | Bulk structured data extraction |
| Kotodama | Publication-quality prose |
| Yumemi | Creative and expository writing |
| Makimono | API docs, changelogs, technical documentation |
| Henge | Format transformation |
| Karakuri | Command and script execution |
| Mikoshi | Read-only codebase navigation |
| Karasu-tengu | Library and dependency lookup |
| Jorōgumo | Evidence corpus → structured deliverable |
| Fudō | Security analysis and threat modeling |

### Gate Guardians (always active)

| Shikigami | Role |
|-----------|------|
| Niō | Blocks tools when workflow verdict turns critical |
| Nurikabe | Holds replies at checkpoint until verdict clears |
| Komainu | Screens edits for dangerous patterns |
| Migawari | Cross-vendor model failover |

### Kitsune's Domain: Brand Builder (opt-in per project)

Kitsune commands 8 sub-familiars for professional profile review and improvement:

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

## Keep submodules up to date

```bash
git submodule update --remote
git add claude-code opencode
git commit -m "chore: bump submodule pointers"
```

---

## Development

Each submodule is an independent git repo. Commit and push inside `claude-code/` or `opencode/`, then bump the pointer here.

```bash
cd claude-code
git checkout -b my-feature
# ... make changes ...
git commit -m "feat: ..."
git push origin my-feature

# Back in the umbrella repo:
cd ..
git add claude-code
git commit -m "chore: bump claude-code to my-feature tip"
```

---

*Furaidē is always watching. The shikigami never sleep.*
