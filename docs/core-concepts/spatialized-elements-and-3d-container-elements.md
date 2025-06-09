---
sidebar_position: 4
---

# Spatialized Elements and 3D Container Elements

[Spatial apps](./shared-space-and-spatial-apps#spatial-apps) are composed of [Scenes](./scenes-and-spatial-layouts), and the content in a Scene is made up of both 2D and 3D content.

For a [WebSpatial app](./unique-concepts-in-webspatial#webspatial-app), all content within the Scene is composed entirely of HTML elements.

## Spatialization of 2D Content Elements {#2d-elements}

2D content refers to existing HTML elements that can be [converted into "spatialized HTML elements"](../development-guide/using-the-webspatial-api/spatialize-html-elements) to gain spatial capabilities.

After a 2D HTML element is spatialized, its original capabilities remain unchanged by default, such as:

- Existing HTML attributes
- Existing CSS APIs ([exceptions](../development-guide/using-the-webspatial-api/add-material-backgrounds#stacking-order))
- Existing DOM APIs
- The ability to nest and compose with other HTML elements, whether spatialized or not
- Layout control for position and size on the X and Y axes
- ...

A spatialized 2D element mainly gains two new capabilities:

1. **Dynamic backgrounds**

   It can render its background based on the spatial environment around the app, for example, using translucent materials instead of a fixed solid color.

   :::info
   View [related WebSpatial APIs](../development-guide/using-the-webspatial-api/add-material-backgrounds).
   :::

   [![](/assets/concepts/4-1.png)](/assets/concepts/4-1.png)

2. **Spatial elevation**

   It can move, transform, and be laid out along the Z-axis in front of the web-page window, allowing it to be "elevated" into 3D space.

   :::info
   View [related WebSpatial APIs](../development-guide/using-the-webspatial-api/elevate-2d-elements).
   :::

   [![](/assets/concepts/4-2.png)](/assets/concepts/4-2.png)

Both new capabilities support nesting:

1. If the window or a parent element already has a material background, its child elements can still use [different translucent material](../development-guide/using-the-webspatial-api/add-material-backgrounds#translucent-options) backgrounds.

   [![](/assets/concepts/4-3.png)](/assets/concepts/4-3.png)
   [![](/assets/concepts/4-4.png)](/assets/concepts/4-4.png)

2. If the parent element has been elevated and rotated in 3D space, child elements can continue to be elevated and rotated on that basis.

   [![](/assets/concepts/4-5.jpeg)](/assets/concepts/4-5.jpeg)
   [![](/assets/concepts/4-6.png)](/assets/concepts/4-6.png)

## 3D Content Container Elements {#3d-elements}

3D content in a Scene comes from the new 3D content container elements introduced by the [WebSpatial API](./unique-concepts-in-webspatial#webspatial-api).

Currently, such elements are provided in the [WebSpatial SDK](./unique-concepts-in-webspatial#webspatial-sdk) as React components. These serve as wrappers for the eventual standardized HTML elements, allowing web developers to start using potential future HTML/CSS APIs as directly as possible.

A 3D content container element is similar to a [Volumetric Scene](./scenes-and-spatial-layouts#volume-scene): it is a volumetric "bounding-box–like" local 3D space. However, it is **NOT managed by the OS**. It is still part of the current Scene, laid out with other 2D and 3D elements on the X, Y, and Z axes. Its position and size are determined by its own CSS styles and layout relationships.

A 3D content container element has the same capabilities as a 2D content element:

- General HTML attributes (`style`, `class`, `id`, and so on)
- General CSS APIs ([exceptions](../development-guide/using-the-webspatial-api/add-material-backgrounds#stacking-order))
- General DOM APIs
- The ability to nest and compose with other HTML elements (including spatialized and non-spatialized 2D elements, and other 3D elements).
- Layout control for position and size on the X and Y axes
- ...

It also inherits the spatial capabilities of spatialized HTML elements:

- As a whole, it can move, transform, and be laid out along the Z-axis in front of the web-page window so that it can be elevated into 3D space.

:::note
A 3D content container element is a transparent local 3D space. It has **no background** and therefore does not support material background properties.
:::

There are two kinds of 3D content container elements.

- **Static 3D content containers**

  Their 3D content comes from pre-authored [3D model files](../development-guide/using-the-webspatial-api/add-3d-content).

  [![](/assets/concepts/4-7.png)](/assets/concepts/4-7.png)

- **Dynamic 3D content containers**

  Their 3D content is generated in real time by a [3D engine](../development-guide/using-the-webspatial-api/add-3d-content).

  [![](/assets/concepts/4-8.png)](/assets/concepts/4-8.png)

## Interaction with 2D Content {#nature-interaction}

For those non-spatial elements **inside the 2D content**, interaction works the same way as 2D web content in a browser on a spatial-computing platform (for example, Safari on visionOS).

The default interaction mode on visionOS is called **Natural Interaction** and includes:

- **Indirect gestures**

  - **Eye gaze** for "selection (navigation)" and **pinch** for "activation (trigger)."
  - At the moment of the pinch gesture, the finger position corresponds to the gaze point, acting as the starting point. If the user keeps pinching, subsequent finger movement adjusts that point.

- **Direct gestures**

  - Moving a finger without touching an object is "selection (navigation)," while touching the object is "activation (trigger)."
  - As with touchscreens, after the finger touches an object it can move before releasing to fire move events.

[![](/assets/concepts/4-9.png)](/assets/concepts/4-9.png)

The browser engine on visionOS already lets 2D web content support Natural Interaction:

1. **Selection (navigation)**

   1. An interactive HTML element (it **must comply with the [Interaction Region](../development-guide/using-the-webspatial-api/spatialize-html-elements#hover-effect) rules**) is targeted via eye gaze or by moving a finger close to it.
   2. **No JS events fire and no CSS state changes occur** during this phase, so the web page cannot show interaction cues. Essentially, the web page is unaware of the user's selection or actions at this point.
   3. During this phase, the OS provides **native interaction cues** to help users see what they are selecting.

2. **Activation (trigger)**
   1. At the moment of a pinch (indirect) or tap (direct), [JS events](../development-guide/using-the-webspatial-api/spatialize-html-elements#js-events) fire on the selected element.
   2. If the user keeps pinching or pressing and then moves the finger, [JS events](../development-guide/using-the-webspatial-api/spatialize-html-elements#js-events) continue to fire on the element.

:::info
See the detailed [interaction APIs](../development-guide/using-the-webspatial-api/spatialize-html-elements#content-interaction) for more information.
:::

## Interaction with 3D Elements and Spatialized 2D Elements {#spatial-interaction}

If you want to interact with the specific 3D content inside a 3D container element, or with spatialized 2D elements that are "elevated" into space - as well as the 3D container element itself - you can't use the usual [low-level JS events](../development-guide/using-the-webspatial-api/spatialize-html-elements#js-events). A new set of **high-level spatial gesture APIs** is provided on the React component.

> More docs to be added
