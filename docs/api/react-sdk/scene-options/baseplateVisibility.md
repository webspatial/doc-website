---
sidebar_position: 6
---

# `baseplateVisibility`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md). Only Spatial Scenes of type `volume` support `baseplateVisibility`, and it affects the visibility of the baseplate under the Volume.

## Availability {#declared-in}

| Item | Value |
| --- | --- |
| Applies to | Only `volume` Spatial Scenes. |
| New scenes | Set through [`initScene`](../js-api/initScene.md). |
| Start scene | Set through the [Web App Manifest](../manifest-options/main-scene.md). |
| Default value | `"automatic"` |

## Type Signature {#type}

`"automatic" | "hidden"`

## Examples

### Using `initScene`

```js title="Set baseplateVisibility for a new scene" {6-7}
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    baseplateVisibility: "hidden",
  };
});
window.open(newSceneUrl, "newSceneName");
```

### Using the Web App Manifest

:::caution[Manifest key naming]
In a Web App Manifest, convert camelCase keys such as `baseplateVisibility` to lowercase snake_case such as `baseplate_visibility`.
:::

```json title="Set baseplate_visibility for the start scene" {5-6}
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "baseplate_visibility": "hidden"
  }
}
```

## Default Value {#default-value}

`"automatic"`

## Accepted Values {#accepted-values}

| Value | Meaning |
| --- | --- |
| `"automatic"` | The baseplate is shown when needed. |
| `"hidden"` | The baseplate is always hidden. |
