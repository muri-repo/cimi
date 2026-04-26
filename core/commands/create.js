// cimi/core/commands/create.js

import { Command } from "commander";
import fs from "fs";
import os from "os";
import path from "path";
import { createSpinner } from "nanospinner";
import logger from "../utils/logger.js";
import { loadPlugin, getAvailablePlugins } from "../../plugins/registry.js";
import chalk from "chalk";
import inquirer from "inquirer";
import { exec } from "child_process";


/**
 * Prompt helpers
 */

async function promptProjectName(nameArg) {
  if (nameArg) return nameArg;

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (input) =>
        input.trim() !== "" || "Project name cannot be empty",
    },
  ]);

  return projectName;
}

async function pickDirectory() {
  return new Promise((resolve) => {
    const psScript = `
Add-Type -AssemblyName System.Windows.Forms

$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = "Select project directory"
$dialog.ShowNewFolderButton = $true

if ($dialog.ShowDialog() -eq "OK") {
  Write-Output $dialog.SelectedPath
}
`;

    const tempFile = path.join(
      os.tmpdir(),
      `cimi-folder-${Date.now()}.ps1`
    );

    fs.writeFileSync(tempFile, psScript);

    exec(
      `powershell -STA -NoProfile -ExecutionPolicy Bypass -File "${tempFile}"`,
      (err, stdout) => {
        try {
          fs.unlinkSync(tempFile);
        } catch {}

        if (err) return resolve(null);

        const result = stdout.trim();

        if (!result) return resolve(null);

        resolve(result);
      }
    );
  });
}

async function promptDirectory() {
  const cwd = process.cwd();

  const { dirChoice } = await inquirer.prompt([
    {
      type: "rawlist",
      name: "dirChoice",
      message:
        "Where would you like to create your project?\n" +
        "Use arrow keys or type a number [Then press Enter]:",
      choices: [
        `Use the current folder (${cwd})`,
        "Create the project inside a new folder (recommended)",
        "Choose a different location on your computer",
        "Cancel",
      ],
    },
  ]);

  if (dirChoice === "Cancel") {
    console.log("\nOperation cancelled.");
    process.exit(0);
  }

  if (dirChoice.startsWith("Use the current")) {
    return ".";
  }

  if (dirChoice.startsWith("Create the project")) {
    const { folder } = await inquirer.prompt([
      {
        type: "input",
        name: "folder",
        message: "Enter the name of the new folder:",
        default: "projects",
      },
    ]);

    return folder;
  }

  if (dirChoice.startsWith("Choose a different")) {
    const selectedPath = await pickDirectory();

    if (!selectedPath) {
      console.log(
        "\n⚠️ No folder selected. Using current directory."
      );
      return ".";
    }

    console.log(
      `\n📁 Selected folder:\n${path.resolve(selectedPath)}\n`
    );

    return selectedPath;
  }
}

async function promptTemplate(templateArg) {
  if (templateArg) return templateArg;

  const plugins = await getAvailablePlugins();

  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a template:",
      choices: plugins.map((p) => ({
        name: p.name,
        value: p.name,
      })),
    },
  ]);

  return template;
}

async function promptFramework() {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: [
        "express",
        "fastify",
        "nextjs",
        "koa",
      ],
    },
  ]);

  return framework;
}

/**
 * Create command
 */

const createCommand = new Command("create")
  .description("Create a new project from a template")
  .argument("[project-name]", "Name of the project")
  .option("-t, --template <template>", "Template to use")
  .option("-d, --dir <directory>", "Output directory")
  .option("-f, --framework <framework>", "Framework to use")
  .action(async (projectNameArg, options) => {
    try {
      /**
       * 1. Ask questions
       */

      const projectName =
        await promptProjectName(projectNameArg);

      const dir =
        options.dir || (await promptDirectory());

      const template =
        await promptTemplate(options.template);

      const framework =
        options.framework || (await promptFramework());

      const targetDir = path.resolve(
        process.cwd(),
        dir,
        projectName
      );

      logger.debug(`Target directory: ${targetDir}`);
      logger.debug(`Template: ${template}`);
      logger.debug(`Framework: ${framework}`);

      const spinner = createSpinner(
        `Creating project: ${projectName}`
      ).start();

      /**
       * 2. Prevent overwrite
       */

      if (fs.existsSync(targetDir)) {
        spinner.error("Directory already exists");
        process.exit(1);
      }

      /**
       * 3. Create base folder
       */

      fs.mkdirSync(targetDir, {
        recursive: true,
      });

      /**
       * 4. Load plugin
       */

      const plugin = await loadPlugin(template);

      spinner.update(
        `Running ${plugin.name} plugin...`
      );

      /**
       * 5. Execute plugin
       */

      await plugin.create({
        targetDir,
        projectName,
        framework,
      });

      spinner.success(
        chalk.green(
          `Project "${projectName}" created using ${plugin.name}`
        )
      );

      console.log(`
Next steps:

cd ${projectName}
npm install
npm run dev
      `);
    } catch (err) {
      console.error(
        chalk.red("❌ Failed to create project")
      );

      logger.error(err);

      process.exit(1);
    }
  });

export default createCommand;