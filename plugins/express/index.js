import fs from "fs";
import path from "path";

export default {
  name: "express",

  create({ targetDir, projectName }) {
    // =========================
    // FOLDERS
    // =========================
    const dirs = [
      "src",
      "src/config",
      "src/routes",
      "middleware",
      "src/controllers",
      "src/utils"
    ];

    dirs.forEach((dir) => {
      fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
    });

    // =========================
    // SERVER FILE
    // =========================
    const server = `
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express API running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

    fs.writeFileSync(
      path.join(targetDir, "src/server.js"),
      server.trim()
    );

    // =========================
    // PACKAGE.JSON
    // =========================
    const pkg = {
      name: projectName,
      version: "1.0.0",
      description: `${projectName} Express API`,
      type: "module",
      scripts: {
        dev: "node src/server.js",
        start: "node src/server.js"
      },
      dependencies: {
        express: "^4.18.2"
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
  }
};