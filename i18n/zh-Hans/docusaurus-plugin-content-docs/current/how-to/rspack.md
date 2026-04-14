---
sidebar_position: 3
description: '在基于 Rspack 或 Rsbuild 的项目中通过 swc-loader 配置 WebSpatial 的 JSX Runtime。'
---

# 如何在基于 Rspack 的项目中配置 JSX Runtime {#how-to-configure-the-jsx-runtime-in-rspack-based-projects}

基于 [Rspack](https://www.rspack.dev/)/[Rsbuild](https://rsbuild.rs/) 的 React 项目不能[通过 tsconfig 里的 `jsxImportSource` 配置 JSX Runtime](../introduction/getting-started.md#set-up-your-project)，而是要在 `swc-loader` 里完成配置。

:::tip[关键配置项]
真正决定 JSX 编译目标的是 `importSource: "@webspatial/react-sdk"`，它会把 JSX Runtime 指向 WebSpatial SDK。
:::

## Rsbuild

```js title="rsbuild.config.ts" {7-9}
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "automatic",
        importSource: "@webspatial/react-sdk",
      },
    }),
  ],
});
```

## Rspack

```js title="rspack.config.mjs" {10-11}
export default {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true },
              transform: {
                react: {
                  runtime: "automatic",
                  importSource: "@webspatial/react-sdk",
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
};
```
