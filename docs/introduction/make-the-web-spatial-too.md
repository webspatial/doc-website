---
sidebar_position: 4
---

# Make the Web Spatial Too

**WebSpatial** is a set of [spatial APIs](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-api) built on top of the mainstream Web-development ecosystem and existing 2D Web. It enables the entire HTML/CSS-based Web world - billions of websites and Web apps, tens of millions of Web developers, and millions of open-source libraries - to step into the spatial era, **gaining spatial power on par with native spatial apps (like visionOS apps) while keeping all the advantages the Web already have**.

<iframe
  style={{
    aspectRatio: "4/3",
    maxWidth: "100%",
    height: "auto"
  }}
  src="https://www.youtube.com/embed/Bkef2HvkKhY?si=rjepUJPBFMy-bgLu"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

### Position HTML Elements on the Z Axis {#position}

With WebSpatial, **HTML elements** can be laid out and positioned not only along the X and Y axes via CSS, but also [**along the Z axis in front of the web page**](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements):

<Image img={require("/assets/intro/intro-4-2.jpeg")} alt="image" />

### Transform HTML Elements in True 3D {#transform}

WebSpatial lets HTML elements [**rotate, scale, and warp along the Z axis in real space**](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements).

<Image img={require("/assets/intro/intro-4-3.jpg")} alt="image" />

For example, you can build an actual 3D cube using plain `div` elements:

<Image img={require("/assets/intro/intro-4-4.jpeg")} alt="image" />

### Material-Based Backgrounds {#material}

With WebSpatial, HTML elements can have backgrounds that are **[semi-transparent materials](/docs/development-guide/using-the-webspatial-api/add-material-backgrounds) rendered in real time from the environment**, so regardless of the environment's color and lighting conditions, content stays legible.

You can also set the background of an element or an entire page window to a [**fully transparent material**](/docs/development-guide/using-the-webspatial-api/add-material-backgrounds), making its contents appear to float and disperse in space.

<Image img={require("/assets/intro/intro-4-5.jpg")} alt="image" />

### Genuine 3D Elements for HTML {#3d-elements}

WebSpatial adds **[true 3D elements](/docs/core-concepts/spatialized-elements-and-3d-container-elements#3d-elements)** to HTML, allowing 3D content to appear directly in space:

<Image img={require("/assets/intro/intro-4-6.jpeg")} alt="image" />

These 3D elements can [**participate in layout alongside 2D elements**](/docs/development-guide/using-the-webspatial-api/add-3d-content), forming any mix of Web content and GUI:

<Image img={require("/assets/intro/intro-4-7.jpeg")} alt="image" />

### Multi-Scene Spatial Apps {#multi-scene}

A WebSpatial app can comprise multiple **[scenes](/docs/core-concepts/scenes-and-spatial-layouts)**, just like a native spatial app. These 2D + 3D (or pure 3D) scenes can be [**managed as standard Web windows**](/docs/development-guide/using-the-webspatial-api/manage-multiple-scenes), while also allowing for be [initialized with configurations specific to spatial computing platforms](/docs/core-concepts/scenes-and-spatial-layouts#scene-init).

<video
  src="https://static.webspatial.dev/multi-scenes.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{ width: '100%', height: 'auto' }}
/>

### 3D Containers with 3D Engine APIs (upcoming feature) {#3d-engine}

Among the 3D elements WebSpatial adds to HTML, there is a container type that lets you **render and control its 3D content via 3D engine APIs**. Web 3D programming is no longer limited to flat canvases or a handful of full-screen 3D games (including WebXR games that take over the whole 3D space). It can now be useful in multitasking scenarios and a far wider range of applications.
