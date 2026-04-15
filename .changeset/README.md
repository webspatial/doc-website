# Changesets

This repository uses Changesets to version and publish `@webspatial/starter`.

For release-worthy starter changes:

1. Run `pnpm changeset` from the repository root.
2. Select `@webspatial/starter`.
3. Choose the appropriate bump type.
4. Write a short summary of the user-facing change.

The GitHub release workflow uses those changesets to open or update the starter release PR and publish to npm after the release PR is merged into `main`.
