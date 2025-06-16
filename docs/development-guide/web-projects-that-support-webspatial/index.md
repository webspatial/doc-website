# Web Projects That Support WebSpatial

WebSpatial currently uses a [Hybrid approach](../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk) that allows mainstream Web projects to immediately leverage the [WebSpatial API](../../core-concepts/unique-concepts-in-webspatial#webspatial-api) to gain spatial-computing capabilities on XR platforms. This does not affect how those projects run on existing desktop/mobile platforms or in regular browsers, thereby preserving their original cross-platform capabilities.

:::info

Besides the inherent cross-platform capabilities of standard websites, the new spatial features introduced by WebSpatial also work across different spatial-computing platforms. The following lists both currently supported and those planned for future support:

- ✅ visionOS devices (such as Vision Pro)
- ⏳ Android XR devices (no commercial hardware yet, planned)
- ⏳ Meta Quest / Horizon OS devices (APIs missing, planned)
- ⏳ PICO devices (planned)

:::

## Using Existing Web Projects {#existing-projects}

Any Web project that meets the following requirements can use the [WebSpatial API](../../core-concepts/unique-concepts-in-webspatial#webspatial-api) out of the box:

1. **The current UI is built with React and Web standards, running directly in mainstream browser engines.**

   - By simply [configuring `jsx-runtime`](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/configure-js-ts-compiler) - which does [NOT affect the site's appearance or performance on other platforms](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website) - you can call WebSpatial's HTML/CSS-based API inside React. This works with [PostCSS, Tailwind CSS, CSS-in-JS, and other CSS tooling](../using-the-webspatial-api/spatialize-html-elements#css).
   - Non-React projects can gain spatial capabilities via WebSpatial's [Core SDK](../enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk#core-sdk) (documentation coming soon).
   - We hope to work with the community to add support for more UI frameworks on top of the Core SDK in the future. Contributions are welcome!

2. **The current UI implementation generally follows [React's guidelines and best practices](https://react.dev/reference/rules).**

   - UI code is declarative, describing UI state rather than imperatively manipulating it, let React decide when to update state and when to render.
   - State changes rely on one-way data flow and immutable data (data always flows from parent to child and is not mutated by child components).
   - Side effects are avoided inside React components or are controlled with React APIs to prevent them from running during rendering.
   - If parts of the project bypass React and manipulate the DOM directly, avoid using the React-based WebSpatial API on those parts to prevent conflicts.

3. **The final web code is built using one of the following mainstream Web build tools.**

   - Vite (It's recommended to use the WebSpatial's [Vite plugin](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#vite))
   - Next.js (It's recommended to use the WebSpatial's [Next.js plugin](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#next))
   - Rsbuild (It's recommended to use the WebSpatial's [Rsbuild plugin](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#rsbuild))
   - Rspack (It's recommended to use the WebSpatial's [Rspack plugin](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools#rspack))
   - Webpack (Docs to be added)

4. **The project's web server (including any third-party web services) can control HTML output and static Web assets.**
   - This server can serve [special HTML tailored for WebSpatial](../enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website) for every URL on your site. That HTML loads static web files specifically for the [WebSpatial App Shell](../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk), like JS files that include the WebSpatial SDK.

If you want to add the WebSpatial API to an existing Web project, you can skip the rest of this chapter and jump to the next main chapter: [Enabling WebSpatial in Web Projects](../enabling-webspatial-in-web-projects/)

## Creating a New WebSpatial Project {#new-projects}

If you prefer to start a brand-new web project with WebSpatial support from day one, or build a fresh demo to experiment with the WebSpatial API and experience WebSpatial apps, you can follow the rest of this chapter to generate a standard Web site project that has not yet integrated WebSpatial, as your starting point.

import DocCardList from '@theme/DocCardList';

<DocCardList />
