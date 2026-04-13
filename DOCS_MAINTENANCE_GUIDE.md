# Docs Maintenance Guide

## Purpose

Use this guide when maintaining:

- latest docs
- localized latest docs
- legacy `1.0.x` docs
- redirects between latest and legacy docs
- doc links, slugs, and category metadata

Do not reintroduce duplicate unpublished docs source trees. The published source directories in this repository are the only docs source of truth.

## Current Docs Topology

Latest docs:

- English: `docs/`
- Simplified Chinese: `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`

Legacy docs:

- English: `versioned_docs/version-1.0.x/`
- Simplified Chinese: `i18n/zh-Hans/docusaurus-plugin-content-docs/version-1.0.x/`

Docs structure and routing config:

- top-level docs navigation: `sidebars.ts`
- latest category metadata: `docs/**/_category_.json`
- localized latest category metadata: `i18n/zh-Hans/docusaurus-plugin-content-docs/current/**/_category_.json`
- legacy version config: `docusaurus.config.ts`, `versions.json`, `versioned_sidebars/version-1.0.x-sidebars.json`
- legacy doc metadata override: `src/theme/DocItem/Metadata/index.tsx`
- docs root redirects: `src/pages/docs.tsx`, `src/pages/docs/introduction.tsx`
- legacy introduction fallback redirects: `src/pages/docs/introduction/**/index.tsx`
- legacy non-introduction fallback redirects: `src/theme/NotFound/Content/index.tsx`
- host-level redirects: `static/_redirects`

Generated files such as `.docusaurus/**` are useful for debugging but are not source of truth. Do not edit them by hand.

## Canonical Structure

The canonical latest docs structure is the current English published tree in `docs/`.

Current top-level latest sections:

1. `introduction/`
2. `concepts/`
3. `how-to/`
4. `api/`

Rules:

- Keep the latest Chinese docs structurally aligned with English unless there is an explicit product decision to diverge.
- Keep matching file paths between `docs/` and `i18n/zh-Hans/.../current/`.
- Keep matching `sidebar_position` values between locales.
- Keep matching `_category_.json` structural fields between locales.
- Only localize visible strings such as `label` and `description`. Do not casually change slugs or directory names.

## Current URL Model

Latest docs:

- English base: `/docs`
- Chinese base: `/zh-Hans/docs`

Legacy docs:

- English base: `/docs/1.0.x`
- Chinese base: `/zh-Hans/docs/1.0.x`

Current routing intent:

- latest owns naked docs URLs
- legacy is only under `1.0.x`
- if a route exists in both latest and legacy, latest wins
- if a naked route exists only in legacy, it redirects to the matching legacy `1.0.x` URL

This split must remain stable unless the whole docs versioning strategy is intentionally redesigned.

## Local Development and Locale Testing

Do not use local dev-server behavior as evidence that production routing is broken.

Current behavior:

- `pnpm start` serves only the default locale `en`
- visiting `/zh-Hans/...` on that English dev server returns the SPA shell and then client-side `Page Not Found`
- test Chinese locally with `pnpm start:zh` or `pnpm docusaurus start --locale zh-Hans`
- production `pnpm build` includes both locales in one static output

Cloudflare Pages note:

- for root-path deployment, use `pnpm build` with output directory `build`
- `pnpm build:test` is for subpath testing and should not be used for the normal root deployment

## Latest Entry Rules

`Getting Started` must remain a normal child page inside `Introduction`.

Current behavior:

- latest entry doc: `docs/introduction/getting-started.md`
- localized latest entry doc: `i18n/zh-Hans/docusaurus-plugin-content-docs/current/introduction/getting-started.md`
- `/docs` redirects to `/docs/introduction/getting-started`
- `/docs/introduction` redirects to `/docs/introduction/getting-started`
- `/zh-Hans/docs` redirects to `/zh-Hans/docs/introduction/getting-started`
- `/zh-Hans/docs/introduction` redirects to `/zh-Hans/docs/introduction/getting-started`

Do not:

- turn `Getting Started` into the category index
- consume `/docs` directly with the page slug
- remove the redirect entry model without updating both redirect layers

## Legacy Rules

Legacy docs are the published `1.0.x` version, not a separate docs tree.

Rules:

- maintain legacy English in `versioned_docs/version-1.0.x/`
- maintain legacy Chinese in `i18n/zh-Hans/docusaurus-plugin-content-docs/version-1.0.x/`
- keep legacy Chinese content body aligned with the English legacy source unless there is an explicit decision to translate old docs
- keep legacy reachable only under `/docs/1.0.x/...` and `/zh-Hans/docs/1.0.x/...`
- keep `banner: 'unmaintained'`
- do not set `noIndex` for legacy docs
- keep legacy internal links relative whenever possible so they stay inside `1.0.x`
- do not add absolute `/docs/...` links inside legacy doc bodies unless the intent is to jump to latest
- keep the warning admonition at the top of every legacy page:
  - English legacy links to `/docs/`
  - Chinese legacy also authors the link as `/docs/` so Docusaurus can localize it correctly
- keep the centralized legacy metadata notice in `src/theme/DocItem/Metadata/index.tsx` so search engines and AI-oriented crawlers can see that the page is outdated and should defer to the latest docs
- if you add or resync legacy files, reapply that admonition after the frontmatter

## Redirect Architecture

There are two redirect layers.

### 1. Host-level redirects

Defined in `static/_redirects`.

Current behavior:

- docs roots redirect to latest `Getting Started`
- legacy-only naked routes redirect to matching `1.0.x` URLs
- both slash and no-slash forms are covered for the explicit rules that exist

### 2. Client-side fallback redirects

Current behavior:

- `src/pages/docs.tsx` and `src/pages/docs/introduction.tsx` handle docs-root entry redirects
- `src/pages/docs/introduction/**/index.tsx` handles legacy introduction naked URLs that would otherwise collide with latest introduction routes
- `src/theme/NotFound/Content/index.tsx` catches legacy non-introduction naked URLs under:
  - `/docs/core-concepts`
  - `/docs/development-guide`
  - `/docs/quick-example`
  - and their `/zh-Hans/docs/...` equivalents

These two layers must stay aligned.

If you change legacy route coverage, update both:

- `static/_redirects`
- the fallback redirect implementation in `src/pages/docs/**` and/or `src/theme/NotFound/Content/index.tsx`

## Avoiding Latest vs Legacy URL Conflicts

This is one of the highest-risk maintenance areas.

Current situation:

- latest top-level sections are `introduction`, `concepts`, `how-to`, `api`
- old naked legacy namespaces are `core-concepts`, `development-guide`, `quick-example`, plus old `introduction/*` pages

Rules:

- do not add a new latest section or page tree under `/docs/core-concepts`, `/docs/development-guide`, or `/docs/quick-example` unless you intentionally redesign the legacy redirect strategy
- do not add latest pages under old naked introduction legacy paths without checking:
  - `static/_redirects`
  - `src/pages/docs/introduction/**/index.tsx`
- when changing legacy slugs, audit every matching redirect entry
- when changing latest slugs, audit whether any old naked legacy route now collides or stops colliding

In short: every docs IA change must be checked against legacy redirect ownership.

## Trailing Slash Rules

The site config uses `trailingSlash: false`.

Implications:

- canonical internal doc URLs should be treated as no-trailing-slash URLs
- do not rely on generic slash/no-slash compatibility for every page
- explicit redirects exist for some paths, but not for every possible docs URL variant

Authoring rules:

1. Prefer relative links between docs pages.
2. For absolute internal links, use canonical no-slash URLs such as:
   - `/docs/introduction/getting-started`
   - `/docs/api/react-sdk`
   - `/docs/1.0.x/core-concepts`
   - `/zh-Hans/docs/introduction/getting-started`
3. Do not hand-author internal absolute links with a trailing slash unless the redirect is explicitly intended and already covered.
4. Docs roots such as `/docs` and `/zh-Hans/docs` are special entry points; prefer the canonical target page in authored content instead of relying on those redirects.

Important note:

- Some generated category metadata may serialize URLs with a trailing slash for generated indexes.
- Do not treat those generated strings as authoring guidance.
- In docs content and redirect code, prefer the canonical no-slash form unless the implementation explicitly requires otherwise.

## Multilingual Maintenance Workflow

When updating latest docs:

1. Update English latest in `docs/`.
2. Mirror the same structure and metadata in Chinese latest under `i18n/zh-Hans/.../current/`.
3. Localize visible content, titles, labels, and descriptions as needed.
4. Keep structural parity:
   - same relative path
   - same category layout
   - same sidebar ordering
   - same redirect expectations

When updating legacy docs:

1. Update English legacy in `versioned_docs/version-1.0.x/` if the change truly belongs to legacy.
2. Mirror the same file-level change in Chinese legacy under `i18n/zh-Hans/docusaurus-plugin-content-docs/version-1.0.x/`.
3. Keep the Chinese legacy body aligned with the English legacy body unless legacy translation is intentionally introduced later.
4. Preserve or reapply the Chinese warning admonition, but author its latest-docs link as `/docs/` so locale-prefixed builds remain valid.
5. Recheck legacy redirect coverage if any slug or page path changes.

Do not:

- maintain a second unpublished raw docs tree
- make Chinese latest structurally different from English by accident
- localize slugs casually
- use one locale as a staging area that diverges from the published tree

## Localized Markdown and MDX Rules

These are easy to break during translation or regeneration.

Rules:

- use MDX-safe self-closing HTML such as `<br />`; do not use bare `<br>`
- do not assume Docusaurus exposes doc-title anchors automatically
- avoid hand-authored links that append title-style fragments such as `#spatial-scenes` unless the target heading has an explicit matching id
- when in doubt, link to the doc page root instead of a fragile title-anchor fragment

## Metadata Rules

Per-page metadata:

- keep `sidebar_position` aligned between locales
- add `title` or `sidebar_label` only when needed by Docusaurus behavior or UX
- keep frontmatter minimal and intentional

Category metadata:

- copy structural fields from the English counterpart
- localize visible strings only
- keep `position`, `collapsed`, `link.type`, and slug strategy aligned

Legacy titles:

- legacy docs rely on explicit `title` frontmatter for stable sidebar labels
- do not remove those titles unless you verify the sidebar still renders correctly

## AI-Facing Content

Legacy docs must stay out of AI-facing outputs such as `static/llms.txt`.

Current design relies on the latest docs tree as the source for that output. Preserve that behavior unless multilingual AI output is intentionally redesigned.

Legacy docs are still indexable by search engines. The machine-readable outdated notice for legacy pages is handled centrally in `src/theme/DocItem/Metadata/index.tsx`, not by per-file frontmatter duplication.

## Validation Checklist

After docs changes, validate the parts you touched.

Minimum checks:

1. `pnpm build`
2. `pnpm build:test`

If build artifacts look stale or corrupted, run:

```bash
pnpm clear
```

Then rebuild.

Behavior checks:

- `/docs` and `/zh-Hans/docs` redirect to localized `Getting Started`
- `Getting Started` remains a child page under `Introduction`
- latest docs resolve at naked docs URLs
- legacy docs resolve only under `1.0.x`
- old naked legacy-only URLs redirect to matching `1.0.x` URLs
- legacy pages show the unmaintained banner
- legacy pages are indexable and expose the outdated/latest-docs guidance in page metadata
- no new latest route conflicts with legacy redirect namespaces
- authored internal links do not rely on accidental trailing-slash behavior

## Short Version

If you need the shortest reliable workflow:

1. Edit the published docs trees directly.
2. Keep English latest as the structural reference.
3. Keep Chinese latest structurally aligned with English latest.
4. Treat legacy as `versioned_docs/version-1.0.x/`, not as a separate docs tree.
5. Audit redirects whenever a path or slug changes.
6. Prefer relative links or canonical no-slash internal URLs.
7. Validate build and routing behavior before finishing.
