---
sidebar_position: 5
---

# `worldAlignment`

One of the [initialization properties](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), `worldAlignment` affects how a Spatial Scene behaves when the user drags it vertically after creation.
Only Spatial Scenes of type `volume` support `worldAlignment`.

## Availability {#declared-in}

| Item | Value |
| --- | --- |
| Applies to | Only `volume` Spatial Scenes. |
| New scenes | Set through [`initScene`](../js-api/initScene.md). |
| Start scene | Set through the [Web App Manifest](../manifest-options/main-scene.md). |
| Default value | `"automatic"` |

## Type Signature {#type}

`"automatic" | "gravityAligned"`

## Examples

### Using `initScene`

```js title="Set worldAlignment for a new scene" {6-7}
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    worldAlignment: "gravityAligned",
  };
});
window.open(newSceneUrl, "newSceneName");
```

### Using the Web App Manifest

:::caution[Manifest key naming]
In a Web App Manifest, convert camelCase keys such as `worldAlignment` to lowercase snake_case such as `world_alignment`.
:::

```json title="Set world_alignment for the start scene" {5-6}
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "world_alignment": "gravityAligned"
  }
}
```

## Default Value {#default-value}

`"automatic"`

## Accepted Values {#accepted-values}

| Value | Meaning |
| --- | --- |
| `"automatic"` | Tilts automatically during vertical movement so it always faces the user. |
| `"gravityAligned"` | Does not tilt automatically during vertical movement and always stays aligned with gravity like a real-world object. |
