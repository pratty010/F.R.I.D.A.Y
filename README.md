# F.R.I.D.A.Y.

> *"All systems online. Shikigami assembled. What are we working on today?"*

**F.R.I.D.A.Y.** is Furaidē's collection — an anime-rendered AI assistant setup inspired by Tony Stark's F.R.I.D.A.Y., built for [Claude Code](https://code.claude.com) and [OpenCode](https://opencode.ai).

**Furaidē (フライデー)** is the onmyōji-AI who runs these setups as a modern spirit-commander. Each plugin, agent, and workflow is a named **shikigami** (式神) — a spirit-familiar whose nature matches its function.

---

## Domains

| Domain | Repo | What it is |
|--------|------|------------|
| `claude-code/` | [pratty010/claude-code](https://github.com/pratty010/claude-code) | **Satori (Skill Overseer)** — Claude Code plugin that watches every skill invocation and judges its effectiveness offline. Includes Furaidē's sanitized global `~/.claude` config bundle. |
| `opencode/` | [pratty010/opencode](https://github.com/pratty010/opencode) | **Furaidē's Fleet** — OpenCode v9.1 multi-agent setup: 24 specialist shikigami, 4 gate guardians, and Kitsune's brand-builder domain (opt-in). |

---

## The Shikigami Roster

### Claude Code — Satori's Eye

| Shikigami | Role |
|---|---|
| **Satori (Skill Overseer)** | Watches every skill invocation; judges effectiveness offline; reports via HTML + evidence packs |

### OpenCode — The Fleet

| Shikigami | Role |
|---|---|
| Tanuki | General-purpose — all tasks that fit no specialist |
| Tsukumo | Coding and multi-file implementation |
| Bakeneko | Debugging and root-cause analysis |
| Oni | Adversarial review — no mercy for flawed work |
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

### OpenCode — Gate Guardians (always active)

| Shikigami | Role |
|---|---|
| Niō | Blocks tools when workflow verdict turns critical |
| Nurikabe | Holds replies at the checkpoint until verdict clears |
| Komainu | Screens edits for dangerous patterns |
| Migawari | Cross-vendor model failover |

### OpenCode — Kitsune's Domain (opt-in per project)

**Kitsune (Brand Builder)** commands 8 sub-familiars for professional profile review and improvement:

| Shikigami | Role |
|---|---|
| Kuda-gitsune | Current-state scoring and role-fit judgment |
| Akashi | GitHub portfolio proof evaluation |
| Hyakume | ATS keyword coverage audit |
| Kodama | Growth roadmap and gap analysis |
| Kurabokko | Artifact intake and memory hygiene |
| Migaki | LinkedIn section diagnosis and rewrite |
| Kataribe | Brand strategy and website brief |
| Amanojaku | Adversarial claim-grounding reviewer |

---

## Install

### Clone everything at once

```bash
git clone --recurse-submodules https://github.com/pratty010/F.R.I.D.A.Y.git ~/F.R.I.D.A.Y
```

### Or clone and initialize separately

```bash
git clone https://github.com/pratty010/F.R.I.D.A.Y.git ~/F.R.I.D.A.Y
cd ~/F.R.I.D.A.Y
git submodule update --init --recursive
```

### Keep submodules up to date

```bash
git submodule update --remote
git add claude-code opencode
git commit -m "chore: bump submodule pointers"
```

### Install each domain

See each submodule's `README.md` for detailed install steps:
- [`claude-code/README.md`](claude-code/README.md) — Satori plugin install, CLI setup, config bundle
- [`opencode/README.md`](opencode/README.md) — Fleet config install, gate plugins, brand-builder

---

## Contributing

Each submodule is an independent git repo — commit and push directly inside `claude-code/` or `opencode/`, then bump the pointer in this umbrella repo.

```bash
# Work inside a submodule:
cd claude-code
git checkout -b my-feature
# ... make changes ...
git commit -m "feat: ..."
git push origin my-feature

# Bump the pointer in the umbrella:
cd ..
git add claude-code
git commit -m "chore: bump claude-code to my-feature tip"
```

---

*Furaidē is always watching. The shikigami never sleep.*
