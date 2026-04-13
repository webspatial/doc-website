# Prerequisite: Become a Minimal PWA

To give a WebSpatial app the capabilities and experience of a native [spatial app](/docs/core-concepts/shared-space-and-spatial-apps#spatial-apps) - like having its own [standalone window](/docs/core-concepts/scenes-and-spatial-layouts#scene-menu) instead of just running inside a browser - it needs to be more than just a bunch of webpages. **It has to become an actual "app" which means adding app-level info** like the app name, app icon, [which pages it includes](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-web-app-manifest#scope), and [what the start page is](/docs/core-concepts/scenes-and-spatial-layouts#start-scene).

> Traditional websites are a loose set of pages and do not include application-level metadata, containing only page-level info like the page title and favicon (page icon).

Some WebSpatial apps also need to be listed in app stores like native apps, reaching users on the platform the same way native apps do. That also requires adding app-level metadata.

:::warning
For today's [Hybrid-based](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) WebSpatial apps, listing in app stores is essential for user acquisition.
:::

While becoming an actual "app", the project must remain a **standard website** that can still run in regular browsers. This keeps [**key Web strengths**](https://developer.picoxr.com/document/web/introduce-power-of-web/): true cross-platform reach, shareable URLs, and on-demand usage without installation.

The **[PWA technology](https://web.dev/explore/progressive-web-apps)** defined in Web standards meets these requirements. It adds app-level info to a website and makes it installable. WebSpatial builds on many existing mainstream Web APIs, including the PWA standard.

Therefore, before introducing the WebSpatial API, make sure your site is already a valid PWA.

If your site is not yet a PWA, you only need to create the **simplest possible PWA** - as long as the site includes a valid [**Web App Manifest**](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-web-app-manifest), it can be installed as a PWA and meet WebSpatial's requirements.

:::info
If you only need to create an app for [**installation and execution in the visionOS simulator**](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps#run), you do not have to convert the site to a PWA first. [**WebSpatial Builder**](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps) will automatically supply placeholder values like the app name and icon.
However, to generate an installable app package, [**install it on a real Vision Pro device**](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps#build), or [**distribute via App Store Connect**](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps#publish) with a real name, icon, and other baseline app details, you must first turn the site into a PWA.
:::

import DocCardList from '@theme/DocCardList';

<DocCardList />
