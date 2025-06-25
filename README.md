# WebSpatial Website & Documentation

This repository contains the source for the [WebSpatial](https://webspatial.dev) website and its documentation at [webspatial.dev/docs](https://webspatial.dev/docs). The site is built with [Docusaurus](https://docusaurus.io/) and includes Markdown based documentation, example projects and custom React components that power the official WebSpatial docs.

## Requirements

- Node.js **18** or later
- [pnpm](https://pnpm.io/) package manager

## Getting started

Install dependencies and start a local development server:

```bash
pnpm install
pnpm start
```

Open <http://localhost:3000> in your browser to preview the site. File changes are hot reloaded.

To create a production build:

```bash
pnpm run build
```

The generated static site will appear in the `build/` directory.

To deploy to GitHub Pages or another static host, run:

```bash
pnpm run deploy
```

## Repository structure

- `docs/` – Markdown documentation
- `blog/` – Blog posts (optional)
- `src/` – React components, pages and styles used by the site
- `static/` – Static assets served as-is
- `scripts/` – Helper scripts (for example syncing docs from the WebSpatial SDK)
- `docusaurus.config.ts` – Site configuration

A `postinstall` hook automatically links a local copy of the WebSpatial SDK if it exists in a sibling directory. This allows the `sync-docs` script to import additional docs from the SDK repository.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the documentation or website.

