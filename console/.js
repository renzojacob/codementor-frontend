import fs from "fs";
import path from "path";

const current = process.cwd();
const root = path.resolve(current, "..");

// --- Read ignored folders ---
let IGNORE_DIRS = [];
try {
  const fileContent = fs.readFileSync("ignore-items.txt", "utf-8");
  IGNORE_DIRS = fileContent
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
} catch {
  console.warn("\x1b[1;33mNo ignore-folders.txt found. Proceeding without ignore list.\x1b[0m");
}

// --- Build directory tree recursively ---
function buildTree(dirPath) {
  const stats = fs.statSync(dirPath);
  const tree = {};

  if (stats.isDirectory()) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Sort: files first, then folders
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return 1;
      if (!a.isDirectory() && b.isDirectory()) return -1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of entries) {
      if (IGNORE_DIRS.includes(entry.name)) continue;
      const fullPath = path.join(dirPath, entry.name);
      tree[entry.name] = entry.isDirectory() ? buildTree(fullPath) : null;
    }
  }

  return tree;
}

// --- Convert tree object to printable format ---
function printTree(tree, prefix = "") {
  const entries = Object.entries(tree);
  return entries
    .map(([name, value], i) => {
      const isLast = i === entries.length - 1;
      const connector = isLast ? "└─ " : "├─ ";
      const display = value ? `${name}/` : name;
      const nextPrefix = prefix + (isLast ? "   " : "│  ");
      const children = value ? printTree(value, nextPrefix) : "";
      return prefix + connector + display + "\n" + children;
    })
    .join("");
}

// --- MAIN ---
const args = process.argv.slice(2);
const target = args[0] ?? "."; // "." or a folder path
const mode = (args[1] ?? "c").toLowerCase(); // "c" or "s"

// Root directory detection //process.cwd() -> current dir
const rootPath = path.resolve(target === "." ? root : root + "/"+ target);
const rootName = path.basename(rootPath);

if (!fs.existsSync(rootPath)) {
  console.error(`\x1b[0;31mThe specified path "${target}" does not exist.\x1b[0m`);
  process.exit(1);
}

// Generate tree structure
const tree = buildTree(rootPath);

// Format output with timestamp
const now = new Date();
const timestamp = now.toLocaleString("en-US", { hour12: false });
const header =
  `Directory Tree — Generated on ${timestamp}\n` +
  `Root: ${rootName}\n\n`;

const output = header + rootName + "/\n" + printTree(tree);

// --- Instructions ---
const instructions = `

\x1b[1;34mSample Usage:\x1b[0m
\x1b[0;33mnode .js "." c\x1b[0m               Print full project tree in console
\x1b[0;33mnode .js "." s\x1b[0m               Save full project tree to tree.txt
\x1b[0;33mnode .js "<foldername>" c\x1b[0m    Print only <foldername> folder tree
\x1b[0;33mnode .js "<foldername>" s\x1b[0m    Save only <foldername> tree to tree.txt
`;


// --- Output depending on mode ---
if (mode === "c") {
  console.log(output);
} else if (mode === "s") {
  fs.writeFileSync("../structure/tree.txt", output, { encoding: "utf8" });
  console.log("\x1b[1;32mSaved directory tree to tree.txt\x1b[0m");
} else {
  console.error('\x1b[1;31mInvalid mode. Use "c" (console) or "s" (save).\x1b[0m' + instructions);
}
