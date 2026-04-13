---
sidebar_position: 5
---

# `worldAlignment`

[空间场景](../../../concepts/spatial-scenes.md)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)之一，`worldAlignment` 会影响空间场景创建后被用户拖拽在垂直方向上移动位置时的行为。

只有 `volume` 类型的空间场景才支持设置 `worldAlignment`。

## 声明位置 {#declared-in}

对于 WebSpatial App 里[新创建的空间场景](../../../concepts/spatial-scenes.md#new-scenes)，初始化属性要通过 [`initScene`](../js-api/initScene.md) API 来设置。

对于[起始场景](../../../concepts/spatial-scenes.md#start-scene)，初始化属性要[通过 Web App Manifest 设置](../manifest-options/main-scene.md)。

## 类型 {#type}

`"automatic" | "gravityAligned"`

通过 `initScene` 设置新场景的示例：

```js
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

通过 Web App Manifest 设置初始场景的示例：

> 注意：在 Web App Manifest 里，属性名建议从驼峰（`worldAlignment`）改成全小写、下划线分隔（`world_alignment`）。

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "world_alignment": "gravityAligned"
  }
}
```

## 默认值 {#default-value}

`"automatic"`

## 可接受的值 {#accepted-values}

- `"automatic"`: 在上下移动过程中会自动倾斜保持始终面朝用户
- `"gravityAligned"`: 在上下移动过程中不自动倾斜，始终对齐重力方向，跟现实世界中的物体一样
