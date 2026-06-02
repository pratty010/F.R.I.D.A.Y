# Furaidē — Claude Code Config Bundle

These files are Furaidē's global Claude Code configuration, safe to copy into `~/.claude/`.

## Install

1. **CLAUDE.md** — append or replace `~/.claude/CLAUDE.md`:
   ```bash
   cp config/CLAUDE.md ~/.claude/CLAUDE.md
   ```

2. **keybindings.json** — replace `~/.claude/keybindings.json`:
   ```bash
   cp config/keybindings.json ~/.claude/keybindings.json
   ```

3. **statusline-command.sh** — copy and update the path in settings.json:
   ```bash
   cp config/statusline-command.sh ~/.claude/statusline-command.sh
   ```

4. **settings.json** — merge relevant keys into `~/.claude/settings.json`.
   - Update `statusLine.command` to point to wherever you placed `statusline-command.sh`.
   - Note: `skipDangerousModePermissionPrompt` and `skipAutoPermissionPrompt` are both `true` — review before applying if you prefer explicit prompts.

## Notes
- The `hooks` block is intentionally absent; Satori's plugin ships its own `hooks/hooks.json` using `${CLAUDE_PLUGIN_ROOT}`.
- Skills (the 38 symlinks in `~/.claude/skills/`) are third-party and not bundled here. See each skill's source repo to install them.
