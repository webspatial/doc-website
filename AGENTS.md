# AGENTS.md

This file applies to all AI coding agents working in this repository.

## Project Summary

- This repo is the WebSpatial docs website built with Docusaurus 3.
- Latest English docs live in `docs/`.
- Latest Simplified Chinese docs live in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`.
- Legacy published docs live in `versioned_docs/version-1.0.x/`.
- Legacy Simplified Chinese docs live in `i18n/zh-Hans/docusaurus-plugin-content-docs/version-1.0.x/`.

## First Read

Read `DOCS_MAINTENANCE_GUIDE.md` before changing any of these areas:

- docs structure or slugs
- localized docs structure
- latest vs legacy routing
- redirects
- homepage theme behavior
- category metadata
- generated-index cards
- sidebar icons

That guide is the maintainer source of truth for this repo.

## Non-Negotiable Rules

- Do not create or maintain duplicate unpublished docs source trees.
- Edit the published docs trees directly.
- Treat `docs/` as the canonical structural reference for latest docs.
- Keep the latest Chinese docs structurally aligned with English unless there is an explicit product decision to diverge.
- Keep latest docs on naked `/docs/...` URLs.
- Keep legacy docs only under `/docs/1.0.x/...` and `/zh-Hans/docs/1.0.x/...`.
- Keep `docs/introduction/getting-started.md` as a normal child page inside `Introduction`.
- Do not casually change slugs, directory names, or locale keys.
- The site uses `trailingSlash: false`. Prefer relative links or canonical no-trailing-slash internal URLs.
- If a path, slug, or legacy redirect target changes, update both redirect layers:
  - `static/_redirects`
  - client-side redirect code in `src/pages/docs/**` and `src/theme/NotFound/Content/index.tsx`
- Do not edit generated output by hand:
  - `.docusaurus/`
  - `build/`

## Repo-Specific High-Risk Areas

### Homepage theme

- The homepage is intentionally forced into dark effective mode from `src/pages/index.tsx`.
- That dark mode must not overwrite the user's persisted site theme.
- Do not replace this model with one-off CSS patches for navbar, search, or Algolia.
- Do not show the color mode toggle on the homepage unless the homepage theme model is intentionally redesigned.

### Latest vs legacy routing

- Latest owns naked docs routes.
- Legacy only owns `1.0.x` routes.
- Old naked legacy-only URLs must redirect to matching `1.0.x` URLs.
- Before adding a new latest top-level section or changing slugs, check for collisions with old legacy namespaces such as:
  - `/docs/core-concepts`
  - `/docs/development-guide`
  - `/docs/quick-example`

### Sidebar icons and generated-index cards

- Shared category icon source of truth: `src/theme/_components/docsCategoryIcons.tsx`
- Do not make icon logic depend on localized labels.
- Keep icon mapping path-based.
- Generated-index cards should use shared icons.
- Every latest doc that appears as a generated-index link card must have an explicit one-sentence `description` in frontmatter.
- Keep those descriptions aligned and localized between English and Chinese latest docs.

## Key Files

- Site config: `docusaurus.config.ts`
- Latest sidebar: `sidebars.ts`
- Legacy sidebars: `versioned_sidebars/version-1.0.x-sidebars.json`
- Versions config: `versions.json`
- Host redirects: `static/_redirects`
- Docs root redirects: `src/pages/docs.tsx`, `src/pages/docs/introduction.tsx`
- Legacy introduction fallback redirects: `src/pages/docs/introduction/**/index.tsx`
- Legacy non-introduction fallback redirects: `src/theme/NotFound/Content/index.tsx`
- Legacy metadata override: `src/theme/DocItem/Metadata/index.tsx`

## Commands

- Install dependencies: `pnpm install`
- Start English dev server: `pnpm start`
- Start Chinese dev server: `pnpm start:zh`
- Build for normal root deployment: `pnpm build`
- Build for subpath testing: `pnpm build:test`
- Type check: `pnpm typecheck`
- Clear Docusaurus caches: `pnpm clear`
- Regenerate AI-facing docs outputs: `pnpm generate:llms`

## Validation

After docs, routing, redirect, localization, or homepage-theme changes, run:

```bash
pnpm build
pnpm build:test
```

If artifacts look stale:

```bash
pnpm clear
pnpm build
pnpm build:test
```

Also verify the behavior you touched, especially:

- `/docs` redirects to latest `Getting Started`
- `/zh-Hans/docs` redirects to localized `Getting Started`
- latest docs resolve on naked docs URLs
- legacy docs resolve only under `1.0.x`
- legacy pages still show the unmaintained banner
- generated-index cards show intentional summaries
- homepage still renders in dark mode without changing persisted site theme

## Authoring Notes

- Default language for code and comments: English, ASCII only.
- Localize visible strings, not file paths or slugs, unless the change is intentional and fully audited.
- When updating latest docs, mirror structural and metadata changes in Chinese latest docs.
- When updating legacy docs, mirror the file-level change in legacy Chinese docs when applicable.
- Prefer Docusaurus-native authoring patterns described in `DOCS_MAINTENANCE_GUIDE.md` for admonitions, code blocks, and metadata.

