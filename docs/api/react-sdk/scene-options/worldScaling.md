---
sidebar_position: 4
---

# `worldScaling`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), `worldScaling` affects how a Spatial Scene behaves when the user drags it horizontally after creation.
Only Spatial Scenes of type `volume` support `worldScaling`.

## Availability {#declared-in}

| Item | Value |
| --- | --- |
| Applies to | Only `volume` Spatial Scenes. |
| New scenes | Set through [`initScene`](../js-api/initScene.md). |
| Start scene | Set through the [Web App Manifest](../manifest-options/main-scene.md). |
| Default value | `"automatic"` |

## Type Signature {#type}

`"automatic" | "dynamic"`

## Examples

### Using `initScene`

```js title="Set worldScaling for a new scene" {6-7}
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    worldScaling: "dynamic",
  };
});
window.open(newSceneUrl, "newSceneName");
```

### Using the Web App Manifest

:::caution[Manifest key naming]
In a Web App Manifest, convert camelCase keys such as `worldScaling` to lowercase snake_case such as `world_scaling`.
:::

```json title="Set world_scaling for the start scene" {5-6}
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "world_scaling": "dynamic"
  }
}
```

## Default Value {#default-value}

`"automatic"`

## Accepted Values {#accepted-values}

| Value | Meaning |
| --- | --- |
| `"automatic"` | Shows a distance-based scaling effect during movement, like a real-world object. |
| `"dynamic"` | Keeps a constant size relative to the user's field of view during movement, just like the default behavior of a `window` Spatial Scene. |
