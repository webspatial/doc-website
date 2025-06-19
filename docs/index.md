---
sidebar_position: 0
---

# WebSpatial Handbook

## Overview

It's recommended to read these docs in order, especially the first three chapters:

1. [**Introduction**](/docs/introduction): Introduces the problems WebSpatial solves and the benefits it brings.
2. [**Quick Example**](/docs/quick-example): Use a minimal example to get a quick feel for the actual results and development experience of the WebSpatial SDK.
3. [**Core Concepts**](/docs/core-concepts): Learn the fundamental concepts of [Spatial Apps](/docs/core-concepts/shared-space-and-spatial-apps) and the [WebSpatial SDK](/docs/core-concepts/unique-concepts-in-webspatial).

The fourth chapter provides comprehensive and detailed [**Development Guide**](/docs/development-guide). The guide consists of three parts, structured for both sequential reading and quick reference:

1. [What web projects can use WebSpatial API](/docs/development-guide/web-projects-that-support-webspatial).
2. How to [add the WebSpatial SDK](/docs/development-guide/enabling-webspatial-in-web-projects) to your web projects, [use WebSpatial Builder for visionOS testing](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps) (simulator or device), and how to bring spatial features to your site while still [keeping it a standard, cross-platform website](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools).
3. How to [use the WebSpatial API](/docs/development-guide/using-the-webspatial-api) ([Spatialization](/docs/development-guide/using-the-webspatial-api/spatialize-html-elements), [Material](/docs/development-guide/using-the-webspatial-api/add-material-backgrounds), [Elevation](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements), [Scenes](/docs/development-guide/using-the-webspatial-api/manage-multiple-scenes), [3D](/docs/development-guide/using-the-webspatial-api/add-3d-content)) in web projects where the SDK is already integrated.

There are currently two sample projects:

1. One is the [Quick Example](/docs/quick-example) itself, which you can build it from scratch, or just grab the ready-made version from [the repo](https://github.com/webspatial/quick-example). There's also a [video](https://youtu.be/ddBBDBq7nhs) showing the full setup process.
2. The other is the ["techshop" demo](https://github.com/webspatial/sample-techshop), showcases more realistic spatial UI design and also demonstrates [cross-platform functionality](/docs/introduction/built-on-the-existing-web-ecosystem#example-techshop).

## Feedback & Support

<!-- :::warning -->

The WebSpatial SDK is newly open-sourced and may have bugs or missing docs/examples. If you run into issues, don't spend too much time trying to fix them yourself, just share sample code with us on [Discord](https://discord.gg/nhFhSuhNF2) or [GitHub Issues](https://github.com/webspatial/webspatial-sdk/issues). That way, we can quickly assess the problem and offer a solution, suggestion, or hotfix.

<!-- ::: -->

## Table of Contents

<div className="blackLink">

1. [Introduction](/docs/introduction)
   - [New Powers for XR Apps](/docs/introduction/new-powers-for-xr-apps)
   - [The New Generation of Spatial Apps](/docs/introduction/the-new-generation-of-spatial-apps)
   - [HTML/CSS and WebXR](/docs/introduction/html-css-and-webxr)
   - [Make the Web Spatial Too](/docs/introduction/make-the-web-spatial-too)
   - [Built on the Existing Web Ecosystem](/docs/introduction/built-on-the-existing-web-ecosystem)
   - [If You Are a \_\_\_ Developer](/docs/introduction/if-you-are-a-developer)
2. [Quick Example](/docs/quick-example)
3. [Core Concepts](/docs/core-concepts)
   - [Shared Space and Spatial Apps](/docs/core-concepts/shared-space-and-spatial-apps)
   - [Unique Concepts in WebSpatial](/docs/core-concepts/unique-concepts-in-webspatial)
   - [Scenes and Spatial Layouts](/docs/core-concepts/scenes-and-spatial-layouts)
   - [Spatialized Elements and 3D Container Elements](/docs/core-concepts/spatialized-elements-and-3d-container-elements)
   - [Full Space and AR Capabilities](/docs/core-concepts/full-space-and-ar-capabilities)
4. [Development Guide](/docs/development-guide)
   - [Web Projects That Support WebSpatial](/docs/development-guide/web-projects-that-support-webspatial)
     - [Creating New Web Projects](/docs/development-guide/web-projects-that-support-webspatial/creating-new-web-projects)
   - [Enabling WebSpatial in Web Projects](/docs/development-guide/enabling-webspatial-in-web-projects)
     - [Prerequisite: Become a (Minimal) PWA](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa)
       - [Add Icon Files](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-icon-files)
       - [Add Web App Manifest](/docs/development-guide/enabling-webspatial-in-web-projects/prerequisite-become-a-minimal-pwa/add-web-app-manifest)
     - [Step 1: Install the WebSpatial SDK](/docs/development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk)
     - [Step 2: Add Build Tool for Packaged WebSpatial Apps](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps)
       - [Options of the WebSpatial Builder](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/options-of-the-webspatial-builder)
       - [(Optional) Simplify WebSpatial Builder Using dotenv](/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps/optional-simplify-webspatial-builder-using-dotenv)
     - [Step 3: Integrate WebSpatial SDK into Web Build Tools](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools)
       - [Configure JS/TS Compiler](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/configure-js-ts-compiler)
       - [Add Optimizations and Defaults to Web Build Tools](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/add-optimizations-and-defaults-to-web-build-tools)
       - [Generate a WebSpatial-Specific Website](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website)
       - [Check if Running in WebSpatial Mode](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode)
   - [Using the WebSpatial API](/docs/development-guide/using-the-webspatial-api)
     - [Spatialize HTML Elements](/docs/development-guide/using-the-webspatial-api/spatialize-html-elements)
     - [Add Material Backgrounds](/docs/development-guide/using-the-webspatial-api/add-material-backgrounds)
     - [Elevate 2D Elements](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements)
     - [Manage Multiple Scenes](/docs/development-guide/using-the-webspatial-api/manage-multiple-scenes)
     - [Add 3D Content](/docs/development-guide/using-the-webspatial-api/add-3d-content)

</div>
