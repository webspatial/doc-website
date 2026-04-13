# `resizability`

[空间场景](../../../concepts/spatial-scenes.md)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)之一，`resizability` 会影响空间场景创建后被用户拖拽拉伸大小时的约束，可以为空间场景的宽和高分别提供最大值和最小值的约束。

## Declared In

对于 WebSpatial App 里[新创建的空间场景](../../../concepts/spatial-scenes.md#new-scenes)，初始化属性要通过 [`initScene`](../js-api/initScene.md) API 来设置。

对于[起始场景](../../../concepts/spatial-scenes.md#start-scene)，初始化属性要[通过 Web App Manifest 设置](../manifest-options/main-scene.md)。

## Type

```ts
{
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
}
```

通过 `initScene` 设置新场景的示例：

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    resizability: {
      minWidth: 100,
      minHeight: "100px",
      maxWidth: 200,
      maxHeight: 200,
    },
  };
});
window.open(newSceneUrl, "newSceneName");
```

通过 Web App Manifest 设置初始场景的示例：

> 注意：在 Web App Manifest 里，属性名建议从驼峰（比如 `minWidth`）改成全小写、下划线分隔（比如 `min_width`）。

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "resizability": {
      "min_width": 100,
      "min_height": "100px",
      "max_width": 200,
      "max_height": 200
    }
  }
}
```

## Default Value

无

## Accepted Values

- `minWidth`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
- `minHeight`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
- `maxWidth`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
- `maxHeight`: 数字（默认单位是 `px`）或字符串（带单位后缀，比如 `"100px"` 和 `"2m"`）
