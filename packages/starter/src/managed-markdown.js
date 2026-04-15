import fs from "node:fs/promises";

function getBeginMarker(name) {
  return `<!-- webspatial-starter:begin:${name} -->`;
}

function getEndMarker(name) {
  return `<!-- webspatial-starter:end:${name} -->`;
}

function renderManagedBlock(name, body) {
  return `${getBeginMarker(name)}\n${body.trim()}\n${getEndMarker(name)}`;
}

function getManagedBlockPattern(name) {
  return new RegExp(
    `${getBeginMarker(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${getEndMarker(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n?`,
    "m"
  );
}

export async function upsertManagedMarkdownBlock(filePath, name, body) {
  let created = false;
  let content = "";

  try {
    content = await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
      throw error;
    }
    created = true;
  }

  const block = `${renderManagedBlock(name, body)}\n`;
  const pattern = getManagedBlockPattern(name);
  const hasBlock = pattern.test(content);
  const normalized = hasBlock
    ? content.replace(pattern, block).replace(/\n{3,}/g, "\n\n").trimEnd()
    : content.trimEnd();
  const nextContent = hasBlock
    ? `${normalized}\n`
    : normalized
      ? `${normalized}\n\n${block}`
      : block;
  const changed = nextContent !== content;

  if (changed) {
    await fs.writeFile(filePath, nextContent, "utf8");
  }

  return {
    created,
    changed,
    hadBlock: hasBlock
  };
}
