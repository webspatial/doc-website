---
sidebar_position: 3
---

# (Optional) Add pnpm

pnpm is a drop-in replacement for npm. It saves disk space by using hard links and symlinks, and it delivers faster install times.

## Add an `.npmrc` file {#npmrc}

Create an `.npmrc` file in the project root.

```ini
shamefully-hoist=true
strict-peer-dependencies=false
auto-install-peers=true
```

## Update `.gitignore` {#gitignore}

Add the appropriate pnpm-related entries to `.gitignore`.

```
.pnpm-store/
.pnpm-state.json
.pnpmfile.cjs
```

## Verify pnpm is installed globally {#install}

Make sure pnpm is installed globally on your system.

:::tip

You can install it with Corepack,

```bash
corepack enable pnpm
```

or directly with npm.

```bash
npm install -g pnpm
```

:::

## Generate `pnpm-lock.yaml` {#lock}

When you install dependencies with pnpm for the first time, it automatically creates `pnpm-lock.yaml`.

```bash
rm -rf node_modules
pnpm install
```

## (Optional) Add npm scripts {#npm-scripts}

You can add helper npm scripts in `package.json` to simplify common pnpm commands.

```json5
"install:clean": "rm -rf node_modules && pnpm install",
"install:update": "rm -rf node_modules pnpm-lock.yaml package-lock.json && pnpm install",
```
