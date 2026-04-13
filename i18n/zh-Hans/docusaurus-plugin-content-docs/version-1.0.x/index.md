---
sidebar_position: 0
title: WebSpatial Handbook (Legacy)
sidebar_label: WebSpatial Handbook (Legacy)
---

:::warning[旧版文档]
本文档属于旧版 `1.0.x` 文档，建议使用[新版文档](/docs/)。
:::
# WebSpatial Handbook (Legacy)

## Overview

It's recommended to read these docs in order, especially the first three chapters:

1. [**Introduction**](./introduction/index.md): Introduces the problems WebSpatial solves and the benefits it brings.
2. [**Quick Example**](./quick-example/index.md): Use a minimal example to get a quick feel for the actual results and development experience of the WebSpatial SDK.
3. [**Core Concepts**](./core-concepts/index.md): Learn the fundamental concepts of [Spatial Apps](./core-concepts/shared-space-and-spatial-apps.md) and the [WebSpatial SDK](./core-concepts/unique-concepts-in-webspatial.md).

The fourth chapter provides comprehensive and detailed [**Development Guide**](./development-guide/index.md). The guide consists of three parts, structured for both sequential reading and quick reference:

1. [What web projects can use WebSpatial API](./development-guide/web-projects-that-support-webspatial/index.md).
2. How to [add the WebSpatial SDK](./development-guide/enabling-webspatial-in-web-projects/index.md) to your web projects, [use WebSpatial Builder for visionOS testing](./development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/index.md) (simulator or device), and how to bring spatial features to your site while still [keeping it a standard, cross-platform website](./development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/index.md).
3. How to [use the WebSpatial API](./development-guide/using-the-webspatial-api/index.md) ([Spatialization](./development-guide/using-the-webspatial-api/spatialize-html-elements.md), [Material](./development-guide/using-the-webspatial-api/add-material-backgrounds.md), [Elevation](./development-guide/using-the-webspatial-api/elevate-2d-elements.md), [Scenes](./development-guide/using-the-webspatial-api/manage-multiple-scenes.md), [3D](./development-guide/using-the-webspatial-api/add-3d-content.md)) in web projects where the SDK is already integrated.

There are currently two sample projects:

1. One is the [Quick Example](./quick-example/index.md) itself, which you can build it from scratch, or just grab the ready-made version from [the repo](https://github.com/webspatial/quick-example). There's also a [video](https://youtu.be/ddBBDBq7nhs) showing the full setup process.
2. The other is the ["techshop" demo](https://github.com/webspatial/sample-techshop), showcases more realistic spatial UI design and also demonstrates [cross-platform functionality](./introduction/built-on-the-existing-web-ecosystem.md#example-techshop).

:::Important Notice

To develop on Apple Vision Pro, please ensure you are using the latest versions of visionOS and Xcode.

:::

## Feedback & Support

<!-- :::warning -->

The WebSpatial SDK is newly open-sourced and may have bugs or missing docs/examples. If you run into issues, don't spend too much time trying to fix them yourself, just share sample code with us on [Discord](https://discord.gg/nhFhSuhNF2) or [GitHub Issues](https://github.com/webspatial/webspatial-sdk/issues). That way, we can quickly assess the problem and offer a solution, suggestion, or hotfix.

<!-- ::: -->

## Table of Contents

<div className="blackLink">

1. [Introduction](./introduction/index.md)
   - [New Powers for XR Apps](./introduction/new-powers-for-xr-apps.md)
   - [The New Generation of Spatial Apps](./introduction/the-new-generation-of-spatial-apps.md)
   - [HTML/CSS and WebXR](./introduction/html-css-and-webxr.md)
   - [Make the Web Spatial Too](./introduction/make-the-web-spatial-too.md)
   - [Built on the Existing Web Ecosystem](./introduction/built-on-the-existing-web-ecosystem.md)
   - [If You Are a \_\_\_ Developer](./introduction/if-you-are-a-developer.md)
2. [Quick Example](./quick-example/index.md)
3. [Core Concepts](./core-concepts/index.md)
   - [Shared Space and Spatial Apps](./core-concepts/shared-space-and-spatial-apps.md)
   - [Unique Concepts in WebSpatial](./core-concepts/unique-concepts-in-webspatial.md)
   - [Scenes and Spatial Layouts](./core-concepts/scenes-and-spatial-layouts.md)
   - [Spatialized Elements and 3D Container Elements](./core-concepts/spatialized-elements-and-3d-container-elements.md)
   - [Full Space and AR Capabilities](./core-concepts/full-space-and-ar-capabilities.md)
4. [Development Guide](./development-guide/index.md)
   - [Web Projects That Support WebSpatial](./development-guide/web-projects-that-support-webspatial/index.md)
     - [Creating New Web Projects](./development-guide/web-projects-that-support-webspatial/creating-new-web-projects.md)
   - [Enabling WebSpatial in Web Projects](./development-guide/enabling-webspatial-in-web-projects/index.md)
     - [Prerequisite: Become a (Minimal) PWA](./development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/index.md)
       - [Add Icon Files](./development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-icon-files.md)
       - [Add Web App Manifest](./development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-web-app-manifest.md)
     - [Step 1: Install the WebSpatial SDK](./development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk.md)
     - [Step 2: Add Build Tool for Packaged WebSpatial Apps](./development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/index.md)
       - [Options of the WebSpatial Builder](./development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/options-of-the-webspatial-builder.md)
       - [(Optional) Simplify WebSpatial Builder Using dotenv](./development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/optional-simplify-webspatial-builder-using-dotenv.md)
     - [Step 3: Integrate WebSpatial SDK into Web Build Tools](./development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/index.md)
       - [Configure JS/TS Compiler](./development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/configure-js-ts-compiler.md)
       - [Add Optimizations and Defaults to Web Build Tools](./development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools.md)
       - [Generate a WebSpatial-Specific Website](./development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website.md)
       - [Check if Running in WebSpatial Mode](./development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode.md)
   - [Using the WebSpatial API](./development-guide/using-the-webspatial-api/index.md)
     - [Spatialize HTML Elements](./development-guide/using-the-webspatial-api/spatialize-html-elements.md)
     - [Add Material Backgrounds](./development-guide/using-the-webspatial-api/add-material-backgrounds.md)
     - [Elevate 2D Elements](./development-guide/using-the-webspatial-api/elevate-2d-elements.md)
     - [Manage Multiple Scenes](./development-guide/using-the-webspatial-api/manage-multiple-scenes.md)
     - [Add 3D Content](./development-guide/using-the-webspatial-api/add-3d-content.md)

</div>
