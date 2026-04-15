import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { upsertManagedMarkdownBlock } from "./managed-markdown.js";
import { webspatialProjectGuidance } from "./project-guidance.js";

const sourceDirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(sourceDirname, "..");

export const bundledClaudeDir = path.join(packageRoot, "claude");
export const defaultClaudeMemoryDir = ".claude";
export const defaultClaudeMemoryFile = "CLAUDE.md";
export const managedClaudeImportPath = ".claude/webspatial-sdk-setup.md";

const managedSectionHeading = "## WebSpatial starter managed imports";
const managedImportLine = `- @${managedClaudeImportPath}`;

function isSamePath(left, right) {
  return path.resolve(left) === path.resolve(right);
}

function isSubpath(candidate, base) {
  const relative = path.relative(base, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function assertSafeClaudePaths(projectDir, memoryDir, importedMemoryPath) {
  if (!isSubpath(memoryDir, projectDir)) {
    throw new Error("The Claude Code memory directory must stay inside the target project.");
  }

  if (!isSubpath(importedMemoryPath, projectDir)) {
    throw new Error("The Claude Code imported memory file must stay inside the target project.");
  }

  const overlapsBundledClaude =
    isSamePath(memoryDir, bundledClaudeDir) ||
    isSubpath(memoryDir, bundledClaudeDir) ||
    isSubpath(bundledClaudeDir, memoryDir);

  if (overlapsBundledClaude) {
    throw new Error("The Claude Code memory directory cannot overlap the package's bundled Claude resources.");
  }
}

async function ensureClaudeRootContent(rootMemoryPath) {
  const guidance = await upsertManagedMarkdownBlock(
    rootMemoryPath,
    "webspatial-project-guidance",
    webspatialProjectGuidance
  );
  const imports = await upsertManagedMarkdownBlock(
    rootMemoryPath,
    "claude-imports",
    `${managedSectionHeading}\n\n${managedImportLine}`
  );

  return {
    created: guidance.created || imports.created,
    updated:
      (guidance.changed && !guidance.created) ||
      (imports.changed && !imports.created)
  };
}

export async function syncClaudeCodeMemory(options = {}) {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const memoryDir = path.resolve(projectDir, options.memoryDir ?? defaultClaudeMemoryDir);
  const rootMemoryPath = path.resolve(projectDir, options.memoryFile ?? defaultClaudeMemoryFile);
  const importedMemoryPath = path.resolve(projectDir, managedClaudeImportPath);

  assertSafeClaudePaths(projectDir, memoryDir, importedMemoryPath);

  await fs.access(bundledClaudeDir);
  await fs.mkdir(memoryDir, { recursive: true });

  const sourceMemoryPath = path.join(bundledClaudeDir, "webspatial-sdk-setup.md");
  await fs.copyFile(sourceMemoryPath, importedMemoryPath);
  const rootMemory = await ensureClaudeRootContent(rootMemoryPath);

  return {
    projectDir,
    memoryDir,
    rootMemoryPath,
    importedMemoryPath,
    fileCount: 2,
    rootMemoryCreated: rootMemory.created,
    rootMemoryUpdated: rootMemory.updated
  };
}
