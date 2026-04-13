---
sidebar_position: 1
---

# `type`

在[空间场景](../../../concepts/spatial-scenes.md)的[初始化环节](../../../concepts/spatial-scenes.md#scene-initialization)，可以设置[场景类型](../../../concepts/spatial-scenes.md#scene-type)。

## 适用范围与设置方式 {#declared-in}

| 项目 | 内容 |
| --- | --- |
| 适用于 | 所有空间场景。 |
| 新场景 | 在调用 [`initScene`](../js-api/initScene.md) 后、执行 `window.open(...)` 前设置。 |
| 起始场景 | 通过 [Web App Manifest](../manifest-options/main-scene.md) 设置。 |
| 默认值 | `"window"` |

## 类型定义 {#type-1}

`"window" | "volume"`

## 示例

### 使用 `initScene`

```js title="通过 initScene 设置新场景的类型" {6}
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
  };
});
window.open(newSceneUrl, "newSceneName");
```

### 使用 Web App Manifest

```json title="通过 Web App Manifest 设置起始场景的类型" {5}
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

| 取值 | 含义 |
| --- | --- |
| `"window"` | 优先服务于 [GUI 需求](../../../concepts/spatial-scenes.md#scene-type)。 |
| `"volume"` | 模拟现实世界中的[真实物体](../../../concepts/spatial-scenes.md#scene-type)。 |
