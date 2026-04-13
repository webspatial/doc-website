# `worldScaling`

[空间场景](../../../concepts/spatial-scenes.md)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)之一，`worldScaling` 会影响空间场景创建后被用户拖拽在水平方向上移动位置时的行为。

只有 `volume` 类型的空间场景才支持设置 `worldScaling`。

## Declared In

对于 WebSpatial App 里[新创建的空间场景](../../../concepts/spatial-scenes.md#new-scenes)，初始化属性要通过 [`initScene`](../js-api/initScene.md) API 来设置。

对于[起始场景](../../../concepts/spatial-scenes.md#start-scene)，初始化属性要[通过 Web App Manifest 设置](../manifest-options/main-scene.md)。

## Type

`"automatic" | "dynamic"`

通过 `initScene` 设置新场景的示例：

```js
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

通过 Web App Manifest 设置初始场景的示例：

> 注意：在 Web App Manifest 里，属性名建议从驼峰（`worldScaling`）改成全小写、下划线分隔（`world_scaling`）。

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "world_scaling": "dynamic"
  }
}
```

## Default Value

`"automatic"`

## Accepted Values

- `"automatic"`: 在移动过程中会有近大远小的效果，类似现实世界中的物体
- `"dynamic"`: 在移动过程中始终相对于用户视野区域保持大小不变，跟 `window` 类型空间场景的默认行为一样
