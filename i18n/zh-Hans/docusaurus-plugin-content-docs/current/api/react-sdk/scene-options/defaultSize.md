---
sidebar_position: 2
---

# `defaultSize`

[空间场景](../../../concepts/spatial-scenes.md)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)之一，`defaultSize` 会影响空间场景刚创建完成时的大小（不一定完全等同于 `defaultSize` 中的设置，因为要优先遵循操作系统的[空间计算](../../../concepts/spatial-computing.md)逻辑）。

对于 `window` 类型的空间场景，只能设置 `width` 和 `height`。

对于 `volume` 类型的空间场景，除了 `width` 和 `height`，还能设置 `depth`。

## Declared In

对于 WebSpatial App 里[新创建的空间场景](../../../concepts/spatial-scenes.md#new-scenes)，初始化属性要通过 [`initScene`](../js-api/initScene.md) API 来设置。

对于[起始场景](../../../concepts/spatial-scenes.md#start-scene)，初始化属性要[通过 Web App Manifest 设置](../manifest-options/main-scene.md)。

## Type

```ts
{
  width?: number | string
  height?: number | string
  depth?: number | string
}
```

通过 `initScene` 设置新场景的示例：

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    defaultSize: {
      width: 500,
      height: "1000px",
      depth: "1m",
    },
  };
});
window.open(newSceneUrl, "newSceneName");
```

通过 Web App Manifest 设置初始场景的示例：

> 注意：在 Web App Manifest 里，属性名建议从驼峰（`defaultSize`）改成全小写、下划线分隔（`default_size`）。

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "default_size": {
      "width": 500,
      "height": "1000px"
    }
  }
}
```

## Default Value

无

## Accepted Values

- `width`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
- `height`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
- `depth`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
