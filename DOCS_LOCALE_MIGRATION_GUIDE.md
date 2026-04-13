# Docs Locale Migration Guide

## Purpose

This guide explains how this repository works and how to turn the raw Markdown files in `new-docs/<locale>/` into the site-ready documentation format used by the current English site.

It is written for future agents and maintainers. Use it when the site later gains full Docusaurus i18n support and a new locale in `new-docs/` needs to be published while staying structurally identical to the English docs.

This guide intentionally describes the direct path from source state to final state. It does not include intermediate experiments.

## Project Overview

This repository is the source for the public [WebSpatial](https://webspatial.dev/) website.

Current scope:

- Landing page plus developer docs
- Docusaurus based site
- No public blog, showcase, or other docs modules are part of the active product surface
- English is the only fully published locale today

Current documentation model:

- Latest docs live in `docs/`
- Legacy docs are published as Docusaurus version `1.0.x`
- Legacy docs are stored in `versioned_docs/version-1.0.x/`
- Legacy version sidebar data is stored in `versioned_sidebars/version-1.0.x-sidebars.json`
- Top-level docs navigation is controlled by `sidebars.ts`
- Some route behavior is implemented with fallback pages in `src/pages/docs*`
- Host-level permanent redirects are defined in `static/_redirects`
- AI-facing docs output is generated into `static/llms.txt` by `docusaurus-plugin-generate-llms-txt`

## Terms Used In This Guide

- `<locale>`: the locale being migrated, such as `en` or `cn`
- `<sourceLocaleDir>`: raw source docs in `new-docs/<locale>/`
- `<currentDocsTarget>`: the published "current" docs directory for that locale
- `<legacyDocsTarget>`: the published legacy docs directory for that locale, if localized legacy docs exist
- `<docsBase>`: the docs URL base for that locale

English today uses:

- `<sourceLocaleDir>` = `new-docs/en/`
- `<currentDocsTarget>` = `docs/`
- `<legacyDocsTarget>` = `versioned_docs/version-1.0.x/`
- `<docsBase>` = `/docs`

When i18n is added later, the locale-specific target paths may change, but the rules in this guide should stay the same.

## The English Site Is The Canonical Output

Do not treat `new-docs/en/` as the canonical published format.

The canonical published format is the current English site implementation:

- published docs content in `docs/`
- sidebar and category metadata in `sidebars.ts` and `docs/**/_category_.json`
- route helpers in `src/pages/docs*`
- versioning and SEO rules in `docusaurus.config.ts`, `versions.json`, `versioned_docs/`, and `static/_redirects`

For any future locale, the safest workflow is:

1. Treat the current English published docs as the structure and metadata source of truth.
2. Treat `new-docs/<locale>/` as the body-content source of truth.
3. Rebuild the locale so its structure, slugs, ordering, redirects, version behavior, and SEO behavior match English.

In short: copy the English metadata and routing model first, then replace the document body with the localized raw Markdown.

## Final State To Match

Any locale that is meant to match the English docs should end up with these behaviors:

- The latest docs use the same information architecture as English.
- The latest docs preserve the same slugs and relative URL structure as English unless a locale-specific slug strategy is explicitly introduced.
- The docs root redirects to the locale's "Getting Started" page.
- The Introduction category remains a category, and "Getting Started" remains a child page inside it.
- Legacy docs are not visible by default and are only reachable by manually switching the docs version.
- Legacy docs show a warning banner at the top telling the user the docs are old and recommending the latest version.
- Legacy docs are not indexed by search engines.
- URLs that exist in both latest and legacy resolve to latest.
- Old naked URLs that exist only in legacy redirect to the locale docs home.
- Legacy docs are not included in AI-facing docs content such as `llms.txt`.

## Current English Latest Docs Shape

The latest English docs are not a verbatim copy of `new-docs/en/`. They are a Docusaurus-adapted version of it.

Current top-level latest docs sections:

- `introduction/`
- `concepts/`
- `how-to/`
- `api/`

Current top-level sidebar order:

1. `Introduction`
2. `Concepts`
3. `How-to`
4. `API`

Current top-level sidebar behavior:

- `How-to` is collapsed by default
- other top-level categories are expanded by default

Current `API` order:

1. `React SDK`
2. `Builder`

Current `Introduction` behavior:

- `Getting Started` is the actual page
- it stays at `introduction/getting-started.md`
- it is a child page under the `Introduction` category
- `<docsBase>` redirects to `<docsBase>/introduction/getting-started`
- `<docsBase>/introduction` also redirects to `<docsBase>/introduction/getting-started`

Important consequence:

Do not make `Getting Started` the category page itself, and do not give it a special slug that consumes the docs root directly. The docs root must redirect to the page instead.

## How To Migrate A Raw Locale

### 1. Start From The English Published Tree, Not From Scratch

Use the current English latest docs tree as the template:

- `docs/introduction/getting-started.md`
- `docs/concepts/**/*`
- `docs/how-to/**/*`
- `docs/api/**/*`
- `docs/**/_category_.json`

For each English latest doc page:

1. Find the corresponding raw localized source under `new-docs/<locale>/` using the same relative path.
2. Keep the English published file's metadata and routing behavior.
3. Replace only the body content with the localized raw Markdown content.

If the localized raw source is missing a page that exists in English latest:

- do not silently drop the page
- do not invent a different structure
- resolve the content gap first

If the localized raw source contains a page that English latest does not publish:

- do not invent routing and ordering independently in that locale
- first decide whether English latest should also expose that page

The locale must follow the English published structure, not the other way around.

### 2. Remove Raw Source Artifacts

Before publishing a locale, remove non-content files from the raw source tree, especially:

- `.DS_Store`
- other editor or OS artifacts

Do not expose `new-docs/<locale>/` directly to Docusaurus.

### 3. Add The Minimal Per-Page Frontmatter Required By Docusaurus

The raw source docs are plain Markdown. The published site requires metadata.

For each page, copy the frontmatter shape from the English published counterpart. In the current English site, the most common requirement is:

```md
---
sidebar_position: 1
---
```

Rules:

- Preserve `sidebar_position` from the English published counterpart.
- Preserve any future frontmatter fields that English latest may add later.
- Keep page titles as Markdown headings unless English published docs already moved that information into frontmatter.
- Prefer the smallest metadata change set that makes Docusaurus render correctly.

The current English migration intentionally keeps the authoring style close to plain Markdown. It does not fully rewrite the docs into advanced Docusaurus-only patterns.

### 4. Add Directory Metadata With `_category_.json`

Every published directory that needs a label, generated index, or order must have `_category_.json`.

Example:

```json
{
  "label": "CSS API",
  "position": 2,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "slug": "/api/react-sdk/css-api",
    "description": "CSS properties for spatial layout, depth, transforms, and material surfaces."
  }
}
```

Rules:

- Copy the English published `_category_.json` file for the matching directory.
- Keep the same `position`, `collapsed`, and `link.type`.
- Keep the same slugs unless the project later adopts a locale-specific slug policy.
- If labels and descriptions are meant to be localized, localize only those visible strings. Do not change structural fields.

Current English directories that use `_category_.json` include:

- `docs/introduction/`
- `docs/concepts/`
- `docs/how-to/`
- `docs/api/`
- `docs/api/react-sdk/`
- all React SDK subdirectories such as `css-api/`, `dom-api/`, `event-api/`, `js-api/`, `manifest-options/`, `react-components/`, and `scene-options/`
- `docs/api/builder/`

### 5. Preserve English Navigation Rules Exactly

Top-level docs navigation comes from `sidebars.ts`.

Nested ordering mostly comes from:

- directory `_category_.json`
- page `sidebar_position`
- autogenerated directory traversal

This means locale syncing should not invent a second navigation model. Instead:

- keep `sidebars.ts` aligned with English
- keep all localized docs using the same directory names or their agreed i18n equivalents
- keep the same `sidebar_position` values as English
- keep the same category metadata as English

If English navigation changes later, update English first, then mirror that change in the locale.

### 6. Keep Links Docusaurus-Safe

The raw docs must be checked for Docusaurus rendering problems.

Rules:

- Prefer relative links between docs pages.
- Fix any broken anchors or broken internal links until `pnpm build` passes.
- Keep URLs compatible with Docusaurus Markdown processing.
- Do not leave links that point at removed pages.

For latest docs, relative links such as `../concepts/spatial-computing.md` are acceptable and already used by the English published docs.

### 7. Preserve The Getting Started Entry Routing Model

For any locale that mirrors English latest:

- publish `introduction/getting-started.md` as a normal child doc
- do not map that file directly to `<docsBase>`
- keep `Introduction` as a category
- redirect `<docsBase>` to `<docsBase>/introduction/getting-started`
- redirect `<docsBase>/introduction` to `<docsBase>/introduction/getting-started`

The current English implementation uses:

- `src/pages/docs.tsx`
- `src/pages/docs/introduction.tsx`

The redirect implementation is intentionally invisible to users:

- JavaScript `window.location.replace(...)`
- `meta refresh`
- `robots: noindex,follow`
- no visible page content

If a future locale uses a locale-prefixed docs base, create the equivalent redirect pages for that locale's docs base.

## Shared Legacy Version Rules

These rules define how the old docs coexist with latest docs.

### Latest And Legacy Split

Current English rules:

- latest docs live at naked docs URLs such as `/docs/...`
- legacy docs live under `/docs/1.0.x/...`

This guarantees:

- latest wins whenever a route exists in both versions
- legacy only appears when the user explicitly switches to version `1.0.x`

### Docusaurus Versioning Configuration

Current version settings live in:

- `docusaurus.config.ts`
- `versions.json`

Important current behavior:

- latest is the `current` docs set
- legacy is labeled `1.0.x`
- legacy uses `banner: 'unmaintained'`
- legacy uses `noIndex: true`
- navbar shows a manual docs version dropdown

If a future locale also ships localized legacy docs, preserve the same version rules for that locale.

### Legacy Banner

The old-doc warning banner is provided by the default Docusaurus unmaintained-version banner.

Current behavior on legacy pages:

- top banner says the page is from `1.0.x`
- banner recommends the latest version

Do not remove or bypass this banner on localized legacy docs.

### Legacy SEO Rules

Legacy docs must not be indexed.

Current English implementation relies on Docusaurus version config, which produces:

- `meta name="robots" content="noindex, nofollow"`

Preserve the same behavior for any localized legacy docs.

### Legacy Internal Links Must Stay Inside Legacy

If localized legacy docs are created, do not keep absolute links like `/docs/...` inside the legacy doc bodies.

Why:

- absolute naked docs links jump back to latest
- that breaks version consistency inside the old docs set

Instead:

- convert legacy internal links to relative links
- make them resolve to the corresponding legacy page under `1.0.x`

## Redirect Rules For Old Naked URLs

Some old English URLs existed in legacy docs but do not exist in latest docs.

Required behavior:

- if a naked route exists in both latest and legacy, latest owns it
- if a naked route exists only in legacy, redirect it to the latest docs home

Current English implementation uses two layers:

1. Host-level permanent redirects in `static/_redirects`
2. Fallback no-content redirect pages in `src/pages/docs/**/index.tsx`

The fallback pages exist so that:

- the redirect is still effectively invisible if the host does not honor `_redirects`
- the fallback page is marked `noindex,follow`

Current English fallback pages redirect old-only naked URLs to `/docs/`.

For any locale with localized legacy docs, repeat the same logic relative to that locale's docs base.

Recommended method:

1. Build the normalized route list for latest docs.
2. Build the normalized route list for legacy docs.
3. Compute `legacyOnlyRoutes = legacyRoutes - latestRoutes`.
4. For every route in `legacyOnlyRoutes`, add:
   - a permanent redirect rule in `static/_redirects`
   - a no-UI fallback page in `src/pages/...`

Do not create redirect helpers for routes that still exist in latest.

## AI-Facing Content Rules

Current requirement:

- legacy docs must not be included in AI-facing content such as `llms.txt`

Current English implementation satisfies this because the `docusaurus-plugin-generate-llms-txt` plugin generates content from the latest `docs/` tree and does not include `versioned_docs/`.

Important note for future locale work:

- do not assume localized current docs will automatically appear in `llms.txt`
- if multilingual AI-facing content becomes a product requirement, audit or extend the llms generation plugin explicitly

For now, the key rule is simpler:

- do not let legacy docs enter AI-facing outputs

## What Not To Change During A Locale Sync

Unless the locale rollout explicitly requires it, do not change:

- landing page content
- blog behavior
- public site structure outside docs
- versioning policy
- redirect policy
- AI exclusion policy for legacy docs

Locale syncing should primarily affect:

- locale doc bodies
- locale doc metadata files
- locale doc redirects if the locale gets its own docs base
- locale-specific translation files once Docusaurus i18n is fully enabled

## Validation Checklist

After finishing the locale migration, run:

```bash
pnpm build
pnpm build:test
```

The build must pass with no broken links and no broken anchors.

Then verify these outcomes:

- The docs root redirects to the locale's `introduction/getting-started` page.
- The Introduction category still shows `Getting Started` as a child page.
- Top-level sidebar order matches English.
- Nested ordering matches English.
- `How-to` is collapsed by default and the other top-level categories are expanded by default.
- Latest docs appear at naked docs URLs.
- Legacy docs appear only under `1.0.x`.
- Legacy pages show the old-version banner.
- Legacy pages carry `noindex` robots metadata.
- Naked legacy-only URLs redirect to the locale docs home.
- `llms.txt` does not contain legacy docs content.

Useful English references for spot checks:

- current entry doc: `docs/introduction/getting-started.md`
- current top-level sidebar rules: `sidebars.ts`
- current version config: `docusaurus.config.ts`
- current versions list: `versions.json`
- current docs-root redirects: `src/pages/docs.tsx`, `src/pages/docs/introduction.tsx`
- current old-only redirect pages: `src/pages/docs/**/index.tsx`
- current host redirect rules: `static/_redirects`
- current legacy docs: `versioned_docs/version-1.0.x/`

## Recommended Short Workflow

If you need the shortest reliable process for a new locale, do this:

1. Copy the English published docs structure and metadata.
2. Replace each page body with the matching raw localized Markdown from `new-docs/<locale>/`.
3. Keep `_category_.json`, `sidebar_position`, slugs, ordering, redirects, and version rules aligned with English.
4. Fix any Docusaurus-incompatible links or anchors.
5. Preserve the legacy-version SEO and redirect rules.
6. Run both build commands and verify the final routing behavior.

If there is any ambiguity, prefer matching the current English published site over matching the raw source layout in `new-docs/<locale>/`.
