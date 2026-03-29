# Telegram SEO Bot — Design Spec

**Date:** 2026-03-29
**Status:** Draft
**Scope:** Telegram bot that dispatches SEO commands to Claude Code CLI and returns reports

---

## Context

TC Insurance has a `/seo` skill in Claude Code with sub-commands (audit, onpage, analytics, content, local, ai, full, report). Currently these can only be invoked from the terminal. This bot brings the same commands to Telegram so they can be triggered from a phone or any device, with results delivered as chat messages.

---

## Architecture

```
Telegram Chat → Grammy Bot (long-polling on Mac) → spawn claude CLI → read report → send to Telegram
```

- **Runtime:** Node.js process running locally on the user's Mac
- **Library:** Grammy (modern Telegram bot framework, TypeScript-compatible)
- **Connection:** Long-polling (no webhook, no public URL needed)
- **Execution:** Spawns `claude` CLI as a child process per command
- **Working directory:** Project root (`/Users/hector/Projects/TC Insurance`)

---

## Commands

| Telegram Command | Maps To | Description |
|-----------------|---------|-------------|
| `/audit` | `/seo audit` | Technical SEO audit |
| `/onpage` | `/seo onpage` | On-Page SEO analysis |
| `/analytics` | `/seo analytics` | Analytics setup review |
| `/content` | `/seo content` | Content SEO analysis |
| `/local` | `/seo local` | Local SEO audit |
| `/ai` | `/seo ai` | AI/GEO SEO analysis |
| `/full` | `/seo full` | Run all analyses |
| `/report` | `/seo report` | View latest report |
| `/status` | (local) | Bot uptime, last crawl date, last report |
| `/help` | (local) | List all available commands |

All SEO commands are registered with BotFather as the bot's command menu for native autocompletion.

---

## Execution Flow

### For SEO commands (`/audit`, `/onpage`, etc.)

1. User sends `/audit` in Telegram
2. Bot checks `ctx.from.id` against `TELEGRAM_OWNER_ID` env var — reject if mismatch
3. Bot checks if another command is already running — if yes, reply "Another command is running, please wait"
4. Bot sends acknowledgment: "Running technical SEO audit... This may take a few minutes."
5. Bot spawns child process:
   ```
   claude -p "Run /seo audit. After the audit completes, read the generated report file and output its full content." \
     --allowedTools "Bash,Read,Write,Edit,Glob,Grep,Agent,Skill" \
     --output-format text \
     --max-turns 50
   ```
   Working directory: project root
6. Bot captures stdout from the process
7. On completion:
   - Parse the output to extract the report content
   - Split into chunks of max 4096 characters (Telegram limit)
   - Send each chunk as a separate message with Markdown formatting
8. On error: send error message to chat
9. Mark command as not running (unlock queue)

### For `/status`

No Claude Code needed. The bot directly:
- Reports its own uptime
- Lists files in `docs/seo/reports/` to show latest reports with dates
- Checks if `docs/seo/data/crawl-*.json` exists and its date

### For `/help`

Static message listing all commands with descriptions.

---

## Security

- **Owner-only access:** `TELEGRAM_OWNER_ID` env var contains the numeric Telegram user ID. All messages from other users are silently ignored.
- **Single execution lock:** Only one Claude Code command runs at a time. Additional requests are queued with a message.
- **Token protection:** `TELEGRAM_BOT_TOKEN` stored in `.env.local`, never committed.
- **No sensitive data in messages:** Reports contain SEO analysis only, no credentials or secrets.

---

## File Structure

```
bot/
├── seo-bot.mjs          # Main bot file (~200 lines)
└── package.json          # Bot dependencies (grammy only)
```

The bot lives in its own subdirectory with its own `package.json` to keep dependencies separate from the Next.js site. The root `package.json` gets convenience scripts:

```json
{
  "bot:start": "node bot/seo-bot.mjs",
  "bot:dev": "node --watch bot/seo-bot.mjs"
}
```

---

## Environment Variables

Add to `.env.local`:
```
TELEGRAM_BOT_TOKEN=<from BotFather>
TELEGRAM_OWNER_ID=<your numeric Telegram user ID>
```

The bot reads these via `process.env` (using dotenv or direct env).

---

## Bot Setup Instructions (for user)

1. Open Telegram, search for `@BotFather`
2. Send `/newbot`
3. Choose a name (e.g., "TC Insurance SEO")
4. Choose a username (e.g., `tc_seo_bot`)
5. Copy the token → set as `TELEGRAM_BOT_TOKEN`
6. Send `/setcommands` to BotFather, select your bot, paste:
   ```
   audit - Technical SEO audit
   onpage - On-Page SEO analysis
   analytics - Analytics setup review
   content - Content SEO analysis
   local - Local SEO audit
   ai - AI/GEO SEO analysis
   full - Run all SEO analyses
   report - View latest report
   status - Bot status and last crawl
   help - List commands
   ```
7. To get your user ID: message `@userinfobot` on Telegram → set as `TELEGRAM_OWNER_ID`

---

## Message Formatting

### Acknowledgment
```
⏳ Running technical SEO audit...
This may take 2-5 minutes.
```

### Success (report delivery)
Reports are sent as Telegram Markdown. If the report exceeds 4096 chars:
- Split at section boundaries (## headings) when possible
- Fall back to hard split at 4096 chars
- Send as sequential messages

### Error
```
❌ Audit failed:
{error message, truncated to 500 chars}
```

### Queue message
```
⏳ Another command is running. Your request has been queued.
```

---

## Concurrency

- One command at a time (mutex/flag)
- If a second command arrives while one is running, reply with queue message
- No actual queue implementation needed for single-user — just reject with "please wait"

---

## Dependencies

`bot/package.json`:
```json
{
  "name": "tc-seo-bot",
  "type": "module",
  "dependencies": {
    "grammy": "^1.31.0",
    "dotenv": "^16.4.0"
  }
}
```

---

## Out of Scope

- Webhook mode (not needed for local use)
- Multi-user access
- Scheduled/cron commands via Telegram (use existing Claude Code scheduling)
- Inline queries or callback buttons
- Persistent message history
- Custom keyboard beyond command menu
