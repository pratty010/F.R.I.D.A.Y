# pi-agent/

Furaidē's [pi.dev](https://pi.dev) package — web-RAG tools, TUI widgets, themes, and skills.

Part of the [F.R.I.D.A.Y.](https://github.com/pratty010/F.R.I.D.A.Y) monorepo.

---

## What it provides

| Feature | Description |
|---------|-------------|
| **Web-RAG tools** | `web_search`, `fetch_content`, `code_search`, `video_search` via Pi extensions |
| **`/usage` command** | Usage analytics and quota tracking |
| **TUI widgets** | Terminal UI enhancements |
| **Themes** | `friday` (dark indigo + amber) and `chimu` (light ivory + charcoal) |
| **Skills** | `plan/` — implementation planning skill (also in `common/skills/plan/`) |

---

## Install

### Local path install

```bash
git clone https://github.com/pratty010/F.R.I.D.A.Y.git ~/F.R.I.D.A.Y
bash ~/F.R.I.D.A.Y/pi-agent/scripts/install-pi-agent.sh
```

### Or directly from git (once published)

```bash
pi install git:github.com/pratty010/F.R.I.D.A.Y
```

### Manual

```bash
cd ~/F.R.I.D.A.Y/pi-agent
bun install
pi install .
```

---

## Prerequisites

- [bun](https://bun.sh) — `curl -fsSL https://bun.sh/install | bash`
- [Pi CLI](https://pi.dev) — see pi.dev for install instructions
- Provider API keys if using web-RAG tools (set in Pi's config)

---

## Structure

```
pi-agent/
  package.json               # Pi package manifest (name: friday-furaidee)
  src/index.ts               # Extension entry point
  themes/
    friday.json              # Dark indigo + amber theme
    chimu.json               # Light ivory + charcoal theme
  skills/                    # Pi skills (user-invoked /name snippets)
  agents/                    # Subagent definitions for pi-subagents-cc (not Pi-native)
  scripts/install-pi-agent.sh
```

---

## Notes

- `agents/` in this directory is for `pi-subagents-cc` integration, not Pi's native agent system. Pi does not load `agents/` natively.
- The `plan` skill is also vendored in `common/skills/plan/` — install it there for cross-ecosystem availability.
- The `commit` skill is superseded by the Hanko plugin (`claude-code/plugins/hanko/`) — use Hanko for git workflows.

---

## Part of F.R.I.D.A.Y.

Other components: `opencode/` (34-agent fleet), `claude-code/` (Mekiki + Hanko plugins), `common/` (shared skills + docs), `openclaw/` (stateful assistant personas).
