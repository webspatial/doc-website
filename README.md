# WebSpatial Docs Website

This repository contains the source for the [WebSpatial](https://webspatial.dev) website and documentation site at [webspatial.dev/docs](https://webspatial.dev/docs). It is a Docusaurus 3 project with English and Simplified Chinese docs, a published legacy `1.0.x` docs version, custom theme components, and generated AI-facing docs outputs.

Before changing docs structure, routing, localized content layout, homepage theme behavior, or legacy version behavior, read [DOCS_MAINTENANCE_GUIDE.md](./DOCS_MAINTENANCE_GUIDE.md). That file is the maintainer source of truth.

## Requirements

- Node.js `>=20.0`
- `pnpm` `9.x`

## Quick Start

Install dependencies and start the default English dev server:

```bash
pnpm install
pnpm start
```

Open <http://localhost:3000>.

Important local-dev behavior:

- `pnpm start` serves only the default `en` locale.
- Use `pnpm start:zh` to test the Simplified Chinese site locally.
- Production builds include both locales.

## Common Commands

| Command | Purpose |
| --- | --- |
| `pnpm start` | Start the default English dev server |
| `pnpm start:zh` | Start the Simplified Chinese dev server |
| `pnpm start:test` | Start the site under `/doc-website/` for subpath testing |
| `pnpm start:test:zh` | Start the Chinese site under `/doc-website/` |
| `pnpm build` | Build the production site for root-path deployment |
| `pnpm build:test` | Build the site for subpath testing |
| `pnpm serve` | Serve the built output locally |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm clear` | Clear Docusaurus caches and generated artifacts |
| `pnpm generate:llms` | Regenerate `llms.txt` and `llms-full.txt` outputs |
| `pnpm fix-md-all` | Run Markdown image/link normalization helpers on `docs/` |
| `pnpm check-assets` | Run the asset checker helper |

## Docs Topology

Published docs source of truth:

- Latest English docs: `docs/`
- Latest Simplified Chinese docs: `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`
- Legacy English docs: `versioned_docs/version-1.0.x/`
- Legacy Simplified Chinese docs: `i18n/zh-Hans/docusaurus-plugin-content-docs/version-1.0.x/`

Current latest top-level sections:

1. `introduction/`
2. `concepts/`
3. `how-to/`
4. `api/`

Supporting config and routing files:

- Latest sidebar: `sidebars.ts`
- Legacy sidebar: `versioned_sidebars/version-1.0.x-sidebars.json`
- Version config and locale config: `docusaurus.config.ts`
- Host-level redirects: `static/_redirects`
- Docs-root and fallback redirects: `src/pages/docs.tsx`, `src/pages/docs/introduction.tsx`, `src/pages/docs/introduction/**/index.tsx`, `src/theme/NotFound/Content/index.tsx`

Generated output such as `.docusaurus/` and `build/` is useful for debugging, but it is not source of truth and should not be edited by hand.

## Maintenance Rules

Use the full guide for details. The short version:

- Edit the published docs trees directly. Do not create duplicate unpublished docs source trees.
- Treat English latest docs in `docs/` as the structural reference.
- Keep the Simplified Chinese latest docs structurally aligned with English:
  - same relative paths
  - same category layout
  - same sidebar ordering
  - same `sidebar_position` values
- Keep legacy docs under `1.0.x`. Latest owns naked `/docs/...` URLs.
- `Getting Started` must remain a normal child page under `Introduction`.
- Prefer relative links or canonical no-trailing-slash internal URLs.
- When changing slugs, paths, or redirect ownership, update both redirect layers:
  - `static/_redirects`
  - client-side fallback redirect code
- Do not treat local dev-server locale behavior as production routing truth.
- If you touch homepage theme behavior, read the guide first. The homepage dark-mode behavior is intentional and route-specific.

## Repository Layout

- `docs/` - latest English docs
- `i18n/zh-Hans/` - localized docs content and translations
- `versioned_docs/` - published legacy docs sources
- `versioned_sidebars/` - legacy sidebar config
- `src/` - pages, theme overrides, components, styles, and routing logic
- `static/` - static assets, headers, redirects, and generated AI-facing docs files
- `scripts/` - Markdown maintenance helpers
- `plugins/llms/` - LLMS output generation plugin
- `helper/` - auxiliary maintenance scripts

## Validation

After docs, routing, redirect, or localized-structure changes, run at minimum:

```bash
pnpm build
pnpm build:test
```

If artifacts look stale or corrupted:

```bash
pnpm clear
pnpm build
pnpm build:test
```

Recommended behavior checks after docs-IA or routing changes:

- `/docs` and `/zh-Hans/docs` redirect to localized `Getting Started`
- latest docs resolve at naked docs URLs
- legacy docs resolve only under `1.0.x`
- old legacy-only naked routes redirect to matching `1.0.x` URLs
- generated-index cards show intentional summaries instead of placeholder text

## Deployment Notes

- For normal Cloudflare Pages root deployment, use `pnpm build` and publish the `build/` directory.
- `pnpm build:test` is only for subpath testing and should not be used for the normal root deployment.
