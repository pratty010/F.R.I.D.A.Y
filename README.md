# Satori (Skill Overseer)

> *A shikigami in Furaidē's service — the all-seeing eye on your Claude Code skills.*

Satori is a [Claude Code plugin](https://code.claude.com/docs/en/plugins-reference) that captures every skill invocation and judges its effectiveness offline. It is part of the [F.R.I.D.A.Y.](https://github.com/pratty010/F.R.I.D.A.Y) collection.

## What it does

- **Captures** — lightweight JSONL event log in `~/.satori/events/` (hooks fire on every skill invoke/load/fail, session start, and turn stop; no conversation content is stored)
- **Judges** — an LLM-as-judge pipeline reads Claude Code transcripts and classifies each invocation: triggered correctly, triggered unnecessarily, or a gap where no skill fired but one should have
- **Reports** — Jinja2 HTML reports served locally: a fleet overview and per-skill deep-dives
- **Improves** — builds evidence packs for individual skills so you (or `skill-creator`) can rewrite a skill's description with data

## Install

### Option A — Claude Code marketplace (recommended for end users)
```bash
claude plugin install satori@pratty010
```
(Once listed. Until then, use Option B or C.)

### Option B — Install from this git repo
```bash
claude plugin install https://github.com/pratty010/claude-code.git
```

### Option C — Local dev-link (for contributors)
```bash
git clone https://github.com/pratty010/claude-code.git ~/my-satori
ln -sfn ~/my-satori ~/.claude/plugins/satori
# Restart Claude Code, then:
claude plugin list   # confirm satori appears
```

## CLI install (required — the `/satori` skill shells out to it)

Satori's hooks and skill are thin wrappers; the analytics engine is a Python CLI installed via `uv`:

```bash
cd cli
uv sync          # creates .venv and installs satori + deps
uv run satori --help
```

Or install globally into your uv environment:
```bash
cd cli && uv tool install .
satori --help
```

## Usage

Once installed, the `/satori` skill is available in every Claude Code session:

```
/satori                          # overview: which skills fired this week
/satori deep-dive /<skill>       # per-skill analysis
/satori improve /<skill>         # build evidence pack → hand off to skill-creator
```

Or shell out directly:
```bash
satori run                        # ingest + judge + aggregate
satori report --overview          # build + serve overview.html
satori report --skill <name>      # build + serve skill detail
satori improve --skill <name>     # build evidence pack
satori improve --skill <name> --mark applied
```

## Data directory

Runtime data lives in `~/.satori/` (or `$SATORI_HOME` if set):

```
~/.satori/
  events/claude-code/YYYY-MM-DD.jsonl   # captured events
  state.db                               # SQLite state
  reports/                               # generated HTML
  evidence/                              # evidence packs for skill improvement
  debug/                                 # raw hook payloads (opt-in)
```

To migrate from an older `~/.puraguin/` data dir:
```bash
mv ~/.puraguin ~/.satori
```

To capture raw hook payloads during smoke testing:
```bash
SATORI_CAPTURE_HOOK_PAYLOADS=1 claude
```

## Config bundle

`config/` contains Furaidē's sanitized global Claude Code configuration (CLAUDE.md, keybindings, statusline, settings). See [`config/README.md`](config/README.md) for install instructions.

## Development

```bash
cd cli
uv run pytest          # run test suite
uv run pytest -x -q    # fail fast
```

The plugin follows the [Claude Code plugin spec](https://code.claude.com/docs/en/plugins-reference): `.claude-plugin/plugin.json` declares the plugin, `hooks/hooks.json` wires events using `${CLAUDE_PLUGIN_ROOT}`, and `skills/satori/SKILL.md` defines the `/satori` slash command.

## Part of F.R.I.D.A.Y.

This plugin is one of Furaidē's shikigami. The full collection lives at [pratty010/F.R.I.D.A.Y](https://github.com/pratty010/F.R.I.D.A.Y).
