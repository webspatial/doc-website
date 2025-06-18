---
sidebar_position: 3
---

# HTML/CSS and WebXR

However, the problem that follows is, **the Web didn't automatically gain such spatial capabilities**.

## The Problem with HTML/CSS {#html-css}

**The Web is naturally friendly to multitasking, multi-window, and multi-app use.** Each web page can focus on its own content and single purpose, coexisting smoothly with the OS and other apps.

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-1.jpg" alt="intro-3-1" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-2.jpg" alt="intro-3-2" />
  </div>
</div>

On desktop and mobile platforms, Web development relies on **the same 2D GUI technology** as native apps. Frameworks like React are popular, even the underlying tech - HTML, CSS, and JS based on the browser's layout engine - is also based on UI component (i.e., HTML elements), layout relationships, and a development paradigm that resembles building blocks and centers around code.

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-3.jpg" alt="intro-3-3" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-4.jpg" alt="intro-3-4" />
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-5.jpg" alt="intro-3-5" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-6.jpg" alt="intro-3-6" />
  </div>
</div>

However, HTML/CSS content is confined to the 2D plane of a browser window or WebView. It cannot enter 3D space. Its most APIs (i.e., CSS) are based on the X and Y axes. The few APIs that involve the Z axis, such as `translate3d` and WebGL, can only describe Z-axis effects **projected onto a 2D canvas**.

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-7.jpg" alt="intro-3-7" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-8.jpg" alt="intro-3-8" />
  </div>
</div>

This situation for Web frameworks and HTML/CSS was the same as SwiftUI on iOS/iPadOS before visionOS arrived.

## The Problem with WebXR {#webxr}

On the other hand, Web 3D content built with WebGL or WebGPU can use a new Web standard API - [WebXR](https://developer.picoxr.com/document/web/introduce-webxr-standards/) - on spatial computing platforms to break out of the browser window, enter 3D space, and gain XR interaction capabilities from XR hardware (head tracking, hand tracking, and so on). In this way, the Web gains spatial capabilities comparable to OpenXR or Unity apps.

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-9.jpg" alt="intro-3-9" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-3-10.jpg" alt="intro-3-10" />
  </div>
</div>

But WebXR content faces issues identical to those of [traditional XR apps](./the-new-generation-of-spatial-apps#traditional-xr-apps) built with OpenXR or Unity:

- WebXR content **cannot coexist with other XR apps**, and it **cannot even coexist with other 2D Web content in the same web page**. Once a WebXR session starts, it takes over rendering for the entire space, hiding the original web page and OS UI; the app itself must handle all interaction.
- Its all content and GUI must be built [**entirely with WebGL or WebGPU**](https://developer.picoxr.com/document/web/webxr-vs-web3d/), usually with a **Web 3D engine**. This approach is **completely disconnected** from mainstream Web development with HTML + CSS + JS. In mainstream internet domains, 2D Web GUIs satisfy requirements easily and tap into a huge stock of UI patterns, component libraries, and open-source ecosystems. **None of that can be used directly in WebXR development**. Devs have to start from scratch, reinvent UI with disparate 3D GUI experiments or re-implement familiar 2D GUIs via WebGL/WebGPU.

<Image src="/assets/intro/intro-3-11.jpg" alt="intro-3-11" />
<Image src="/assets/intro/intro-3-12.jpg" alt="intro-3-12" />

## Problem Summary {#summary}

WebXR is **incompatible with the mainstream Web-development ecosystem and cannot live alongside existing 2D Web content**, while the HTML/CSS tech used in mainstream Web development **lacks any spatial capability**.
