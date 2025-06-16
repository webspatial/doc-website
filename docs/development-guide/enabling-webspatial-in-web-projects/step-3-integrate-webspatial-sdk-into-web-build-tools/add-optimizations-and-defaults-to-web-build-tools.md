---
sidebar_position: 2
---

# Add Optimizations and Defaults to Web Build Tools

In addition to [Configure the JS/TS Compiler](./configure-js-ts-compiler), a Web project that includes the [WebSpatial SDK](../../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk) needs several essential performance optimizations and default configuration values (convention over configuration). These optimizations and defaults need to be implemented through the project's web build tool and web server.

If your project uses tools like Next.js, Vite, or Rsbuild that bundle both the web build tool and web server - you just need to add the corresponding [WebSpatial plugin](../step-1-install-the-webspatial-sdk#non-core-deps-for-building) in their config. These ready-to-use plugins save you from manual setup and reduce boilerplate code.

<!-- If your project relies directly on a lower-level web build tool such as Webpack, you can follow the guidelines in this document to integrate these optimizations and defaults by hand. -->

:::info
What exactly is optimized and preconfigured is explained in ["Generate a WebSpatial-Specific Website"](./generate-a-webspatial-specific-website) and ["Check if Running in WebSpatial Mode"](./check-if-running-in-webspatial-mode).
:::

## React + Vite {#vite}

Add the [Vite plugin](../step-1-install-the-webspatial-sdk#plugin-vite) in `vite.config.ts` or `vite.config.js`:

```js title="vite.config.js"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// diff-add
import webSpatial from "@webspatial/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // diff-add
    webSpatial(),
    react({
```

If it's a TypeScript project, add `/// <reference types="@webspatial/vite-plugin" />` to `vite-env.d.ts`.

## React + Next.js {#next}

Add the [Next.js plugin](../step-1-install-the-webspatial-sdk#plugin-next) in `next.config.ts` or `next.config.js`:

```ts title="next.config.ts"
// diff-add
import withWebSpatial from '@webspatial/next-plugin';

const nextConfig: NextConfig =
// diff-add
  withWebSpatial()(
    {
      // other config
```

If it's a TypeScript project, create a `env.d.ts` file and add `/// <reference types="@webspatial/next-plugin" />`.

## React + Rsbuild {#rsbuild}

Add the [Rsbuild plugin](../step-1-install-the-webspatial-sdk#plugin-rsbuild) in `rsbuild.config.ts` or `rsbuild.config.mjs`:

```ts title="rsbuild.config.ts"
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// diff-add
import webSpatial from "@webspatial/rsbuild-plugin";

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "automatic",
        // diff-add
        importSource: "@webspatial/react-sdk",
      },
    }),
    // diff-add
    webSpatial(),
  ],
});
```

If it's a TypeScript project, add `/// <reference types="@webspatial/rsbuild-plugin" />` to `env.d.ts`.

## React + Rspack {#rspack}

Add the [Rspack plugin](../step-1-install-the-webspatial-sdk#plugin-rspack) in `rspack.config.ts` or `rspack.config.mjs`:

```js title="rspack.config.mjs"
import path, { dirname } from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
// diff-add
import WebSpatialPlugin from "@webspatial/rspack-plugin";
import { fileURLToPath } from "node:url";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    // diff-add
                    importSource: "@webspatial/react-sdk",
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    isDev ? new RefreshPlugin() : null,
    // diff-add
    new WebSpatialPlugin(),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
  devServer: {
    port: 3000,
  },
  output: {
    // publicPath: '/mybase',
  },
});
```

If it's a TypeScript project, add `/// <reference types="@webspatial/rspack-plugin" />` to `react-env.d.ts`.

## Configuration Without Plugins {#no-plugins}

:::warning
In testing. Documentation coming soon.
:::
