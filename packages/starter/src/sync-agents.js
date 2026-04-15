import fs from "node:fs/promises";
import path from "node:path";
import { upsertManagedMarkdownBlock } from "./managed-markdown.js";
import { webspatialProjectGuidance } from "./project-guidance.js";

export const defaultAgentsFile = "AGENTS.md";

export async function syncAgentsGuidance(options = {}) {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const agentsPath = path.resolve(projectDir, options.fileName ?? defaultAgentsFile);

  await fs.mkdir(projectDir, { recursive: true });
  const result = await upsertManagedMarkdownBlock(
    agentsPath,
    "webspatial-project-guidance",
    webspatialProjectGuidance
  );

  return {
    projectDir,
    agentsPath,
    fileCount: 1,
    fileCreated: result.created,
    fileUpdated: result.changed && !result.created
  };
}
