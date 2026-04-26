import fs from "fs";
import path from "path";

export default {
  name: "base",

  create({ targetDir, projectName }) {
    // =========================
    // FOLDERS
    // =========================
    const dirs = [
      "src",
      "src/config",
      "src/routes",
      "src/controllers",
      "src/utils"
    ];

    dirs.forEach((dir) => {
      fs.mkdirSync(path.join(targetDir, dir), {
        recursive: true
      });
    });

    // =========================
    // SERVER FILE
    // =========================
    const server = `
// ${projectName} server

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    console.log("🚀 ${projectName} running on port", PORT);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
`;

    fs.writeFileSync(
      path.join(targetDir, "src/index.js"),
      server.trim()
    );

    // =========================
    // PACKAGE.JSON
    // =========================
    const pkg = {
      name: projectName,
      version: "1.0.0",
      description: `${projectName} API`,
      type: "module",
      main: "src/index.js",
      scripts: {
        dev: "nodemon src/index.js",
        start: "node src/index.js"
      },
      dependencies: {
        dotenv: "^16.4.5"
      },
      devDependencies: {
        nodemon: "^3.0.0"
      }
    };

    fs.writeFileSync(
      path.join(targetDir, "package.json"),
      JSON.stringify(pkg, null, 2)
    );

    // =========================
    // .ENV
    // =========================
    const env = `
PORT=3000
NODE_ENV=development
`;

    fs.writeFileSync(
      path.join(targetDir, ".env"),
      env.trim()
    );

    // =========================
    // .GITIGNORE
    // =========================
    const gitignore = `
node_modules
.env
dist
coverage
logs
*.log
`;

    fs.writeFileSync(
      path.join(targetDir, ".gitignore"),
      gitignore.trim()
    );

    // =========================
    // README
    // =========================
    const readme = `
# ${projectName}

A modern Node.js API project.

## Setup

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Run in development:

\`\`\`bash
npm run dev
\`\`\`

Run in production:

\`\`\`bash
npm start
\`\`\`
`;

    fs.writeFileSync(
      path.join(targetDir, "README.md"),
      readme.trim()
    );

    console.log("✅ Project created successfully");
  }
};