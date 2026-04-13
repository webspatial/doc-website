---
sidebar_position: 6
---

# `baseplateVisibility`

[空间场景](../../../concepts/spatial-scenes.md)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)之一， 只有 `volume` 类型的空间场景才支持设置 `baseplateVisibility`，会影响 Volume 下方底板的可见性。

## Declared In

对于 WebSpatial App 里[新创建的空间场景](../../../concepts/spatial-scenes.md#new-scenes)，初始化属性要通过 [`initScene`](../js-api/initScene.md) API 来设置。

对于[起始场景](../../../concepts/spatial-scenes.md#start-scene)，初始化属性要[通过 Web App Manifest 设置](../manifest-options/main-scene.md)。

## Type

`"automatic" | "hidden"`

通过 `initScene` 设置新场景的示例：

```js
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

通过 Web App Manifest 设置初始场景的示例：

> 注意：在 Web App Manifest 里，属性名建议从驼峰（`baseplateVisibility`）改成全小写、下划线分隔（`baseplate_visibility`）。

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "baseplate_visibility": "hidden"
  }
}
```

## Default Value

`"automatic"`

## Accepted Values

- `"automatic"`: 底板按需显示
- `"hidden"`: 底板始终隐藏
