---
sidebar_position: 2
---

# The New Generation of Spatial Apps

With Apple's release of the next-gen XR OS, visionOS, and its new spatial-computing architecture ([Unified Rendering app model](https://developer.picoxr.com/news/multi-app-rendering/)), the [long-standing bottlenecks of traditional XR apps](#traditional-xr-apps) have been fundamentally addressed.

The new generation of XR apps - **spatial apps** - are not cut off from the 2D apps on desktop and mobile platforms. Instead, they extend the advantages of those 2D apps, adding [**spatial capabilities**](/docs/core-concepts/shared-space-and-spatial-apps) that bring **optional enhancements** on spatial-computing platforms and free them from flat 2D windows.

<div className="row">
  <div className="col col--6">
    <video
      src="https://static.webspatial.dev/intro-2-1-1.mp4"
      autoPlay
      loop
      muted
      playsInline
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/intro/intro-2-2.jpg")} alt="intro-2-2" />
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <Image img={require("/assets/intro/intro-2-3.jpg")} alt="intro-2-3" />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/intro/intro-2-4.jpg")} alt="intro-2-4" />
  </div>
</div>

## Comparing Three App Types {#comparing}

:::info

In the comparisons below, <span className="advantage-mark">green background</span> means advantage and <span className="disadvantage-mark">red background</span> means disadvantage.

:::

### Multitasking {#comparing-multitasking}

- **Spatial apps**

  - <span className="advantage-mark">Can run and use **multiple apps that include 3D content** at the same time.</span>
  - <span className="advantage-mark">Can **quickly switch** between the currently focused apps.</span>
  - <span className="advantage-mark">Can **keep auxiliary apps open** while using a primary app.</span>

- **Desktop/Mobile apps**

  - Can run and use **multiple apps** at the same time.
  - <span className="advantage-mark">Can **quickly switch** between the currently focused apps.</span>
  - <span className="advantage-mark">Can **keep auxiliary apps open** while using a primary app.</span>

- **Traditional XR apps**
  - <span className="disadvantage-mark">Only one app with 3D content can run at a time.</span>
  - <span className="disadvantage-mark">Switching requires quitting the current app and launching the next, which is costly.</span>
  - <span className="disadvantage-mark">Cannot keep auxiliary apps (especially 3D apps) open while using a primary app.</span>

### Relationship with the OS {#comparing-os}

- **Spatial apps**

  - <span className="advantage-mark">An app can **own the entire 3D space** or only [**a local part of it**](/docs/core-concepts/scenes-and-spatial-layouts) such as its own [scene container (similar to a bounding box)](/docs/core-concepts/scenes-and-spatial-layouts), while the OS handles the rest.</span>
  - <span className="advantage-mark">Because the OS supplies most functionality and a unified experience, the app can **focus on its unique value**, so design and development costs stay low and package size is small.</span>

- **Desktop/Mobile apps**

  - Each app only handles part of what's shown on the screen (**the content within its own window**), while the OS handles the rest.
  - <span className="advantage-mark">Because the OS supplies most functionality and a unified experience, the app can **focus on its unique value**, so design and development costs stay low and package size is small.</span>

- **Traditional XR apps**
  - The app takes over the entire 3D space, rendering **all** visuals and features (excluding the OS's temporary flat overlays, like the global toolbar).
  - <span className="disadvantage-mark">The app must satisfy nearly all user needs on its own, so design and development costs are high, package size is large, and experiences are inconsistent across apps.</span>

### 3D Capability {#comparing-3d}

- **Spatial apps**

  - <span className="advantage-mark">The 2D and 3D content in the app can [**go beyond the flat window**](/docs/core-concepts/spatialized-elements-and-3d-container-elements) and be displayed throughout the 3D space.</span>
  - To let multiple apps [**share one 3D space (unified rendering)**](/docs/core-concepts/shared-space-and-spatial-apps#unified-rendering), different apps can't just implement arbitrary rendering mechanisms and freely draw their content without constraints. They must supply content via [OS-managed 2D/3D containers](/docs/core-concepts/scenes-and-spatial-layouts) and describe it with OS-understood APIs; the OS handles the rendering.

- **Desktop/Mobile apps**

  - <span className="disadvantage-mark">Both 2D and 3D content in the app must stay in a single plane (3D content is **projected** onto that plane).</span>

- **Traditional XR apps**
  - <span className="advantage-mark">2D and 3D content in the app can be shown **anywhere** in the app's **exclusive** 3D space.</span>

### Interaction Capability {#comparing-interaction}

- **Spatial apps**

  - <span className="advantage-mark">Leverage environment sensing, head tracking, hand tracking, and eye tracking to deliver [**truly natural interaction**](/docs/core-concepts/spatialized-elements-and-3d-container-elements#nature-interaction).</span>
  - <span className="advantage-mark">Need no controllers. Regardless of GUI type (2D or 3D) or distance, these apps default to using the most efficient, low-effort, and natural **eye-hand interaction**. The OS handles interaction implementation and visual effects, reducing app costs and keeping the user experience consistent.</span>

- **Desktop/Mobile apps**

  - <span className="disadvantage-mark">Interaction has evolved from mouse and keyboard to multi-touch, gradually approaching **natural interaction** in the physical world.</span>

- **Traditional XR apps**
  - <span className="advantage-mark">Leverage environment sensing, head tracking, hand tracking or XR controllers to allow further progress toward **natural interaction** beyond multi-touch on screens.</span>
  - For distant 2D GUIs, users must aim a pointer ray with a controller or hand, which feels **less natural and is less efficient** than than a mouse.

### Development Approach {#comparing-development}

- **Spatial apps**

  - <span className="advantage-mark">Built on [**2D GUI frameworks** enhanced with spatial features](/docs/introduction/built-on-the-existing-web-ecosystem).</span>
  - <span className="advantage-mark">Fit almost every business domain and app type (except a few heavy 3D niches) while building on the existing product/GUI design patterns and keep developing from there.</span>
  - <span className="advantage-mark">[APIs](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-api) are highly abstract, concrete, intuitive, and have a low learning curve.</span>
  - <span className="advantage-mark">Large potential base of developers ready to start building and strong integration with the open-source ecosystem.</span>

- **Desktop/Mobile apps**

  - Based on **2D GUI frameworks**.
  - <span className="advantage-mark">Fit almost every business domain and app type (except some 3D games) with existing product/GUI design patterns.</span>
  - <span className="advantage-mark">APIs are highly abstract, concrete, intuitive, and have a low learning curve.</span>
  - <span className="advantage-mark">Large developer base and thriving open-source ecosystem.</span>

- **Traditional XR apps**
  - Based on **3D game engines**.
  - <span className="disadvantage-mark">Few existing product/GUI design patterns for **non-gaming apps**.</span>
  - <span className="disadvantage-mark">APIs come from computer graphics, they are relatively **low level**, less intuitive, and have a steep learning curve.</span>
  - <span className="disadvantage-mark">The developer base and ecosystem are smaller, skewing toward paid tools with fewer high-quality open-source options.</span>

### Interaction Implementation {#comparing-interaction-tech}

- **Spatial apps**

  - <span className="advantage-mark">The OS provides [basic interaction events (for 2D)](/docs/development-guide/using-the-webspatial-api/spatialize-html-elements#content-interaction) and [advanced spatial interaction events (for 3D or 2D content)](/docs/core-concepts/spatialized-elements-and-3d-container-elements#spatial-interaction).</span>
  - <span className="advantage-mark">The OS renders common interaction visuals.</span>

- **Desktop/Mobile apps**

  - <span className="advantage-mark">The OS provides basic interaction events.</span>
  - <span className="advantage-mark">The OS renders the mouse cursor.</span>

- **Traditional XR apps**
  - <span className="disadvantage-mark">The app itself handles all interaction events on 2D or 3D content.</span>
  - <span className="disadvantage-mark">The app must render all visual effects and interaction indicators for controllers and hands.</span>
  - <span className="disadvantage-mark">[Building XR interaction is costly](https://developer.picoxr.com/document/web/webxr-vs-web3d/), requiring building from scratch or leveraging inconsistent XR toolkits.</span>

### UI Implementation {#comparing-gui-tech}

- **Spatial apps**

  - <span className="advantage-mark">The GUI is built from **UI components** (including [3D containers](/docs/core-concepts/spatialized-elements-and-3d-container-elements#3d-elements)).</span>
  - <span className="advantage-mark">The OS and framework render those components each frame; the app does not care about drawing.</span>
  - <span className="advantage-mark">Position and size of these UI elements are automatically decided based on their [**layout relationships** (like nesting hierarchy or order) and attributes](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements). Developers use them like **building blocks** - highly concrete and intuitive - allow developers to work entirely in code without the assistance of visual editors.</span>

- **Desktop/Mobile apps**

  - The GUI is built from **UI components**.
  - <span className="advantage-mark">The OS and framework render those components each frame; the app does not care about drawing.</span>
  - <span className="advantage-mark">Layout relationships and attributes determine position and size; developers think in **building blocks**, code-centric, no visual editor needed.</span>

- **Traditional XR apps**
  - The GUI is built from **graphics objects**.
  - <span className="disadvantage-mark">The app itself renders those objects each frame.</span>
  - <span className="disadvantage-mark">Position and size come from coordinates. Developers usually need visual editors to help make the rendering and using of these objects more clear and intuitive.</span>

## Problems with Traditional XR Apps {#traditional-xr-apps}

Before visionOS, apps on XR platforms were **completely different** from apps on desktop and mobile:

<div className="row">
  <div className="col col--6">
    <Image img={require("/assets/intro/intro-2-5.jpg")} alt="intro-2-5" />
    <p className="text--center">Desktop apps</p>
  </div>
  <div className="col col--6">
    <Image img={require("/assets/intro/intro-2-6.jpg")} alt="intro-2-6" />
    <p className="text--center">Traditional XR apps</p>
  </div>
</div>

From the comparison above, we can see that besides the three main advantages mentioned in [the previous section](/docs/introduction/new-powers-for-xr-apps), **traditional XR apps have downsides both in terms of user experience and development, losing many benefits of desktop/mobile apps**. Traditional XR development could not reuse existing app code, tools, and programming mindsets from mainstream platforms. This makes it harder to support diverse use cases and business domains, leads to fewer developers, and raises both the entry barrier and development costs.
