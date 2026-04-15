import path from "node:path";
import { prepareAiResources } from "./prepare-ai-resources.js";

class CliError extends Error {
  constructor(message, exitCode = 1) {
    super(message);
    this.name = "CliError";
    this.exitCode = exitCode;
  }
}

function getGeneralHelp() {
  return [
    "webspatial-starter",
    "",
    "Usage:",
    "  webspatial-starter ai [--project-dir <path>]",
    "",
    "Commands:",
    "  ai            Prepare WebSpatial AI resources for a local project.",
    "",
    "Run `webspatial-starter ai --help` for command-specific options."
  ].join("\n");
}

function getAiHelp() {
  return [
    "webspatial-starter ai",
    "",
    "Usage:",
    "  webspatial-starter ai [--project-dir <path>]",
    "",
    "Options:",
    "  --project-dir <path>  Target web project root. Defaults to the current working directory.",
    "  --cwd <path>          Alias of --project-dir.",
    "  -h, --help            Show this help message."
  ].join("\n");
}

function parseKeyValueArgs(args, allowedKeys) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];

    if (current === "-h" || current === "--help") {
      options.help = true;
      continue;
    }

    if (!current.startsWith("--")) {
      throw new CliError(`Unknown argument: ${current}`);
    }

    if (!allowedKeys.has(current)) {
      throw new CliError(`Unknown option: ${current}`);
    }

    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      throw new CliError(`Missing value for ${current}`);
    }

    options[current] = next;
    index += 1;
  }

  return options;
}

function formatPrepareSuccess(result) {
  const lines = [
    "Prepared WebSpatial AI resources.",
    `Project: ${result.projectDir}`
  ];

  for (const action of result.actions) {
    const relativeTarget = path.relative(result.projectDir, action.outputDir) || ".";
    if (action.kind === "skills") {
      lines.push(
        `- ${action.label}: ${action.skillCount} skill${action.skillCount === 1 ? "" : "s"}, ${action.fileCount} file${action.fileCount === 1 ? "" : "s"} -> ${relativeTarget}`
      );
      continue;
    }

    if (action.kind === "agents") {
      const summary = action.fileCreated
        ? "created AGENTS.md block"
        : action.fileUpdated
          ? "updated AGENTS.md block"
          : "reused existing AGENTS.md block";
      lines.push(
        `- ${action.label}: ${action.fileCount} file${action.fileCount === 1 ? "" : "s"} -> ${relativeTarget} (${summary})`
      );
      continue;
    }

    if (action.kind === "claude") {
      const summary = action.rootMemoryCreated
        ? "created CLAUDE.md managed blocks"
        : action.rootMemoryUpdated
          ? "updated CLAUDE.md managed blocks"
          : "reused existing CLAUDE.md managed blocks";
      lines.push(
        `- ${action.label}: ${action.fileCount} file${action.fileCount === 1 ? "" : "s"} -> ${relativeTarget} (${summary})`
      );
      continue;
    }

    if (action.kind === "git-exclude") {
      if (action.skipped) {
        lines.push(`- ${action.label}: skipped (no Git repository detected)`);
        continue;
      }

      const summary = action.fileCreated
        ? "created local exclude block"
        : action.fileUpdated
          ? "updated local exclude block"
          : "reused existing local exclude block";
      lines.push(`- ${action.label}: ${action.fileCount} file -> .git/info/exclude (${summary})`);
      continue;
    }

    lines.push(`- ${action.label}: ${action.fileCount} file${action.fileCount === 1 ? "" : "s"} -> ${relativeTarget}`);
  }

  return lines.join("\n");
}

export async function runCli(argv, io = {}) {
  const stdout = io.stdout ?? process.stdout;
  const cwd = io.cwd ?? process.cwd();

  if (argv.length === 0 || argv[0] === "-h" || argv[0] === "--help") {
    stdout.write(`${getGeneralHelp()}\n`);
    return;
  }

  if (argv[0] !== "ai") {
    throw new CliError(`Unknown command: ${argv[0]}`);
  }

  if (argv.length === 1) {
    const result = await prepareAiResources({ projectDir: cwd });
    stdout.write(`${formatPrepareSuccess(result)}\n`);
    return;
  }

  if (argv[1] === "-h" || argv[1] === "--help") {
    stdout.write(`${getAiHelp()}\n`);
    return;
  }

  const options = parseKeyValueArgs(argv.slice(1), new Set(["--project-dir", "--cwd"]));
  if (options.help) {
    stdout.write(`${getAiHelp()}\n`);
    return;
  }

  const projectDir = path.resolve(cwd, options["--project-dir"] ?? options["--cwd"] ?? ".");

  const result = await prepareAiResources({
    projectDir
  });

  stdout.write(`${formatPrepareSuccess(result)}\n`);
}
