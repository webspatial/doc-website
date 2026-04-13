---
sidebar_position: 1
---

# Add a Web App Manifest

## Create the Manifest file {#manifest-file}

First, create either `manifest.webmanifest` or `manifest.json` in your project.

:::tip
Both file types must be served as JSON by your web server. Any JSON MIME type is acceptable, such as `application/json`, the recommended type is `application/manifest+json`.
:::

Similar to static web files such as `robots.txt` and `favicon.ico` that are used without compilation or build process, the manifest file should be placed in a directory such as `public/`. Once the web server is running, these files should be directly accessible via URLs (e.g., `https://www.myapp.com/manifest.webmanifest`).

The manifest must contain at least the following properties:

```json5
{
  name: "My Awesome App",
  start_url: "/",
  display: "minimal-ui",
  icons: [
    {
      src: "/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-1024x1024.png",
      sizes: "1024x1024",
      type: "image/png",
      purpose: "maskable",
    },
  ],
}
```

:::info

The [Add Icon Files](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-icon-files) section lists the exact icon requirements and provides ready-to-use sample icons.

If you only need to build an app that installs and runs in the visionOS simulator, you may omit the manifest entirely or exclude any of the properties above. For missing properties, [WebSpatial Builder](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps) will fill in default placeholders automatically.

:::

## How manifest properties affect a WebSpatial app {#manifest-props}

### `start_url` {#start-url}

The entry point that loads when the app starts.

This property both sets the WebSpatial app's default [**Start Scene**](/docs/core-concepts/scenes-and-spatial-layouts#start-scene) and **determines how the app is packaged**:

- If [`start_url`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/start_url) is an full URL (including an http-prefixed domain) or is completed into a full URL via the [`--base`](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/options-of-the-webspatial-builder#base-for-devserver) option of the [WebSpatial Builder](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps), the [Packaged WebSpatial App](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) will **NOT** include website files (for example, the files Vite outputs to `dist/`). Instead, the [WebSpatial App Shell](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) will **load all pages and static files on demand from the web server** at runtime.
- If `start_url` is a relative path and you do NOT supply a domain through [`--base`](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/options-of-the-webspatial-builder#base-for-devserver), the [Packaged WebSpatial App](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) will bundle your entire website files (for example, everything in `dist/`). This produces a **fully offline** app that loads HTML and other static files directly from the package.

### `scope` {#scope}

(Optional) The [URL scope](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope) of the app. Defaults to all pages under the same path as `start_url`.

This property decides which URLs open inside the WebSpatial app (either navigating within the current [Scene](/docs/core-concepts/scenes-and-spatial-layouts) or opening a new one). URLs outside the scope open in the browser.

### `display` {#display}

Sets the [display](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display) mode, which controls which native features appear in each Scene's **native [Scene Menu](/docs/core-concepts/scenes-and-spatial-layouts#scene-menu)**.

- **`minimal-ui`** - Adds native navigation buttons such as the "Back" button. Your pages don't need to implement full navigation (similar to a traditional website).
- **`standalone`** - Removes native navigation buttons such as the "Back" button. Only basic features like "View URL" remain. Your pages must handle all navigation (similar to a native app).
- **`fullscreen`** - Comparable to a game running full-screen on mobile (no battery/time indicators).
- **`tabbed`** - Tabs are not supported in WebSpatial. This mode automatically falls back to `minimal-ui`.
- **`browser`** - Not supported by PWAs or WebSpatial apps.

### `icons` {#icons}

Icons used during installation. [WebSpatial Builder](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps) uses this setting to find icon files that meet spatial computing platform requirements.

At minimum, include:

- An icon with `"purpose": "any"` (required for all PWAs)
- A **maskable** icon at least **1024×1024** px with `"purpose": "maskable"` ([required by visionOS apps](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-icon-files))

:::info
Manifest properties not mentioned above are currently ignored by WebSpatial apps.
:::

## Link the Web App Manifest in HTML {#manifest-link}

Add a `<link rel="manifest" ...>` pointing to the manifest URL in the `<head>` of **every** HTML file.

:::info
Under the PWA spec, every page that belongs to this PWA site must reference the manifest via a `<link>` tag. Otherwise the page cannot be recognized as part of the PWA.

WebSpatial follows the same requirement - any page that should open inside the WebSpatial app (rather than in the browser) must include the manifest URL.
:::

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

:::tip

If your web project hides the HTML template and you can't edit `<head>` directly, it should offer a way to inject custom `<link>` tags.

For example, in **rsbuild** you can modify the built-in HTML template through `rsbuild.config.js`:

```js
 plugins: [pluginReact()],
 html: {
   tags: [
     {
       tag: "link",
       attrs: { rel: "manifest", href: "/manifest.webmanifest" },
     },
   ],
 },
```

:::

## Automatically add the manifest with tooling {#manifest-tool}

If you prefer not to create the manifest file and modify HTML by hand, many tools can generate a Web App Manifest and inject it into every HTML file for you.

Example: In a Vite project, use the [VitePWA](https://vite-pwa-org.netlify.app/) plugin.

:::info
The following example shows the minimal configuration, disabling the Service Worker features that VitePWA enables by default and adding only the manifest.
:::

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "My Awesome App",
        start_url: "/",
        scope: "/",
        display: "minimal-ui",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      injectRegister: false,
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
```
