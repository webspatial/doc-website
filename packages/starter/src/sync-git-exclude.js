import fs from "node:fs/promises";
import path from "node:path";

const beginMarker = "# webspatial-starter:begin:local-exclude";
const endMarker = "# webspatial-starter:end:local-exclude";
const managedBlock = `${beginMarker}\n/.webspatial/\n${endMarker}\n`;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function resolveGitDir(projectDir) {
  const dotGitPath = path.join(projectDir, ".git");

  try {
    const stat = await fs.stat(dotGitPath);
    if (stat.isDirectory()) {
      return dotGitPath;
    }

    if (stat.isFile()) {
      const content = await fs.readFile(dotGitPath, "utf8");
      const match = content.match(/^gitdir:\s*(.+)\s*$/im);
      if (match) {
        return path.resolve(projectDir, match[1]);
      }
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }

  return null;
}

export async function syncLocalGitExclude(options = {}) {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const gitDir = await resolveGitDir(projectDir);

  if (!gitDir) {
    return {
      projectDir,
      excludePath: null,
      fileCount: 0,
      skipped: true
    };
  }

  const excludePath = path.join(gitDir, "info", "exclude");
  await fs.mkdir(path.dirname(excludePath), { recursive: true });

  let content = "";
  let created = false;

  try {
    content = await fs.readFile(excludePath, "utf8");
  } catch (error) {
    if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
      throw error;
    }
    created = true;
  }

  const pattern = new RegExp(`${escapeRegExp(beginMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}\\n?`, "m");
  const hasManagedBlock = pattern.test(content);
  const normalized = hasManagedBlock
    ? content.replace(pattern, managedBlock).replace(/\n{3,}/g, "\n\n").trimEnd()
    : content.trimEnd();
  const nextContent = hasManagedBlock
    ? `${normalized}\n`
    : normalized
      ? `${normalized}\n\n${managedBlock}`
      : managedBlock;
  const changed = nextContent !== content;

  if (changed) {
    await fs.writeFile(excludePath, nextContent, "utf8");
  }

  return {
    projectDir,
    excludePath,
    fileCount: 1,
    skipped: false,
    fileCreated: created,
    fileUpdated: changed && !created
  };
}
