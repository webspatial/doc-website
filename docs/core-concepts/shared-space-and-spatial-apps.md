---
sidebar_position: 1
---

# Shared Space and Spatial Apps

## Shared Space {#shared-space}

The [spatial-computing architecture introduced by visionOS](#unified-rendering) provides a brand-new app runtime environment called **Shared Space**.

A Shared Space is a [Mixed Reality](https://developer.picoxr.com/document/web/introduce-vr-mr-ar/) 3D environment that matches the physical space around you.

Within this single 3D space, multiple apps can coexist harmoniously - they fit naturally into the real-world environment and with one another.

These **Multitasking Apps** include not only traditional 2D apps but also **Spatial Apps** that take advantage of 3D space and contain 3D content.

| <Image src="/assets/concepts/1-1.png" alt="Scene Example 1" /> | <Image src="/assets/concepts/1-2.png" alt="Scene Example 1" /> |
| :-------------------------------------------------------: | :-------------------------------------------------------: |

## Spatial Apps {#spatial-apps}

Inside a Shared Space, an app's content is no longer confined to the plane of a 2D window; it **can extend into the 3D space in front of that plane**. In addition to X and Y, content's positioning and layout now incorporate a true Z-axis.

Content is no longer limited to 2D window containers. It can be placed in spatial containers that **have volume**, similar to 3D bounding boxes.

An app can be made up of [multiple such content containers](./scenes-and-spatial-layouts), all of which are [**managed uniformly by the spatial-computing OS**](./scenes-and-spatial-layouts#spatial-layout).

Many 2D UI elements that make up the content can be **[spatialized](./spatialized-elements-and-3d-container-elements)**, meaning they enter 3D space where they can be positioned, laid out, and transformed.

You can also use [3D UI elements](./spatialized-elements-and-3d-container-elements#3d-elements) to build richer, more flexible and fully-featured 3D content. These 3D elements can **be laid out together with 2D UI elements** along the X, Y, and Z axes, creating more sophisticated **mixed 2D-and-3D** UI components.

This kind of app is called a **Spatial App**.

Spatial Apps are the [new generation of XR apps](../introduction/the-new-generation-of-spatial-apps). They **preserve the strengths of 2D apps** from desktop and mobile platforms while gaining **optional, progressive [spatial enhancements](../introduction/new-powers-for-xr-apps)** on spatial-computing platforms.

<div className="row">
  <div className="col col--6">
    <Image src="/assets/concepts/1-3.png" alt="Spatial App Example 1" />
  </div>
  <div className="col col--6">
    <Image src="/assets/concepts/1-4.png" alt="Spatial App Example 2" />
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <Image src="/assets/concepts/1-5.png" alt="Spatial App Example 3" />
  </div>
  <div className="col col--6">
    <Image src="/assets/concepts/1-6.png" alt="Spatial App Example 4" />
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <Image src="/assets/concepts/1-7.png" alt="Spatial App Example 5" />
  </div>
  <div className="col col--6">
    <Image src="/assets/concepts/1-8.png" alt="Spatial App Example 6" />
  </div>
</div>

:::info
Example apps shown above:

- https://apps.apple.com/us/app/globes/id6480082996
- https://apps.apple.com/us/app/astronoma/id6502267850
- https://apps.apple.com/us/app/museas/id6496682427
- https://apps.apple.com/ca/app/art-universe/id6474541827
- https://apps.apple.com/us/app/calendar-schedule-day-peek/id6477632294
- https://apps.apple.com/us/app/numerics-track-your-metrics/id875319874?platform=vision

:::

## Unified Rendering {#unified-rendering}

Unlike traditional XR apps, spatial apps don't have to rendering their own content or build full XR interactions. Instead, the OS that provides the Shared Space offers a unified rendering service and handles fundamental natural interactions (for example, [gaze and hand interaction](./spatialized-elements-and-3d-container-elements#nature-interaction)).

Multiple Spatial Apps can **blend into a single coordinate system and lighting environment** inside the Shared Space, complete with positional relationships, occlusion, shadows, and more.

Because of this, Spatial Apps cannot freely build independent rendering pipelines. Instead, they expose content through OS-managed 2D/3D containers called **[Scenes](./scenes-and-spatial-layouts)** and describe that content via [APIs the OS understands](./spatialized-elements-and-3d-container-elements). This **lets the OS understand and manage apps' content**, enabling **Unified Rendering**.

:::info
[Unified Rendering App Model](https://developer.picoxr.com/news/multi-app-rendering/):

<Image src="/assets/concepts/1-9.png" alt="Scene Example 1" />

Unified rendering architecture on visionOS:

<Image src="/assets/concepts/1-10.png" alt="Scene Example 1" />

Excerpts from the WWDC session on unified rendering:

<Image src="/assets/concepts/1-11.png" alt="Scene Example 1" />
<Image src="/assets/concepts/1-12.png" alt="Scene Example 1" />
<Image src="/assets/concepts/1-13.png" alt="Scene Example 1" />
:::
