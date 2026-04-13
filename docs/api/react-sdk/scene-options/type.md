---
sidebar_position: 1
---

# `type`

During the [initialization phase](../../../concepts/spatial-scenes.md#scene-initialization) of a [Spatial Scene](../../../concepts/spatial-scenes.md), you can set the [scene type](../../../concepts/spatial-scenes.md#scene-type).

## Availability {#declared-in}

| Item | Value |
| --- | --- |
| Applies to | All Spatial Scenes. |
| New scenes | Set through [`initScene`](../js-api/initScene.md) before calling `window.open(...)`. |
| Start scene | Set through the [Web App Manifest](../manifest-options/main-scene.md). |
| Default value | `"window"` |

## Type Signature {#type}

`"window" | "volume"`

## Examples

### Using `initScene`

```js title="Set the type for a new scene" {6}
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
  };
});
window.open(newSceneUrl, "newSceneName");
```

### Using the Web App Manifest

```json title="Set the type for the start scene" {5}
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume"
  }
}
```

## Default Value {#default-value}

`"window"`

## Accepted Values {#accepted-values}

| Value | Meaning |
| --- | --- |
| `"window"` | Primarily serves [GUI needs](../../../concepts/spatial-scenes.md#scene-type). |
| `"volume"` | Simulates a [real-world object](../../../concepts/spatial-scenes.md#scene-type). |
