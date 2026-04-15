import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareAiResources } from "./prepare-ai-resources.js";

const sourceDirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(sourceDirname, "..");

export const bundledScaffoldingDir = path.join(packageRoot, "scaffolding");
export const defaultScaffoldTemplate = "vite";

function shouldIgnoreEntry(name) {
  return name === ".DS_Store";
}

function isSamePath(left, right) {
  return path.resolve(left) === path.resolve(right);
}

function isSubpath(candidate, base) {
  const relative = path.relative(base, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

async function countFiles(dir) {
  let fileCount = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (shouldIgnoreEntry(entry.name)) {
      continue;
    }

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

function sanitizePackageName(projectName) {
  const normalized = projectName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[._-]+|[._-]+$/g, "")
    .replace(/-{2,}/g, "-");

  if (!normalized || !/[a-z0-9]/.test(normalized)) {
    return "webspatial-app";
  }

  return normalized.slice(0, 214).replace(/[._-]+$/g, "") || "webspatial-app";
}

function formatDisplayName(projectName) {
  const spaced = projectName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!spaced) {
    return "WebSpatial App";
  }

  return spaced
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function ensureTemplateDir(templateName) {
  const templateDir = path.join(bundledScaffoldingDir, templateName);

  try {
    const stat = await fs.stat(templateDir);
    if (!stat.isDirectory()) {
      throw new Error(`Scaffold template "${templateName}" is not a directory.`);
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      const templates = await listScaffoldTemplates();
      const suffix = templates.length > 0
        ? ` Available templates: ${templates.join(", ")}.`
        : "";
      throw new Error(`Unknown scaffold template: ${templateName}.${suffix}`);
    }
    throw error;
  }

  return templateDir;
}

function assertSafeProjectDir(projectDir, templateDir) {
  const overlapsBundledTemplates =
    isSamePath(projectDir, bundledScaffoldingDir) ||
    isSubpath(projectDir, bundledScaffoldingDir) ||
    isSubpath(bundledScaffoldingDir, projectDir) ||
    isSamePath(projectDir, templateDir) ||
    isSubpath(projectDir, templateDir) ||
    isSubpath(templateDir, projectDir);

  if (overlapsBundledTemplates) {
    throw new Error("The target project directory cannot overlap the package's bundled scaffolding templates.");
  }
}

async function ensureEmptyProjectDir(projectDir) {
  try {
    const stat = await fs.stat(projectDir);

    if (!stat.isDirectory()) {
      throw new Error("The target project path already exists and is not a directory.");
    }

    const entries = await fs.readdir(projectDir);
    if (entries.length > 0) {
      throw new Error("The target project directory must be empty or not exist.");
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      await fs.mkdir(projectDir, { recursive: true });
      return;
    }
    throw error;
  }
}

async function copyDirectoryContents(sourceDir, targetDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (shouldIgnoreEntry(entry.name)) {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    await fs.cp(sourcePath, targetPath, {
      filter(currentSourcePath) {
        return !shouldIgnoreEntry(path.basename(currentSourcePath));
      },
      force: true,
      preserveTimestamps: true,
      recursive: true
    });
  }
}

async function personalizeProjectFiles(projectDir, packageName, displayName) {
  const packageJsonPath = path.join(projectDir, "package.json");
  const manifestPath = path.join(projectDir, "public", "manifest.webmanifest");
  const indexHtmlPath = path.join(projectDir, "index.html");

  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  packageJson.name = packageName;
  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  manifest.name = displayName;
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const indexHtml = await fs.readFile(indexHtmlPath, "utf8");
  const nextIndexHtml = indexHtml.replace(/<title>[^<]*<\/title>/i, `<title>${displayName}</title>`);
  await fs.writeFile(indexHtmlPath, nextIndexHtml, "utf8");
}

export async function listScaffoldTemplates() {
  try {
    const entries = await fs.readdir(bundledScaffoldingDir, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort();
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function createProject(options = {}) {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const templateName = options.template ?? defaultScaffoldTemplate;
  const templateDir = await ensureTemplateDir(templateName);

  assertSafeProjectDir(projectDir, templateDir);
  await ensureEmptyProjectDir(projectDir);
  await copyDirectoryContents(templateDir, projectDir);

  const projectName = path.basename(projectDir);
  const packageName = sanitizePackageName(projectName);
  const displayName = formatDisplayName(projectName);

  await personalizeProjectFiles(projectDir, packageName, displayName);

  const aiResources = await prepareAiResources({ projectDir });

  return {
    projectDir,
    templateName,
    packageName,
    displayName,
    actions: [
      {
        kind: "template",
        label: "Created project from bundled scaffold",
        outputDir: projectDir,
        fileCount: await countFiles(templateDir),
        templateName,
        packageName
      },
      ...aiResources.actions
    ]
  };
}
