---
sidebar_position: 2
---

# Unique Concepts in WebSpatial

## WebSpatial App {#webspatial-app}

Mainstream Web content today is confined to flat pages. In the [Shared Space](/docs/core-concepts/shared-space-and-spatial-apps) it can only exist as a **pure 2D app** and [lacks spatial APIs and the ability to use 3D space](/docs/introduction/html-css-and-webxr#html-css).

Content built with the WebXR API can access 3D space, but because it handles XR interaction itself and relies on low-level graphics APIs (WebGL and later WebGPU) to render independently, the operating system cannot ["understand"](/docs/core-concepts/shared-space-and-spatial-apps#unified-rendering) it. For this reason, WebXR content currently cannot become a [**multitasking app** inside the Shared Space](/docs/core-concepts/shared-space-and-spatial-apps).

When a 2D webpage inside the Shared Space launches a WebXR session, that session takes over the entire space. It replaces the Shared Space, cannot coexist with other apps, and cannot even coexist with the webpage's own 2D window.

A **WebSpatial App** is a type of multitasking [Spatial App](/docs/core-concepts/shared-space-and-spatial-apps#spatial-apps) that works inside the Shared Space. It inherits all mainstream Web APIs (HTML, CSS, JS, and standard Web APIs) and adds the minimal set of new spatial APIs - the **[WebSpatial API](#webspatial-api)**. By combining these new and existing APIs, a WebSpatial App can describe mixed 2D-and-3D content in a way the operating system can understand and [render uniformly](/docs/core-concepts/shared-space-and-spatial-apps#unified-rendering) inside the Shared Space.

**Ideally**, a WebSpatial App should combine the strengths of Web and native apps: it can run on demand without installation via a URL, yet it [can also be installed, integrate tightly with the OS](https://web.dev/explore/progressive-web-apps), and be [distributed through app stores](https://www.pwabuilder.com/).

## WebSpatial API {#webspatial-api}

This set of new spatial APIs is called the **WebSpatial API**.

To stay connected with mainstream Web development and preserve existing content, the WebSpatial API isn't a brand-new, standalone API - it's **an extension of the existing 2D web APIs**.

For 2D content, the WebSpatial API does not introduce new UI elements. Instead, it lets existing HTML elements can be **[spatialized directly](/docs/core-concepts/spatialized-elements-and-3d-container-elements)**.

When positioning elements in 3D space, the API reuses the **existing CSS layout features on the X and Y axes** (absolute positioning, CSS transforms, and so on) and only [adds new CSS API when working with the Z axis](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements).

The WebSpatial API introduces [3D content container elements](/docs/core-concepts/spatialized-elements-and-3d-container-elements#3d-elements) that HTML never had. These containers behave like `<img>`, `<video>`, or `<canvas>`: they can be laid out with other 2D elements and are positioned in 3D space using the same spatial API.

Through `window.open`, `<a target="_blank">`, and other [existing new-window APIs](/docs/development-guide/using-the-webspatial-api/manage-multiple-scenes), the WebSpatial API manages an app's [scene containers](/docs/core-concepts/scenes-and-spatial-layouts).

## WebSpatial SDK {#webspatial-sdk}

There are two main hurdles to providing the [WebSpatial API](#webspatial-api) in browser engines: First, it takes a long time to get these APIs standardized through web standards communities and committees. Second, on platforms like visionOS, only the system's default WebView is available, leaving no room to customize the browser engine.

On the other hand, although HTML and CSS sit at the foundation of Web development, most web developers do not use them directly to build web apps. Instead, they use **UI or application frameworks** - today React is the most popular. Developers author HTML via JSX and React components and style via Tailwind CSS, PostCSS, or CSS-in-JS.

So, to quickly enable these APIs for real-world use and meet urgent needs on the web, the WebSpatial open-source project provides a **WebSpatial SDK tailored for Web frameworks** (such as React), without needing to modify browser engines. This allows web developers to start [using the WebSpatial API immediately within their UI framework's HTML (JSX) and CSS APIs](/docs/introduction/built-on-the-existing-web-ecosystem).

After a Web project is compiled by a build tool like Vite, the output is **Web code tailored for spatial-computing platforms**. A native Spatial App called the **WebSpatial App Shell** loads and runs that code in a **Web Runtime (like the system's default WebView)**. A **non-standard JS bridge API** injected into the WebView lets the Web code communicate with the App Shell. The Web Runtime still renders 2D content, while the App Shell uses native spatial capabilities to spatialize that 2D content and render 3D content.

This hybrid approach enables a **standards Web App (a [PWA](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa))** to gain spatial capabilities and user experience comparable to a native Spatial App **starting today**.

The **WebSpatial SDK** has two main parts.

- **Runtime layer** – Framework-specific SDKs such as the **[React SDK](/docs/development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk#react-sdk)** expose WebSpatial APIs at runtime. These framework SDKs are built on the lower-level **[Core SDK](/docs/development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk#core-sdk)**, a framework-agnostic JS library.

- **Build layer** – Because the WebSpatial SDK relies on an WebSpatial App Shell for spatial capabilities, the SDK provides **[WebSpatial Builder](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps)**. This tool packages a **Packaged WebSpatial App** for a specific spatial-comupting platform, such as a visionOS app bundle. The package includes the platform-specific WebSpatial App Shell that launches the Web Runtime (system WebView) to load and run the web build output. The resulting app can be installed on the platform-specific simulator or real device and submitted to the corresponding app store.

:::tip
WebSpatial Builder also supports [offline-packing the Web build output into the native app bundle](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-web-app-manifest#start-url). In that mode the WebSpatial App Shell loads the Web files locally and offline instead of from a web server. The app is not a website and loses cross-platform reach and URL sharing, but still benefits from the Web development ecosystem and tooling.
:::

If the upcoming **WebSpatial Browser** app (currently under development) has been pre-installed on the target platform, there is no need to package, install, or publish the app to app stores. Since the WebSpatial Browser already contains the WebSpatial App Shell, so you can open any WebSpatial App URL directly in it and experience it in spatial form.

<Image img={require("/assets/concepts/2-1.jpg")} alt="Scene Example 2" />
