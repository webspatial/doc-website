export { prepareAiResources } from "./prepare-ai-resources.js";
export { bundledDocsDir, defaultDocsOutputDir, syncDocs } from "./sync-docs.js";
export { defaultAgentsFile, syncAgentsGuidance } from "./sync-agents.js";
export {
  bundledSkillsDir,
  defaultProjectSkillsDir,
  syncBundledSkills
} from "./sync-skills.js";
export {
  bundledClaudeDir,
  defaultClaudeMemoryDir,
  defaultClaudeMemoryFile,
  managedClaudeImportPath,
  syncClaudeCodeMemory
} from "./sync-claude.js";
export { syncLocalGitExclude } from "./sync-git-exclude.js";
