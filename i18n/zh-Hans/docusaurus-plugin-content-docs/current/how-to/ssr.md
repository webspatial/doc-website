---
sidebar_position: 4
description: '在启用 SSR 的 React 项目中通过 SSRProvider 正确接入 WebSpatial。'
---

# 如何在启用 SSR 的项目中启用 WebSpatial {#how-to-enable-webspatial-in-ssr-enabled-projects}

开启了 SSR 的 React 项目，在[集成 WebSpatial SDK](../introduction/getting-started.md#set-up-your-project)时需要额外做一步：加入 SDK 提供的 `SSRProvider`。

:::info[为什么需要这个包装层]
`SSRProvider` 会为 SDK 提供 SSR 与 hydration 之间所需的额外上下文。
:::

## Generic React

```js title="client-entry.js" {2,6-8}
import { hydrateRoot } from "react-dom/client";
import { SSRProvider } from "@webspatial/react-sdk";

hydrateRoot(
  document.getElementById("root"),
  <SSRProvider>
    <App />
  </SSRProvider>,
);
```

## Hydrogen

```js title="entry.client.jsx" {5,13-15}
import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { NonceProvider } from "@shopify/hydrogen";
import { SSRProvider } from "@webspatial/react-sdk";

if (!window.location.origin.includes("webcache.googleusercontent.com")) {
  startTransition(() => {
    const existingNonce = document.querySelector("script[nonce]")?.nonce;

    hydrateRoot(
      document,
      <StrictMode>
        <NonceProvider value={existingNonce}>
          <SSRProvider>
            <HydratedRouter />
          </SSRProvider>
        </NonceProvider>
      </StrictMode>,
    );
  });
}
```
