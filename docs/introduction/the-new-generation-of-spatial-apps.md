---
sidebar_position: 2
---

# The New Generation of Spatial Apps

With Apple's release of the next-gen XR OS, visionOS, and its new spatial-computing architecture ([Unified Rendering app model](https://developer.picoxr.com/news/multi-app-rendering/)), the [long-standing bottlenecks of traditional XR apps](#problems-with-traditional-xr-apps) have been fundamentally addressed.

The new generation of XR apps - **spatial apps** - are not cut off from the 2D apps on desktop and mobile platforms. Instead, they extend the advantages of those 2D apps, adding [**spatial capabilities**](../core-concepts/shared-space-and-spatial-apps) that bring **optional enhancements** on spatial-computing platforms and free them from flat 2D windows.

<div className="row">
  <div className="col col--6">
    <Image src="https://static.webspatial.dev/intro-2-1-1.gif" alt="intro-2-1" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-2-2.png" alt="intro-2-2" />
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-2-3.png" alt="intro-2-3" />
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-2-4.png" alt="intro-2-4" />
  </div>
</div>

## Comparing Three App Types {#comparing}

:::info

In the comparisons below, underline means advantage and _italics_ mean disadvantage.

:::

### Multitasking {#comparing-multitasking}

- **Spatial apps**

  - <ins>Can run and use **multiple apps that include 3D content** at the same time.</ins>
  - <ins>Can **quickly switch** between the currently focused apps.</ins>
  - <ins>Can **keep auxiliary apps open** while using a primary app.</ins>

- **Desktop/Mobile apps**

  - Can run and use **multiple apps** at the same time.
  - <ins>Can **quickly switch** between the currently focused apps.</ins>
  - <ins>Can **keep auxiliary apps open** while using a primary app.</ins>

- **Traditional XR apps**
  - _Only one app with 3D content can run at a time._
  - _Switching requires quitting the current app and launching the next, which is costly._
  - _Cannot keep auxiliary apps (especially 3D apps) open while using a primary app._

### Relationship with the OS {#comparing-os}

- **Spatial apps**

  - <ins>An app can **own the entire 3D space** or only [**a local part of it**](../core-concepts/scenes-and-spatial-layouts) such as its own [scene container (similar to a bounding box)](../core-concepts/scenes-and-spatial-layouts), while the OS handles the rest.</ins>
  - <ins>Because the OS supplies most functionality and a unified experience, the app can **focus on its unique value**, so design and development costs stay low and package size is small.</ins>

- **Desktop/Mobile apps**

  - Each app only handles part of what's shown on the screen (**the content within its own window**), while the OS handles the rest.
  - <ins>Because the OS supplies most functionality and a unified experience, the app can **focus on its unique value**, so design and development costs stay low and package size is small.</ins>

- **Traditional XR apps**
  - The app takes over the entire 3D space, rendering **all** visuals and features (excluding the OS's temporary flat overlays, like the global toolbar).
  - _The app must satisfy nearly all user needs on its own, so design and development costs are high, package size is large, and experiences are inconsistent across apps._

### 3D Capability {#comparing-3d}

- **Spatial apps**

  - <ins>The 2D and 3D content in the app can [**go beyond the flat window**](../core-concepts/spatialized-elements-and-3d-container-elements) and be displayed throughout the 3D space.</ins>
  - To let multiple apps [**share one 3D space (unified rendering)**](../core-concepts/shared-space-and-spatial-apps#unified-rendering), different apps can't just implement arbitrary rendering mechanisms and freely draw their content without constraints. They must supply content via [OS-managed 2D/3D containers](../core-concepts/scenes-and-spatial-layouts.m) and describe it with OS-understood APIs; the OS handles the rendering.

- **Desktop/Mobile apps**

  - _Both 2D and 3D content in the app must stay in a single plane (3D content is **projected** onto that plane)._

- **Traditional XR apps**
  - <ins>2D and 3D content in the app can be shown **anywhere** in the app's **exclusive** 3D space.</ins>

### Interaction Capability {#comparing-interaction}

- **Spatial apps**

  - <ins>Leverage environment sensing, head tracking, hand tracking, and eye tracking to deliver [**truly natural interaction**](../core-concepts/spatialized-elements-and-3d-container-elements#nature-interaction).</ins>
  - <ins>Need no controllers. Regardless of GUI type (2D or 3D) or distance, these apps default to using the most efficient, low-effort, and natural **eye-hand interaction**. The OS handles interaction implementation and visual effects, reducing app costs and keeping the user experience consistent.</ins>

- **Desktop/Mobile apps**

  - _Interaction has evolved from mouse and keyboard to multi-touch, gradually approaching **natural interaction** in the physical world._

- **Traditional XR apps**
  - <ins>Leverage environment sensing, head tracking, hand tracking or XR controllers to allow further progress toward **natural interaction** beyond multi-touch on screens.</ins>
  - For distant 2D GUIs, users must aim a pointer ray with a controller or hand, which feels **less natural and is less efficient** than than a mouse.

### Development Approach {#comparing-development}

- **Spatial apps**

  - <ins>Built on [**2D GUI frameworks** enhanced with spatial features](../introduction/built-on-the-existing-web-ecosystem).</ins>
  - <ins>Fit almost every business domain and app type (except a few heavy 3D niches) while building on the existing product/GUI design patterns and keep developing from there.</ins>
  - <ins>[APIs](../core-concepts/unique-concepts-in-webspatial#webspatial-api) are highly abstract, concrete, intuitive, and have a low learning curve.</ins>
  - <ins>Large potential base of developers ready to start building and strong integration with the open-source ecosystem.</ins>

- **Desktop/Mobile apps**

  - Based on **2D GUI frameworks**.
  - <ins>Fit almost every business domain and app type (except some 3D games) with existing product/GUI design patterns.</ins>
  - <ins>APIs are highly abstract, concrete, intuitive, and have a low learning curve.</ins>
  - <ins>Large developer base and thriving open-source ecosystem.</ins>

- **Traditional XR apps**
  - Based on **3D game engines**.
  - _Few existing product/GUI design patterns for **non-gaming apps**._
  - _APIs come from computer graphics, they are relatively **low level**, less intuitive, and have a steep learning curve._
  - _The developer base and ecosystem are smaller, skewing toward paid tools with fewer high-quality open-source options._

### Interaction Implementation {#comparing-interaction-tech}

- **Spatial apps**

  - <ins>The OS provides [basic interaction events (for 2D)](../development-guide/using-the-webspatial-api/spatialize-html-elements#content-interaction) and [advanced spatial interaction events (for 3D or 2D content)](../core-concepts/spatialized-elements-and-3d-container-elements#spatial-interaction).</ins>
  - <ins>The OS renders common interaction visuals.</ins>

- **Desktop/Mobile apps**

  - <ins>The OS provides basic interaction events.</ins>
  - <ins>The OS renders the mouse cursor.</ins>

- **Traditional XR apps**
  - _The app itself handles all interaction events on 2D or 3D content._
  - _The app must render all visual effects and interaction indicators for controllers and hands._
  - _[Building XR interaction is costly](https://developer.picoxr.com/document/web/webxr-vs-web3d/), requiring building from scratch or leveraging inconsistent XR toolkits._

### UI Implementation {#comparing-gui-tech}

- **Spatial apps**

  - <ins>The GUI is built from **UI components** (including [3D containers](/core-concepts/spatialized-elements-and-3d-container-elements#3d-elements)).</ins>
  - <ins>The OS and framework render those components each frame; the app does not care about drawing.</ins>
  - <ins>Position and size of these UI elements are automatically decided based on their [**layout relationships** (like nesting hierarchy or order) and attributes](../development-guide/using-the-webspatial-api/elevate-2d-elements). Developers use them like **building blocks** - highly concrete and intuitive - allow developers to work entirely in code without the assistance of visual editors.</ins>

- **Desktop/Mobile apps**

  - The GUI is built from **UI components**.
  - <ins>The OS and framework render those components each frame; the app does not care about drawing.</ins>
  - <ins>Layout relationships and attributes determine position and size; developers think in **building blocks**, code-centric, no visual editor needed.</ins>

- **Traditional XR apps**
  - The GUI is built from **graphics objects**.
  - _The app itself renders those objects each frame._
  - _Position and size come from coordinates. Developers usually need visual editors to help make the rendering and using of these objects more clear and intuitive._

## Problems with Traditional XR Apps {#traditional-xr-apps}

Before visionOS, apps on XR platforms were **completely different** from apps on desktop and mobile:

<div className="row">
  <div className="col col--6">
    <Image src="/assets/intro/intro-2-5.png" alt="intro-2-5" />
    <p className="text--center">Desktop apps</p>
  </div>
  <div className="col col--6">
    <Image src="/assets/intro/intro-2-6.png" alt="intro-2-6" />
    <p className="text--center">Traditional XR apps</p>
  </div>
</div>

From the comparison above, we can see that besides the three main advantages mentioned in [the previous section](./new-powers-for-xr-apps), **traditional XR apps have downsides both in terms of user experience and development, losing many benefits of desktop/mobile apps**. Traditional XR development could not reuse existing app code, tools, and programming mindsets from mainstream platforms. This makes it harder to support diverse use cases and business domains, leads to fewer developers, and raises both the entry barrier and development costs.
