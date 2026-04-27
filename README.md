# CIMI CLI
<p align="left">
  <img src="https://img.shields.io/github/v/release/muri-repo/cimi" />
  <img src="https://img.shields.io/npm/l/cimi?style=for-the-badge&color=brightgreen" />
</p>

## What does **CIMI** stand for?

| Letter | Meaning |
|--------|--------|
| **C** | Create |
| **I** | Instant |
| **M** | Modern |
| **I** | Infrastructure |

<p align="left">
⚡ A fast CLI tool for generating Node.js project templates
</p>
An automated scaffolding engine for rapid project initialization.
License: MIT

Version
This CLI is a high-performance utility designed to eliminate boilerplate fatigue. It allows you to transform local or remote directories into reusable blueprints, ensuring that every new repository starts with a consistent architecture and "best-practice" configurations.
## ✨ Features
 * Prompt-Driven Setup: Interactive terminal interface for dynamic variable injection.
 * Agnostic Engine: Scaffolds everything from React/Node.js apps to Python data scripts.
 * Configuration Sync: Supports .json or .yaml manifest files for template metadata.
 * Git Integration: Pull templates directly from remote repositories.
 * Custom Hooks: Execute post-install commands (like npm install or git init) automatically.
## 🛠️ Getting Started
## Most Used Languages (CIMI)

<p>
  <img 
    src="https://github-readme-stats.vercel.app/api/top-langs/?username=muri-repo&repo=CIMI&layout=compact" 
  />
</p>

## INSTALLATION
### Clone the repository
git clone https://github.com/yourusername/cli-template-gen.git

# Navigate to directory
```bash
cd cimi
```

# Install dependencies and link globally

```bash
npm install -g .  # For Node.js
```

## 💻 Usage
Initialize a new project by running the core command:
gen create my-new-app --template web-premium


### Core Commands
| Command | Action |
|---|---|
| create <name> | Launch the interactive project generator. |
| add | Add modules or features to your project. |
| generate |  Generate specific files from templates. |
| doctor |  Check project health and dependencies. |
| help | display help for command. |

### Create command
<p align="left">
  <img src="https://github.com/muri-repo/cimi/blob/main/assets/terminal-test.png?raw=true" width="50%" />
</p>

## 📂 Project Architecture

```text
cimi/
├── bin/                     # CLI executable entry point
├── core/
│   ├── commands/            # create, add, doctor, generate
│   ├── config/              # Global and project configuration
│   └── utils/               # Logger, filesystem helpers
├── plugins/                 # Template and feature plugins
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```



## Support The Project
<p align="left">

<a href="https://github.com/muri-repo/cimi">
  <img src="https://img.shields.io/badge/⭐-Star%20Repo-black?style=for-the-badge" />
</a>

<a href="https://github.com/muri-repo/cimi/issues">
  <img src="https://img.shields.io/badge/🐛-Report%20Issue-red?style=for-the-badge" />
</a>

<a href="https://github.com/muri-repo/cimi/issues">
  <img src="https://img.shields.io/badge/💡-Suggest%20Feature-blue?style=for-the-badge" />
</a>

<a href="https://github.com/muri-repo/cimi/pulls">
  <img src="https://img.shields.io/badge/🛠️-Contribute-green?style=for-the-badge" />
</a>

</p>

## 🛡️ License
This project is licensed under the MIT License.

## 🤝 Contact

Have questions, suggestions, or found a bug? We'd love to hear from you.

**Project Maintainer**
**Name:** muri

**GitHub:** https://github.com/muri-repo
**Repository:** https://github.com/muri-repo/cimi

### Support & Contributions

* 🐛 **Report Issues:** Open an issue in the repository
* 💡 **Feature Requests:** Submit a feature request via GitHub Issues
* 🤝 **Contribute:** Fork the repo and submit a pull request

### Community

Stay connected and get updates:

* Discussions: https://github.com/muri-repo/cimi/discussions
* Documentation: https://github.com/muri-repo/cimi/wiki

---

**Response Time:** Typically within 24–48 hours.

