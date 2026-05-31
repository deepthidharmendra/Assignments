#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import path from "path";

// ─── Banner ───────────────────────────────────────────────────────────────────
function showBanner() {
  console.log(
    chalk.cyan(figlet.textSync("Folder Architect", { horizontalLayout: "fitted" }))
  );
  console.log(chalk.gray("  Generate folder structures with ease\n"));
}

// ─── Create folders & files recursively ──────────────────────────────────────
function createStructure(basePath, structure) {
  for (const item of structure) {
    const fullPath = path.join(basePath, item.name);

    if (item.type === "folder") {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(chalk.blue(`  📁 Created folder: ${fullPath}`));
      } else {
        console.log(chalk.yellow(`  ⚠️  Folder already exists: ${fullPath}`));
      }

      // Recurse into children
      if (item.children && item.children.length > 0) {
        createStructure(fullPath, item.children);
      }
    } else {
      // It's a file
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, item.content || "");
        console.log(chalk.green(`  📄 Created file:   ${fullPath}`));
      } else {
        console.log(chalk.yellow(`  ⚠️  File already exists: ${fullPath}`));
      }
    }
  }
}

// ─── Parse user folder-tree string ───────────────────────────────────────────
// Supports indented text like:
//   src/
//     components/
//       Header.js
//     utils/
//       helpers.js
//   public/
//     index.html
function parseTree(input) {
  const lines = input.split("\n").filter((l) => l.trim() !== "");
  const root = [];
  const stack = [{ children: root, indent: -1 }];

  for (const line of lines) {
    const indent = line.search(/\S/); // first non-space position
    const name = line.trim().replace(/\/$/, ""); // strip trailing slash
    const isFolder = line.trim().endsWith("/");

    const node = {
      name,
      type: isFolder ? "folder" : "file",
      children: [],
      content: isFolder ? undefined : `// ${name}\n`,
    };

    // Pop stack until we find the right parent
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    stack[stack.length - 1].children.push(node);

    if (isFolder) {
      stack.push({ children: node.children, indent });
    }
  }

  return root;
}

// ─── Visualise the generated tree ────────────────────────────────────────────
function printTree(nodes, prefix = "") {
  nodes.forEach((node, i) => {
    const isLast = i === nodes.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const icon = node.type === "folder" ? "📁 " : "📄 ";
    console.log(chalk.white(prefix + connector + icon + node.name));
    if (node.children && node.children.length > 0) {
      printTree(node.children, prefix + (isLast ? "    " : "│   "));
    }
  });
}

// ─── Preset templates ────────────────────────────────────────────────────────
const TEMPLATES = {
  "Node.js / Express API": `src/
  controllers/
    userController.js
  models/
    userModel.js
  routes/
    userRoutes.js
  middlewares/
    authMiddleware.js
  config/
    db.js
  app.js
index.js
.env
.gitignore
package.json`,

  "React App": `public/
  index.html
src/
  components/
    Header.jsx
    Footer.jsx
  pages/
    Home.jsx
    About.jsx
  hooks/
    useFetch.js
  styles/
    App.css
  App.jsx
  index.jsx
.gitignore
package.json`,

  "Full-Stack (React + Node)": `client/
  src/
    components/
      Navbar.jsx
    pages/
      Home.jsx
    App.jsx
    index.jsx
  package.json
server/
  src/
    controllers/
      index.js
    routes/
      index.js
    models/
      index.js
  index.js
  package.json
.gitignore
README.md`,

  "Custom (I'll type my own structure)": null,
};

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  showBanner();

  // Step 1 — output directory
  const { outputDir } = await inquirer.prompt([
    {
      type: "input",
      name: "outputDir",
      message: chalk.cyan("📂 Where should the folders be created? (path or . for current dir)"),
      default: ".",
      validate: (val) => val.trim() !== "" || "Path cannot be empty",
    },
  ]);

  // Step 2 — project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: chalk.cyan("🏷️  Project / root folder name:"),
      default: "my-project",
      validate: (val) =>
        /^[a-zA-Z0-9_\-. ]+$/.test(val.trim()) || "Use only letters, numbers, dashes, underscores",
    },
  ]);

  // Step 3 — template or custom
  const { templateChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "templateChoice",
      message: chalk.cyan("📋 Choose a template or create your own:"),
      choices: Object.keys(TEMPLATES),
    },
  ]);

  let treeInput = TEMPLATES[templateChoice];

  // Step 4 — if custom, ask for tree
  if (treeInput === null) {
    console.log(
      chalk.gray(
        "\n  Enter your folder structure below.\n" +
          "  • Use indentation (2 spaces) to show nesting.\n" +
          "  • End folder names with /\n" +
          "  • Type END on a new line when done.\n"
      )
    );

    const lines = [];
    const rl = (await import("readline")).createInterface({ input: process.stdin });

    await new Promise((resolve) => {
      rl.on("line", (line) => {
        if (line.trim() === "END") {
          rl.close();
          resolve();
        } else {
          lines.push(line);
        }
      });
    });

    treeInput = lines.join("\n");
  }

  // Step 5 — parse & preview
  const structure = parseTree(treeInput);
  const rootPath = path.resolve(outputDir, projectName);

  console.log(chalk.magenta(`\n  📐 Preview — ${projectName}/`));
  printTree(structure);

  // Step 6 — confirm
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: chalk.cyan("\n🚀 Generate this structure?"),
      default: true,
    },
  ]);

  if (!confirm) {
    console.log(chalk.red("\n  ❌ Aborted. No files were created.\n"));
    process.exit(0);
  }

  // Step 7 — create root folder then structure
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
    console.log(chalk.blue(`\n  📁 Created root: ${rootPath}`));
  }

  console.log(chalk.white("\n  Building structure...\n"));
  createStructure(rootPath, structure);

  console.log(
    chalk.green(`\n  ✅ Done! Your project "${projectName}" is ready at:\n`) +
      chalk.cyan(`     ${rootPath}\n`)
  );
}

main().catch((err) => {
  console.error(chalk.red("\n  ❌ Error: " + err.message));
  process.exit(1);
});
