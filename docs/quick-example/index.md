# Quick Example

Use a minimal example to get a quick feel for the actual results and development experience of the [WebSpatial SDK](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk), covering project setup, SDK installation and configuration, a sample development workflow, and a preview of spatial features.

:::warning

- This is NOT a development guide.
- To keep this example short and clear to quickly show real results, no explanations are given here.
- To make sure everything runs properly, please follow each step exactly - many of them are absolutely essential.
- This document includes detailed links, feel free to skip them for a quick example run.
- After you have completed the demo, you can dive into [the real development guide](/docs/development-guide/).

:::

:::tip

You can follow this doc to build the demo from scratch, or just grab the ready-made version from [the repo](https://github.com/webspatial/quick-example). You can also watch this video for a quick overview of everything in the doc:

<iframe
  style={{
    aspectRatio: "4/3",
    width: "100%",
    height: "auto"
  }}
  src="https://www.youtube.com/embed/UKx9EZtmtHU?si=kkfV71XSUwA-XW-_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

:::

## 1. Create a modern web project that supports WebSpatial {#create-project}

First confirm that Node.js is installed (see the [Node.js official website](https://nodejs.org/en/download)).

Using a standard React + Vite + TypeScript project as an example, run the following commands to create the project:

```bash npm2yarn
npx create-vite --template react-ts
```

:::tip
See [what kinds of web projects are considered WebSpatial-supported](/docs/development-guide/web-projects-that-support-webspatial) for details.
:::

In the project root, install the dependencies:

```bash npm2yarn
npm install
```

## 2. Install the WebSpatial SDK {#install-sdk}

```bash npm2yarn
npm install --save @webspatial/react-sdk @webspatial/core-sdk @google/model-viewer three
npm install --save-dev @webspatial/builder @webspatial/platform-visionos @webspatial/vite-plugin vite-plugin-html
```

:::tip
See [which dependencies are installed](/docs/development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk) for details.
:::

## 3. Integrate the WebSpatial SDK into the web build tool (Vite) {#web-build-tool}

First modify `tsconfig.app.json` and `tsconfig.node.json`, adding the configuration that [affects JSX compilation](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/configure-js-ts-compiler).

```json5
{
  "compilerOptions": {
    // diff-add
    "jsxImportSource": "@webspatial/react-sdk",
```

Then modify `vite.config.ts`:

- Add [WebSpatial's Vite plugin](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools).
- Inject the [environment variable `$XR_ENV`](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode) into HTML.

```jsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// diff-add
import webSpatial from "@webspatial/vite-plugin";
// diff-add
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // diff-add
    webSpatial(),
    // diff-add
    createHtmlPlugin({
      // diff-add
      inject: {
        // diff-add
        data: {
          // diff-add
          XR_ENV: process.env.XR_ENV,
          // diff-add
        },
        // diff-add
      },
      // diff-add
    }),
  ],
});
```

Run [the Dev Server for desktop/mobile and other non-XR platforms](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website#regular-dev-server) (keep it running in the following steps):

```bash npm2yarn
npm run dev
```

<Image img={require("/assets/quick_v2/1.jpg")} alt="Scene Example 1"  width="100%"  />

Open the URL shown in the terminal in a desktop browser such as Chrome to confirm everything works:

<Image img={require("/assets/quick_v2/2.png")} alt="Scene Example 2" />

Next, open a new terminal window (in the project root) and run another Dev Server to generate [web code specifically for WebSpatial](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website#dedicated-dev-server), used in the WebSpatial app on visionOS (keep it running in the following steps):

```bash npm2yarn
XR_ENV=avp npm run dev
```

<Image img={require("/assets/quick_v2/3.jpg")} alt="Scene Example 3" width="100%" />

## 4. Package and run the WebSpatial app {#package-and-run}

Before using [the packaging tool for WebSpatial](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps), install Xcode and the visionOS simulator:

:::tip
Prerequisite: a Mac computer

Steps:

1. Open the Mac App Store, search for "Xcode", and install it.
2. On first launch, agree to the license and enter the admin password to install additional components.
3. Click the top menu "Xcode" > "Settings…". In the "Components" tab, find visionOS and visionOS Simulator under "Platform Support", then install both.
   :::

Run the [development command (`run`)](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps#run) of the packaging tool:

```bash npm2yarn
npx webspatial-builder run --base=$XR_DEV_SERVER
```

:::warning
Replace `$XR_DEV_SERVER` with the URL generated by `XR_ENV=avp npm run dev` in the previous step.
For Example: The URL generated from Step 3 is:`http://localhost:5175/webspatial/avp`
You Should run: `npx webspatial-builder run --base=http://localhost:5175/webspatial/avp`
:::

The visionOS simulator will automatically launch, installs the [Packaged WebSpatial App](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk), and runs it:

<Image img={require("/assets/quick_v2/4.png")} alt="Scene Example 4" />
<Image img={require("/assets/quick_v2/5.png")} alt="Scene Example 5" />

## 5. Set initialization properties for the start scene {#start-scene}

Create a incomplete Web App Manifest file (this only works with the `webspatial-builder run` command, you'll need to [complete it before running on a real device or distributing it](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa)).

```bash
touch public/manifest.webmanifest
```

Set the [default size](/docs/core-concepts/scenes-and-spatial-layouts#spatial-layout) for the [start scene](/docs/core-concepts/scenes-and-spatial-layouts#start-scene) in [`xr_main_scene`](/docs/development-guide/using-the-webspatial-api/manage-multiple-scenes#start-scene).

```json5
{
  "xr_main_scene": {
    "default_size": {
      "width": 500,
      "height": 1000
    }
  }
}
```

Run the `run` command of the WebSpatial Builder again. The app's start scene now appears with a mobile app style:

:::note
A current bug may leave the start scene blank after repackaging. If this happens, delete the app in the simulator, quit the simulator, then package and run again.
If the issue persists, delete `node_modules` in the project and reinstall dependencies.
:::

<Image img={require("/assets/quick_v2/6.png")} alt="Scene Example 6" />

## 6. Add a new scene {#new-scene}

First add a new page. In this demo we use client-side routing.

Create `src/SecondPage.tsx`.

```jsx
import { useState } from "react";
import "./App.css";

function SecondPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Second Page</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default SecondPage;
```

Add the following to `src/App.tsx`.

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SecondPage from "./SecondPage";
```

Install a library that supports client-side routing.

```bash npm2yarn
npm install --save react-router-dom
```

Move all existing JSX in `src/App.tsx` into the designated position in the new JSX:

```jsx
  return (
    //diff-add
    <Router basename={__XR_ENV_BASE__}>
      //diff-add
      <Routes>
      //diff-add
        <Route path="/second-page" element={<SecondPage />} />
      //diff-add
        <Route
      //diff-add
          path="/"
      //diff-add
          element={
            /* Move all JSX from the App component in src/App.tsx into here */
      //diff-add
          }
      //diff-add
        />
      //diff-add
      </Routes>
      //diff-add
    </Router>
  );
```

:::tip
What is [`__XR_ENV_BASE__`](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website#use-dedicated-dev-server)?
:::

The new page `/second-page` has been added:

<Image img={require("/assets/quick_v2/7.png")} alt="Scene Example 7" />

At the end of the existing content in `src/App.tsx` (below `<p className="read-the-docs">`), add a card containing:

- A link that always opens `/second-page` in a new window.
- A button that opens `/second-page` in a window with [the specified `name`](/docs/development-guide/using-the-webspatial-api/manage-multiple-scenes#new-scene).

```jsx {4-19} showLineNumbers
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
              <div className="card" style={{ marginTop: "0px" }}>
                <h2>Open Second Page</h2>
                <p>
                  <Link to="/second-page" target="_blank">
                    Open Second Page with a Link
                  </Link>
                </p>
                <p>
                  <button
                    onClick={() => {
                      window.open(`${__XR_ENV_BASE__}/second-page`, "secondScene");
                    }}>
                    Open Second Page with a Button
                  </button>
                </p>
              </div>
```

Clicking the link or button opens a new [spatial-app scene](/docs/core-concepts/scenes-and-spatial-layouts) that displays the content of `/second-page`:

<video
  src="https://static.webspatial.dev/multi-scenes.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{ width: '100%', height: 'auto' }}
/>

## 7. Set initialization properties for the new scene {#init-scene}

Import the [scene initialization](/docs/core-concepts/scenes-and-spatial-layouts#scene-init) API from the WebSpatial SDK in `src/App.tsx`.

```jsx
import { initScene } from "@webspatial/react-sdk";
```

Before the scene named `"secondScene"` opens, initialize it:

```jsx {2-10} showLineNumbers
                    onClick={() => {
                      initScene("secondScene", prevConfig => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/second-page`, "secondScene");
```

Click the button and see that the [default size](/docs/core-concepts/scenes-and-spatial-layouts#spatial-layout) of the `secondScene` scene changes:

<Image img={require("/assets/quick_v2/9.png")} alt="Scene Example 9" />

## 8. Add material backgrounds {#material-background}

Edit the `index.html` file to [add a special classname to the `<html>` element](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode#css-solution) when this web code is executed as a WebSpatial app ([`XR_ENV` mode](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website)).

<!-- prettier-ignore-start -->
```html
//diff-add
<%- XR_ENV === 'avp' ? `
//diff-add
  <html lang="en" class="is-spatial">
//diff-add
  ` : `
    <html lang="en">
//diff-add
    ` %>
```
<!-- prettier-ignore-end -->

At the end of `src/index.css`, add code that sets the scene background in `XR_ENV` mode to a [fully transparent material](/docs/development-guide/using-the-webspatial-api/add-material-backgrounds) (using `--xr-background-material` from the WebSpatial API):

```css
html.is-spatial {
  background-color: transparent;
  --xr-background-material: transparent;
}
```

<div className="row">
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/10.png")} alt="" />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/11.png")} alt="" />
  </div>
</div>

:::tip
Although style changes take effect automatically via the Dev Server, but since the WebSpatial SDK doesn't yet support HMR for specific logic inside React components, you'll need to manually refresh the page (using the [scene menu](/docs/core-concepts/scenes-and-spatial-layouts#scene-menu)) or restart the devServer to apply those changes.
:::

Modify `src/App.tsx` to make both card elements ["spatialized HTML elements"](/docs/core-concepts/spatialized-elements-and-3d-container-elements) by adding [a specific mark](/docs/development-guide/using-the-webspatial-api/spatialize-html-elements), and give them different classnames. Spatialize the link inside `link-card` as well.

```jsx
              <h1>Vite + React</h1>
              //diff-remove
              <div className="card">
              //diff-add
              <div className="card count-card" enable-xr>
```

```jsx
              //diff-remove
              <div className="card">
              //diff-add
              <div className="card link-card" enable-xr>
                <h2>Open Second Page</h2>
                <p>
              //diff-remove
                  <a href="/second-page" target="_blank">
              //diff-add
                  <a href="/second-page" target="_blank" enable-xr>
                    Open Second Page with a Link
                  </a>
```

In the [styles for `XR_ENV` mode](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode#css-solution) in `src/index.css`, set [different translucent materials](/docs/development-guide/using-the-webspatial-api/add-material-backgrounds#translucent-options) for the backgrounds of the two card elements and the link.

```css
html.is-spatial {
  background-color: transparent;
  --xr-background-material: transparent;

  .count-card {
    --xr-background-material: thick;
    position: relative;
  }

  .link-card {
    --xr-background-material: translucent;
    border-radius: 20px;
    position: relative;
    top: 20px;

    a {
      display: block;
      --xr-background-material: thick;
      border-radius: 10px;
    }
  }
}
```

<div className="row">
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/12.png")} alt="" />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/13.png")} alt="" />
  </div>
</div>

## 9. Elevate spatialized elements {#elevation}

Mark the description text inside `count-card` as a [spatialized HTML element](/docs/core-concepts/spatialized-elements-and-3d-container-elements).

```jsx
//diff-remove
                <p>
//diff-add
                <p enable-xr>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
```

In the [styles for `XR_ENV` mode](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode#css-solution) in `src/index.css`, change this element to `position: relative` and use the WebSpatial's [Z-axis positioning API (`--xr-back`)](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements) to "elevate" it into 3D space in front of the web page plane. Also apply different levels of 'elevation' to the link elements spatialized earlier.

```css {5-12,19} showLineNumbers
  .count-card {
    --xr-background-material: thick;
    position: relative;

    p {
      --xr-background-material: transparent;
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
      --xr-back: 20;
    }
  }

  .link-card {
    --xr-background-material: translucent;
    border-radius: 20px;
    position: relative;
    --xr-back: 50;
    top: 20px;
```

<div className="row">
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/14.png")} alt="" />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/15.png")} alt="" />
  </div>
</div>

Another way to "elevate" is to [use CSS Transform](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements#css-transform), which can also [deform and rotate](/docs/introduction/make-the-web-spatial-too#transform) in 3D space.

In the [styles for `XR_ENV` mode](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode#css-solution) in `src/index.css`, move and rotate `link-card` along the Z axis (around the X axis):

```css
  .link-card {
    --xr-background-material: translucent;
    border-radius: 20px;
    position: relative;
    --xr-back: 50;
    top: 20px;
    //diff-add
    transform-origin: top left;
//diff-add
    transform: translateZ(30px) rotateX(30deg);
```

<div className="row">
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/16.png")} alt="" />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/quick_v2/17.png")} alt="" />
  </div>
</div>

## 10. Add static 3D content {#static-3d}

> To be added

## Final result {#final-result}

The full source code for this demo is in the repository:

https://github.com/webspatial/quick-example

You can either follow the steps in this article to build an identical demo project from scratch, or just clone the repo and run it using the README instructions.
