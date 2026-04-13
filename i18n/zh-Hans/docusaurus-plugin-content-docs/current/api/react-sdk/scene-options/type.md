---
sidebar_position: 1
---

# `type`

在 [空间场景](../../../concepts/spatial-scenes.md)的[初始化环节](../../../concepts/spatial-scenes.md#scene-initialization)，可以设置[场景类型](../../../concepts/spatial-scenes.md#scene-type)。

## 声明位置 {#declared-in}

对于 WebSpatial App 里[新创建的空间场景](../../../concepts/spatial-scenes.md#new-scenes)，场景类型要通过 [`initScene`](../js-api/initScene.md) API 来设置。

对于[起始场景](../../../concepts/spatial-scenes.md#start-scene)，场景类型要[通过 Web App Manifest 设置](../manifest-options/main-scene.md)。

## 类型 {#type-1}

`"window" | "volume"`

通过 `initScene` 设置新场景的示例：

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
  };
});
window.open(newSceneUrl, "newSceneName");
```

通过 Web App Manifest 设置初始场景的示例：

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume"
  }
}
```

## 默认值 {#default-value}

`"window"`

## 可接受的值 {#accepted-values}

- `"window"`: 优先服务于 [GUI 需求](../../../concepts/spatial-scenes.md#scene-type)
- `"volume"`: 模拟现实世界中的[真实物体](../../../concepts/spatial-scenes.md#scene-type)
