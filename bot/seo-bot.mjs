#!/usr/bin/env node
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";

// Load .env.local from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

// Load env manually (dotenv doesn't auto-find .env.local)
async function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const content = await fs.readFile(resolve(PROJECT_ROOT, file), "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      // file doesn't exist, skip
    }
  }
}

await loadEnv();

const { Bot } = await import("grammy");

/* ------------------------------------------------------------------ */
/*  Config                                                            */
/* ------------------------------------------------------------------ */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_ID = Number(process.env.TELEGRAM_OWNER_ID);

if (!BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN not set in .env.local");
  process.exit(1);
}
if (!OWNER_ID || Number.isNaN(OWNER_ID)) {
  console.error("TELEGRAM_OWNER_ID not set or invalid in .env.local");
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/*  SEO command definitions                                           */
/* ------------------------------------------------------------------ */

const SEO_COMMANDS = {
  audit: { seoCmd: "audit", label: "Technical SEO audit" },
  onpage: { seoCmd: "onpage", label: "On-Page SEO analysis" },
  analytics: { seoCmd: "analytics", label: "Analytics setup review" },
  content: { seoCmd: "content", label: "Content SEO analysis" },
  local: { seoCmd: "local", label: "Local SEO audit" },
  ai: { seoCmd: "ai", label: "AI/GEO SEO analysis" },
  full: { seoCmd: "full", label: "Full SEO audit (all areas)" },
  report: { seoCmd: "report", label: "View latest report" },
};

/* ------------------------------------------------------------------ */
/*  Execution lock                                                    */
/* ------------------------------------------------------------------ */

let running = false;
let runningCommand = "";

/* ------------------------------------------------------------------ */
/*  Claude Code runner                                                */
/* ------------------------------------------------------------------ */

function runClaude(seoSubcommand) {
  return new Promise((resolveP, rejectP) => {
    const prompt =
      seoSubcommand === "report"
        ? `List all files in docs/seo/reports/ sorted by date. Read the most recent report and output its full content.`
        : `Run /seo ${seoSubcommand}. After completion, read the generated report file from docs/seo/reports/ and output its full content.`;

    const child = spawn(
      "claude",
      [
        "-p",
        prompt,
        "--output-format",
        "text",
        "--max-turns",
        "50",
      ],
      {
        cwd: PROJECT_ROOT,
        env: { ...process.env, FORCE_COLOR: "0" },
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 600_000, // 10 min max
      }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolveP(stdout.trim());
      } else {
        const detail = (stderr || stdout).trim().slice(0, 500);
        rejectP(
          new Error(
            `claude exited with code ${code}${detail ? `\n${detail}` : ""}`
          )
        );
      }
    });

    child.on("error", (err) => {
      rejectP(new Error(`Failed to spawn claude: ${err.message}`));
    });
  });
}

/* ------------------------------------------------------------------ */
/*  Telegram message helpers                                          */
/* ------------------------------------------------------------------ */

const MAX_MSG_LEN = 4096;

function splitMessage(text) {
  if (text.length <= MAX_MSG_LEN) return [text];

  const chunks = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= MAX_MSG_LEN) {
      chunks.push(remaining);
      break;
    }

    // Try to split at a section heading
    let splitAt = remaining.lastIndexOf("\n## ", MAX_MSG_LEN);
    if (splitAt <= 0) {
      // Try splitting at any newline
      splitAt = remaining.lastIndexOf("\n", MAX_MSG_LEN);
    }
    if (splitAt <= 0) {
      // Hard split
      splitAt = MAX_MSG_LEN;
    }

    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }

  return chunks;
}

async function sendLong(ctx, text) {
  const chunks = splitMessage(text);
  for (const chunk of chunks) {
    try {
      await ctx.reply(chunk, { parse_mode: "Markdown" });
    } catch {
      // If Markdown fails, send as plain text
      await ctx.reply(chunk);
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Bot setup                                                         */
/* ------------------------------------------------------------------ */

const bot = new Bot(BOT_TOKEN);

// Owner-only middleware
bot.use(async (ctx, next) => {
  if (ctx.from?.id !== OWNER_ID) return; // silently ignore
  await next();
});

// /help
bot.command("help", async (ctx) => {
  const lines = [
    "*TC Insurance SEO Bot*",
    "",
    "Available commands:",
    "",
  ];
  for (const [cmd, def] of Object.entries(SEO_COMMANDS)) {
    lines.push(`/${cmd} - ${def.label}`);
  }
  lines.push("");
  lines.push("/status - Bot status and last reports");
  lines.push("/help - This message");
  await ctx.reply(lines.join("\n"), { parse_mode: "Markdown" });
});

// /status
bot.command("status", async (ctx) => {
  const reportsDir = resolve(PROJECT_ROOT, "docs/seo/reports");
  const dataDir = resolve(PROJECT_ROOT, "docs/seo/data");

  let reports = [];
  try {
    const files = await fs.readdir(reportsDir);
    reports = files
      .filter((f) => f.endsWith(".md") && f !== ".gitkeep")
      .sort()
      .reverse()
      .slice(0, 5);
  } catch {
    // directory doesn't exist
  }

  let lastCrawl = "None";
  try {
    const files = await fs.readdir(dataDir);
    const crawls = files.filter((f) => f.startsWith("crawl-")).sort().reverse();
    if (crawls.length) lastCrawl = crawls[0].replace("crawl-", "").replace(".json", "");
  } catch {
    // directory doesn't exist
  }

  const lines = [
    "*Bot Status*",
    "",
    `Running: ${running ? `Yes (${runningCommand})` : "Idle"}`,
    `Last crawl: ${lastCrawl}`,
    "",
    "*Recent reports:*",
  ];

  if (reports.length === 0) {
    lines.push("No reports yet.");
  } else {
    for (const r of reports) {
      lines.push(`- ${r}`);
    }
  }

  await ctx.reply(lines.join("\n"), { parse_mode: "Markdown" });
});

// /start
bot.command("start", async (ctx) => {
  await ctx.reply(
    "TC Insurance SEO Bot ready. Use /help to see available commands."
  );
});

// SEO commands
for (const [cmd, def] of Object.entries(SEO_COMMANDS)) {
  bot.command(cmd, async (ctx) => {
    if (running) {
      await ctx.reply(
        `Another command is running (/${runningCommand}). Please wait for it to finish.`
      );
      return;
    }

    running = true;
    runningCommand = cmd;

    await ctx.reply(`Running ${def.label}... This may take a few minutes.`);

    try {
      const output = runClaude(def.seoCmd);
      const result = await output;

      if (result) {
        await sendLong(ctx, result);
      } else {
        await ctx.reply("Command completed but produced no output.");
      }
    } catch (err) {
      await ctx.reply(`Command failed:\n${String(err.message).slice(0, 500)}`);
    } finally {
      running = false;
      runningCommand = "";
    }
  });
}

/* ------------------------------------------------------------------ */
/*  Start                                                             */
/* ------------------------------------------------------------------ */

bot.catch((err) => {
  console.error("Bot error:", err.message);
});

console.log("TC Insurance SEO Bot starting...");
console.log(`  Owner ID: ${OWNER_ID}`);
console.log(`  Project:  ${PROJECT_ROOT}`);

await bot.api.setMyCommands([
  { command: "audit", description: "Technical SEO audit" },
  { command: "onpage", description: "On-Page SEO analysis" },
  { command: "analytics", description: "Analytics setup review" },
  { command: "content", description: "Content SEO analysis" },
  { command: "local", description: "Local SEO audit" },
  { command: "ai", description: "AI/GEO SEO analysis" },
  { command: "full", description: "Full SEO audit (all areas)" },
  { command: "report", description: "View latest report" },
  { command: "status", description: "Bot status and last reports" },
  { command: "help", description: "List all commands" },
]);

bot.start({
  onStart: () => console.log("Bot is running! Send /help in Telegram."),
});
