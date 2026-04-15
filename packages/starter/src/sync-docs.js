import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(sourceDirname, "..");

export const bundledDocsDir = path.join(packageRoot, "docs");
export const defaultDocsOutputDir = path.join(".webspatial", "docs");

function isSamePath(left, right) {
  return path.resolve(left) === path.resolve(right);
}

function isSubpath(candidate, base) {
  const relative = path.relative(base, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function assertSafeOutputPath(projectDir, outputDir) {
  if (isSamePath(projectDir, outputDir)) {
    throw new Error("The docs output directory cannot be the project root.");
  }

  if (!isSubpath(outputDir, projectDir)) {
    throw new Error("The docs output directory must stay inside the target project.");
  }

  const overlapsBundledDocs =
    isSamePath(outputDir, bundledDocsDir) ||
    isSubpath(outputDir, bundledDocsDir) ||
    isSubpath(bundledDocsDir, outputDir);

  if (overlapsBundledDocs) {
    throw new Error("The docs output directory cannot overlap the package's bundled docs.");
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

export async function syncDocs(options = {}) {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const outputDir = path.resolve(projectDir, options.outDir ?? defaultDocsOutputDir);

  assertSafeOutputPath(projectDir, outputDir);

  await fs.access(bundledDocsDir);
  await fs.mkdir(projectDir, { recursive: true });
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.cp(bundledDocsDir, outputDir, {
    force: true,
    preserveTimestamps: true,
    recursive: true
  });

  return {
    projectDir,
    outputDir,
    fileCount: await countFiles(outputDir)
  };
}
