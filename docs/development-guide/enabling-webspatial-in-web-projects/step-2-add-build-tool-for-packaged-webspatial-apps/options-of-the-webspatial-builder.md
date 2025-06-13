---
sidebar_position: 2
---

# Options for WebSpatial Builder

The command-line options for [WebSpatial Builder](../step-2-add-build-tool-for-packaged-webspatial-apps) fall into two categories, each recommended to be handled differently.

## Fixed options {#constant-options}

For every developer on the project, the following options should be configured identically and rarely change unless the project structure or configuration changes.

### `run` {#constant-options-for-run}

#### `--manifest`, `--manifest-url` {#manifest-for-run}

You can supply the local path to the [Web App Manifest file](../prerequisite-become-a-minimal-pwa/add-web-app-manifest) with `--manifest`, or provide the manifest's URL with `--manifest-url`.

- If neither option is set, the Builder reads the manifest from `public/manifest.webmanifest` or `public/manifest.json` by default.
- If no manifest is found at the default path, the `run` command silently falls back to an internal default manifest and default icons. The resulting build is suitable only for early simulator testing.
- If a manifest is provided but missing required fields, the `run` command silently fills the gaps with internal defaults. The resulting build is suitable only for early simulator testing.

:::tip

The default manifest information bundled with the Builder is as follows:

```json5
{
  name: "WebSpatialTest",
  display: "minimal-ui",
  start_url: "/",
  scope: "/",
}
```

:::

### `build` {#constant-options-for-build}

#### `--manifest`, `--manifest-url` {#manifest-for-build}

You can supply the local path to the [Web App Manifest file](../prerequisite-become-a-minimal-pwa/add-web-app-manifest) with `--manifest`, or provide the manifest's URL with `--manifest-url`.

- If neither option is set, the Builder reads the manifest from `public/manifest.webmanifest` or `public/manifest.json` by default.
- If no manifest is found at the default path, or the manifest is missing required fields, the Builder throws an error and aborts the build.

#### `--export` {#export}

The app package produced by the `build` command (for example, an IPA file) is written to the directory specified by `--export`.

- If omitted, the package is placed in the `build/` directory by default.

#### `--project` {#dist-for-build}

If you want to [bundle the site files for offline use](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url) into the app package, use this option to tell the Builder where the built web files are located.

- If omitted, the Builder pulls web files from the `dist/` directory by default.

### `publish` {#constant-options-for-publish}

#### `--manifest`, `--manifest-url` {#manifest-for-publish}

You can supply the local path to the [Web App Manifest file](../prerequisite-become-a-minimal-pwa/add-web-app-manifest) with `--manifest`, or provide the manifest's URL with `--manifest-url`.

- If neither option is set, the Builder reads the manifest from `public/manifest.webmanifest` or `public/manifest.json` by default.
- If no manifest is found at the default path, or the manifest is missing required fields, the Builder throws an error and aborts the build.

#### `--project` {#dist-for-publish}

If you want to [bundle the site files for offline use](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url) into the app package, use this option to tell the Builder where the built web files are located.

- If omitted, the Builder pulls web files from the `dist/` directory by default.

## Options best set via env vars {#inconsistent-options}

The following options either contain sensitive information (such as the password for an Apple developer account) or vary between developers (such as different Dev Server ports). They should therefore be supplied using environment variables rather than being committed to Git (see the [recommended npm scripts in the previous section](../step-2-add-build-tool-for-packaged-webspatial-apps#npm-scripts)).

:::tip
For best practice on environment variables, see ["(Optional) Simplify WebSpatial Builder with dotenv."](./optional-simplify-webspatial-builder-using-dotenv)
:::

### `run` {#inconsistent-options-for-run}

#### `$XR_DEV_SERVER` (`--base`) {#base-for-devserver}

Use `--base` to specify the root part of URL for all HTML requests loaded in the [WebSpatial App Shell](../../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk). If the [`start_url` in the Web App Manifest](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url) is already set to a full URL, the root part of the URL is forcibly replaced by the value provided here.

:::note[Examples]

- `"start_url": "/home"`
- `--base="http://mydomain.com/app/"`

Resulting URL: `http://mydomain.com/app/home`

- `"start_url": "http://otherdomain.com/home"`
- `--base="http://mydomain.com/app/"`

Resulting URL: `http://mydomain.com/app/home`

- `"start_url": "/home"`
- `--base="/app/"`

Resulting URL: `/app/home`

:::

:::tip[Best practice]

Set `$XR_DEV_SERVER` to point at a [Dev Server dedicated to the WebSpatial app](../step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website), such as `http://localhost:3000/webspatial/avp/`.

In this setup, site files (for example, the `dist` directory) are NOT [bundled for offline use](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url) into the Packaged WebSpatial App. After code changes you can rely on hot reload or simply refresh the page via the Dev Server, so there is no need to rerun `webspatial-builder run`, which greatly speeds up iteration.

:::

### `build` {#inconsistent-options-for-build}

#### `$XR_PRE_SERVER` (`--base`) {#base-for-preview}

Use `--base` to specify the root part of URL for all HTML requests loaded in the [WebSpatial App Shell](../../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk). If the [`start_url` in the Web App Manifest](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url) is already set to a full URL, the root part of the URL is forcibly replaced by the value provided here.

:::note[Examples]

- `"start_url": "/home"`
- `--base="http://mydomain.com/app/"`

Resulting URL: `http://mydomain.com/app/home`

- `"start_url": "http://otherdomain.com/home"`
- `--base="http://mydomain.com/app/"`

Resulting URL: `http://mydomain.com/app/home`

- `"start_url": "/home"`
- `--base="/app/"`

Resulting URL: `/app/home`

:::

:::tip

If `$XR_PRE_SERVER` points at [a Web Server dedicated to the WebSpatial app](../step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website), site files (for example, the `dist` directory) are NOT bundled for offline use into the Packaged WebSpatial App, so the web server must be reachable from the target device.

If you don't include a domain in either `$XR_PRE_SERVER` or `start_url`, the site files are [bundled for offline use](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url), so the app runs without fetching site files from a web server.

:::

### `build` or `publish` {#inconsistent-options-for-build-or-publish}

#### `$XR_BUNDLE_ID` (`--bundle-id`) {#bundle-id}

:::warning
Required during both real device testing (`build:avp`) and app distribution (`publish:avp`).
:::

Provide the App ID (Bundle ID) needed by App Store Connect via `--bundle-id`. You must [register a dedicated Bundle ID](https://developer.apple.com/help/account/identifiers/register-an-app-id/) in App Store Connect first.

#### `$XR_TEAM_ID` (`--teamId`) {#team-id}

:::warning
Required during both real device testing (`build:avp`) and app distribution (`publish:avp`).
:::

Provide your Apple Developer Team ID via `--teamId`.

### `publish` {#inconsistent-options-for-publish}

#### `$XR_PROD_SERVER` (`--base`) {#base-for-prod}

Use `--base` to specify the root part of URL for all HTML requests loaded in the [WebSpatial App Shell](../../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk). If the [`start_url` in the Web App Manifest](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url) is already set to a full URL, the root part of the URL is forcibly replaced by the value provided here.

:::note[Examples]

- `"start_url": "/home"`
- `--base="http://mydomain.com/app/"`

Resulting URL: `http://mydomain.com/app/home`

- `"start_url": "http://otherdomain.com/home"`
- `--base="http://mydomain.com/app/"`

Resulting URL: `http://mydomain.com/app/home`

- `"start_url": "/home"`
- `--base="/app/"`

Resulting URL: `/app/home`

:::

If `start_url` is an full URL with a production domain, and the web server [automatically serves WebSpatial-specific content when it detects the User Agent from the WebSpatial App Shell](../step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website#single-web-server), you do NOT need to set this variable during the production release (`publish:avp`), the production URL comes directly from `start_url`.

If `start_url` is a relative URL, or the WebSpatial-specific content lives under a different URL, you must use this variable during the production release (`publish:avp` to supply the production domain and other root parts of the production URL.

:::tip

If `$XR_PROD_SERVER` points at [a Web Server dedicated to the WebSpatial app](../step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website), site files (for example, the `dist` directory) are NOT bundled for offline use into the Packaged WebSpatial App, so the web server must be reachable from the target device.

If you don't include a domain in either `$XR_PROD_SERVER` or `start_url`, the site files are [bundled for offline use](../prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url), so the app runs without fetching site files from a web server.

:::

#### `$XR_VERSION` (`--version`) {#version}

:::warning
Required during app distribution (`publish:avp`).
:::

Provide the version number required by App Store Connect via `--version`, for example "x.x". It must be higher than the previously submitted version.

#### `$XR_DEV_NAME` (`--u`) {#username}

:::warning
Required during app distribution (`publish:avp`).
:::

Provide the Apple Developer account email via `--u`.

#### `$XR_DEV_PASSWORD` (`--p`) {#password}

:::warning
Required during app distribution (`publish:avp`).
:::

Provide the [app-specific password](https://support.apple.com/102654) for the Apple Developer account via `--p`.
