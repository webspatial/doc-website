# `@webspatial/starter`

`@webspatial/starter` is a CLI utilities for adding local AI resources for WebSpatial to existing web projects or scaffolding new WebSpatial projects.

The package currently supports two high-level workflows:

- prepare AI resources inside an existing project
- scaffold a new WebSpatial web project

Today the AI-resource flow syncs bundled WebSpatial docs, agent resources, and project guidance into the project, and the default scaffold is a React + TypeScript + Vite + WebSpatial template.

## Monorepo Development

Inside this repository, `@webspatial/starter` is managed as a `pnpm` workspace package under `packages/starter/`.

Install dependencies from the repository root:

```bash
pnpm install
```

Run the starter test suite from the repository root:

```bash
pnpm starter:test
```

## Usage

### `create`

Create a new project:

```bash
npx @webspatial/starter create my-webspatial-app
```

If you are already inside an empty target directory, you can omit the directory name:

```bash
npx @webspatial/starter create
```

This scaffolds the default bundled template into `./my-webspatial-app` and then automatically runs the equivalent of the `ai` command inside that new project.

Then install dependencies inside the generated project:

```bash
cd my-webspatial-app
pnpm install
```

### `ai`

Run inside an existing target web project:

```bash
npx @webspatial/starter ai
```

Or target another project directory:

```bash
npx @webspatial/starter ai --project-dir ../my-web-app
```

By default, the command prepares AI resources in the current project and currently does the following:

- sync the bundled docs into `./.webspatial/docs`
- sync bundled project-local Codex skills into `./.codex/skills`
- add or update `./AGENTS.md` with managed WebSpatial project guidance
- sync Claude Code project memory into `./CLAUDE.md` plus `./.claude/webspatial-sdk-setup.md`
- when Git is present, add `/.webspatial/` to `.git/info/exclude`

## Command Reference

### `create`

Scaffolds a new WebSpatial web project and automatically prepares its local AI resources.

Usage:

```bash
npx @webspatial/starter create [project-dir]
```

Options:

- `--template <name>`: Scaffold template to use. Defaults to `vite`.
- `-h`, `--help`: Show help for the command.

Current behavior:

- Creates a new project directory from a bundled scaffold template, or scaffolds into the current working directory when no directory argument is provided.
- Personalizes the generated project name in the template's `package.json`, manifest, and HTML title.
- Runs the same AI-resource preparation flow as `ai` inside the new project.
- Refuses to write into a non-empty target directory.
- Refuses paths that would overlap the package's bundled scaffold source.

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

## Release Process

This package is published from the workspace root with Changesets and GitHub Actions.

For release-worthy changes:

1. Run `pnpm changeset` from the repository root.
2. Select `@webspatial/starter`.
3. Commit the generated changeset file with the code change.

After that changeset reaches `main`, the repository workflow `.github/workflows/release-starter.yml` opens or updates the starter release PR. Merging that release PR publishes the new version to npm when `NPM_TOKEN` is configured in GitHub Actions secrets.
