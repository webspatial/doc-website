# `@webspatial/starter`

`@webspatial/starter` is a CLI package for preparing WebSpatial resources inside an existing web project.

The package is designed around one high-level command that prepares the project for AI-assisted development. Today that means syncing bundled WebSpatial docs, agent resources, and project guidance into the project. Later versions can add more generated AI resources behind the same command without changing how developers use it.

## Usage

Run inside the target web project:

```bash
npx @webspatial/starter ai
```

By default, the command prepares AI resources in the current project and currently does the following:

- sync the bundled docs into `./.webspatial/docs`
- sync bundled project-local Codex skills into `./.codex/skills`
- add or update `./AGENTS.md` with managed WebSpatial project guidance
- sync Claude Code project memory into `./CLAUDE.md` plus `./.claude/webspatial-sdk-setup.md`
- when Git is present, add `/.webspatial/` to `.git/info/exclude`

### Target another project directory

```bash
npx @webspatial/starter ai --project-dir ../my-web-app
```

## Command Reference

### `ai`

Prepares WebSpatial AI resources for a target project directory.

Options:

- `--project-dir <path>`: Project root that should receive the generated WebSpatial AI resources. Defaults to the current working directory.
- `--cwd <path>`: Alias of `--project-dir`.
- `-h`, `--help`: Show help for the command.

Current effects:

- Sync the packaged Markdown docs into `.webspatial/docs`.
- Sync the packaged Codex skills into `.codex/skills`.
- Add or update a managed WebSpatial guidance block in `AGENTS.md`.
- Sync Claude Code memory resources into `CLAUDE.md` and `.claude/`.
- Add a managed `/.webspatial/` rule to `.git/info/exclude` when the project is inside a Git repository.

Behavior:

- The managed docs directory is hidden under `.webspatial/`, so it stays out of the way and does not appear in default `rg` searches.
- The managed docs directory is replaced on every run so stale files do not remain.
- Bundled skills are synced into project-local skill folders without clearing unrelated user skills.
- Existing `AGENTS.md` content is preserved. The command only inserts or updates its own managed WebSpatial section.
- Claude Code support follows Anthropic's project-memory model: a root `CLAUDE.md` imports a managed file under `.claude/`.
- Existing `CLAUDE.md` content is preserved. The command only creates the file when it is missing or inserts or updates its own managed blocks.
- When `.git/` exists, the command updates `.git/info/exclude` instead of editing the tracked `.gitignore`, so `.webspatial/` stays out of Git by default without creating a noisy repo diff.
- The managed output paths must stay inside the chosen project directory.
- The command refuses paths that would overwrite the package's bundled source docs.
- The command refuses paths that would overwrite the package's bundled source skills.
- The command refuses paths that would overwrite the package's bundled Claude resources.
