#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Commands
import createCommand from "../core/commands/create.js";
import addCommand from "../core/commands/add.js";
import generateCommand from "../core/commands/generate.js";
import doctorCommand from "../core/commands/doctor.js";

// Fix dirname (ESM safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

async function bootstrap() {
  try {
    checkNodeVersion();

    const pkg = JSON.parse(
      await readFile(path.join(__dirname, "../package.json"), "utf-8")
    );

    program
      .name("cimi")
      .description("⚡ Cimi CLI - Node.js API scaffolding system")
      .version(pkg.version, "-v, --version", "output the version number")
      .helpOption("-h, --help", "display help for command");

    // UX improvements
    program.showHelpAfterError();
    program.showSuggestionAfterError();

    // Register commands
    program.addCommand(createCommand);
    program.addCommand(addCommand);
    program.addCommand(generateCommand);
    program.addCommand(doctorCommand);

    // Unknown command handler
    program.on("command:*", () => {
      console.error(
        chalk.red(`❌ Unknown command: ${program.args.join(" ")}`)
      );
      console.log(
        chalk.yellow("👉 Run 'cimi --help' to see available commands")
      );
      process.exit(1);
    });

    await program.parseAsync(process.argv);
  } catch (err) {
    handleError(err);
  }
}

// 🔍 Node version check (production must-have)
function checkNodeVersion() {
  const major = parseInt(process.versions.node.split(".")[0], 10);

  if (major < 18) {
    console.error(
      chalk.red("❌ Node.js 18 or higher is required to run Cimi CLI")
    );
    process.exit(1);
  }
}

// 💥 Central error handler
function handleError(err) {
  console.error(chalk.red("💥 Error:"), err.message);

  if (process.env.DEBUG) {
    console.error(err.stack);
  } else {
    console.log(chalk.gray("Run with DEBUG=1 for more details"));
  }

  console.log(chalk.yellow("👉 Try running: cimi doctor"));

  process.exit(1);
}

bootstrap();