---
sidebar_position: 1
---

# Configure the JS/TS Compiler

To use the [WebSpatial API](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-api) inside a UI framework such as React, you need to integrate WebSpatial's framework SDK (currently only the [React SDK](/docs/development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk#react-sdk)) into the JS/TS compiler used by your Web project. This allows the SDK to affect JSX transforms and other stages that involve the HTML/CSS APIs.

:::info
In builds targeting desktop/mobile platforms and regular browsers, [the SDK is inactive](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website) - it adds no extra code and makes no changes to behavior or performance.
:::

## TypeScript

In a React + TypeScript project, you typically integrate WebSpatial's React SDK in `tsconfig.json`.

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // diff-add
    "jsxImportSource": "@webspatial/react-sdk",
```

:::tip
If `tsconfig.json` is split into a client-side `tsconfig.app.json` and a Node.js-side `tsconfig.node.json`, add this configuration to both files.
:::

Some toolchains add an abstraction layer on top of `tsconfig`, so in these cases, you must use the toolchain's own configuration to modify `tsconfig`.

For example, if your Vite project is using SWC, you'll need to add the `jsxImportSource` via the SWC plugin config.

```js title="vite.config.js"
import { defineConfig } from "vite";
// diff-add
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react({
      // diff-add
      jsxImportSource: "@webspatial/react-sdk",
    }),
  ],
});
```

Example [using Rsbuild](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#rsbuild):

```ts title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'automatic',
        // diff-add
        importSource: '@webspatial/react-sdk',
      },
    }),
```

Example [using Rspack](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#rspack):

```js title="rspack.config.mjs"
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    // diff-add
                    importSource: '@webspatial/react-sdk',
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
```

## JavaScript

In a React + JavaScript project, the JS compiler is usually embedded inside the Web build tool, so you need to integrate WebSpatial's React SDK through the build tool's configuration file.

Example [using Vite](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#vite):

```js title="vite.config.js"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // diff-add
      jsxImportSource: "@webspatial/react-sdk",
    }),
  ],
});
```
