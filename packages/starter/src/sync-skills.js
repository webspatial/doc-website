import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(sourceDirname, "..");

export const bundledSkillsDir = path.join(packageRoot, "skills");
export const defaultProjectSkillsDir = path.join(".codex", "skills");

function isSamePath(left, right) {
  return path.resolve(left) === path.resolve(right);
}

function isSubpath(candidate, base) {
  const relative = path.relative(base, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function assertSafeSkillsRoot(projectDir, skillsRootDir) {
  if (isSamePath(projectDir, skillsRootDir)) {
    throw new Error("The project skills directory cannot be the project root.");
  }

  if (!isSubpath(skillsRootDir, projectDir)) {
    throw new Error("The project skills directory must stay inside the target project.");
  }

  const overlapsBundledSkills =
    isSamePath(skillsRootDir, bundledSkillsDir) ||
    isSubpath(skillsRootDir, bundledSkillsDir) ||
    isSubpath(bundledSkillsDir, skillsRootDir);

  if (overlapsBundledSkills) {
    throw new Error("The project skills directory cannot overlap the package's bundled skills.");
  }
}

async function countFiles(dir) {
  let fileCount = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fileCount += await countFiles(entryPath);
      continue;
    }

    if (entry.isFile()) {
      fileCount += 1;
    }
  }

  return fileCount;
}

export async function syncBundledSkills(options = {}) {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const skillsRootDir = path.resolve(projectDir, options.skillsDir ?? defaultProjectSkillsDir);

  assertSafeSkillsRoot(projectDir, skillsRootDir);

  await fs.access(bundledSkillsDir);
  await fs.mkdir(skillsRootDir, { recursive: true });

  const sourceEntries = await fs.readdir(bundledSkillsDir, { withFileTypes: true });
  const syncedSkills = [];
  let fileCount = 0;

  for (const entry of sourceEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const sourceSkillDir = path.join(bundledSkillsDir, entry.name);
    const targetSkillDir = path.join(skillsRootDir, entry.name);

    await fs.rm(targetSkillDir, { recursive: true, force: true });
    await fs.cp(sourceSkillDir, targetSkillDir, {
      force: true,
      preserveTimestamps: true,
      recursive: true
    });

    syncedSkills.push(entry.name);
    fileCount += await countFiles(targetSkillDir);
  }

  return {
    projectDir,
    skillsRootDir,
    fileCount,
    skillCount: syncedSkills.length,
    syncedSkills
  };
}
