---
sidebar_position: 2
---

# Step 1: Install the WebSpatial SDK

## Core runtime dependencies {#core-deps-for-runtime}

```bash npm2yarn
npm install @webspatial/react-sdk @webspatial/core-sdk @google/model-viewer three
```

:::info
`@google/model-viewer` and `three` are dependencies used inside the SDK, but their package sizes are relatively large compared to the SDK itself. Plus, many web projects might already use them, and having multiple versions installed could cause conflicts. In the future, the SDK might remove direct dependencies on them. So, they're declared as peerDependencies for now, you'll need to install them explicitly in your web project.
:::

### `@webspatial/react-sdk` {#react-sdk}

The [SDK](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) offered by WebSpatial for React, which can be plugged into existing regular React projects to enable immediate use of the [WebSpatial API](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-api).

### `@webspatial/core-sdk` {#core-sdk}

Both the React SDK (and forthcoming SDKs for other Web frameworks) are implemented on top of the Core SDK. The Core SDK is a framework-agnostic, lower-level pure-JS API that relies internally on a non-standard JS Bridge API so that the [WebSpatial App Shell](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) can natively spatialize 2D HTML content and render 3D content.

## Core build-time dependencies {#core-deps-for-building}

```bash npm2yarn
npm install -D @webspatial/builder
```

### `@webspatial/builder` {#builder}

WebSpatial's packaging tool turns your website into a [Packaged WebSpatial App](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk). It's the must-have dev tool right now for developing, testing, and distributing WebSpatial apps on visionOS.

See ["Step 2: Add the WebSpatial App Build Tool"](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps) for how to use it.

### Optional core build-time dependencies {#optional-deps-for-building}

These optional dependencies let each Web project include only the platform support it actually needs, keeping builds lean.

#### `@webspatial/platform-visionos` {#visionos}

```bash npm2yarn
npm install -D  @webspatial/platform-visionos
```

Includes the [WebSpatial App Shell](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) needed to generate a visionOS app and provide spatial capabilities.

:::note
This package is currently required, as visionOS is the sole spatial computing platform supported by WebSpatial at this stage.
:::

<a id="visionos-simulator"></a>

:::note[Install Xcode and the visionOS Simulator]

To build and package a visionOS app and debug it in the visionOS simulator, you need to install the relevant global dependencies: Xcode and the visionOS Simulator.

Prerequisite: a Mac computer

Steps:

1. Open the Mac App Store, search for "Xcode", and install it.
2. On first launch, agree to the license and enter the admin password to install additional components.
3. Click the top menu "Xcode" > "Settings…". In the "Components" tab, find visionOS and visionOS Simulator under "Platform Support", then install both.

:::

## Non-core build-time dependencies {#non-core-deps-for-building}

These plugins integrate with popular third-party toolchains to simplify setup and apply [essential performance optimizations and sensible defaults](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools).

### `@webspatial/vite-plugin` {#plugin-vite}

If you use a React + Vite project:

```bash npm2yarn
npm install -D @webspatial/vite-plugin
```

WebSpatial's Vite plugin adds the required optimizations and defaults when your Web project uses Vite as its web build tool and web server.

### `@webspatial/next-plugin` {#plugin-next}

If you use a React + Next.js project:

```bash npm2yarn
npm install -D @webspatial/next-plugin
```

WebSpatial's Next.js plugin adds the required optimizations and defaults when your Web project is based on Next.js framework.

### `@webspatial/rsbuild-plugin` {#plugin-rsbuild}

If you use a React + Rsbuild project:

```bash npm2yarn
npm install -D @webspatial/rsbuild-plugin
```

WebSpatial's Rsbuild plugin adds the required optimizations and defaults when your Web project uses Rsbuild as its web build tool and web server.

### `@webspatial/rspack-plugin` {#plugin-rspack}

If you use a React + Rspack project:

```bash npm2yarn
npm install -D @webspatial/rspack-plugin
```

WebSpatial's Rspack plugin adds the required optimizations and defaults when your Web project uses Rspack as its web build tool and web server.
