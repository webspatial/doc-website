# CLAUDE.md

Claude Code should treat this file and `DOCS_MAINTENANCE_GUIDE.md` as the project operating rules for this repository.

## What This Repo Is

- WebSpatial documentation website built with Docusaurus 3
- English latest docs in `docs/`
- Simplified Chinese latest docs in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`
- Published legacy `1.0.x` docs in `versioned_docs/version-1.0.x/`
- Simplified Chinese legacy docs in `i18n/zh-Hans/docusaurus-plugin-content-docs/version-1.0.x/`

## Mandatory Workflow

1. Read `DOCS_MAINTENANCE_GUIDE.md` before changing docs IA, slugs, redirects, versioning, localization structure, homepage theme behavior, or generated-index cards.
2. Inspect the related English and Chinese docs paths before editing.
3. Keep latest English as the structural reference.
4. Mirror structural and metadata changes into the Chinese latest docs unless there is an explicit reason not to.
5. If a slug, path, or route ownership changes, audit both redirect layers before finishing.
6. Run validation commands when the change touches docs output, routing, redirects, localization structure, or theme behavior.

## Hard Rules

- Do not create duplicate unpublished docs trees.
- Do not edit `.docusaurus/` or `build/` by hand.
- Do not infer production locale routing from `pnpm start`; that server only serves the default English locale.
- Use `pnpm start:zh` to test Simplified Chinese locally.
- Keep latest docs on naked `/docs/...` URLs.
- Keep legacy docs only under `/docs/1.0.x/...` and `/zh-Hans/docs/1.0.x/...`.
- Keep `Getting Started` as a child page under `Introduction`.
- Preserve `trailingSlash: false` assumptions when authoring internal links.
- Prefer relative links or canonical no-trailing-slash absolute links.

## Files To Check When Routing Changes

- `docusaurus.config.ts`
- `sidebars.ts`
- `versions.json`
- `versioned_sidebars/version-1.0.x-sidebars.json`
- `static/_redirects`
- `src/pages/docs.tsx`
- `src/pages/docs/introduction.tsx`
- `src/pages/docs/introduction/**/index.tsx`
- `src/theme/NotFound/Content/index.tsx`

## Files To Check When Docs UX Changes

- Category icon mapping: `src/theme/_components/docsCategoryIcons.tsx`
- Sidebar category rendering: `src/theme/DocSidebarItem/Category/index.tsx`
- Generated-index cards: `src/theme/DocCard/index.tsx`
- Legacy metadata notice: `src/theme/DocItem/Metadata/index.tsx`
- Homepage theme behavior: `src/pages/index.tsx`

## Commands

```bash
pnpm install
pnpm start
pnpm start:zh
pnpm build
pnpm build:test
pnpm typecheck
pnpm clear
pnpm generate:llms
```

## Required Validation

For docs, routing, redirects, localization structure, or homepage theme changes:

```bash
pnpm build
pnpm build:test
```

If the output looks stale:

```bash
pnpm clear
pnpm build
pnpm build:test
```

## Content Rules

- Default language for code and comments: English, ASCII only.
- Keep Chinese latest docs structurally aligned with English latest docs.
- Localize visible strings, but do not casually localize slugs, paths, or code-facing identifiers.
- Every latest doc that appears on a generated-index card should have an explicit one-sentence `description` frontmatter value.
- Keep those descriptions aligned between English and Chinese.
- Legacy docs are published docs, not scratch space. Keep them under `1.0.x` and preserve their warning model.

