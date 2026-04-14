---
sidebar_position: 3
description: '限制用户在场景打开后可调整的尺寸范围。'
---

# `resizability`

[空间场景](../../../concepts/spatial-scenes.md)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)之一，`resizability` 会影响空间场景创建后被用户拖拽调整大小时的约束，可以分别限制宽度和高度的最小值与最大值。

## 适用范围与设置方式 {#declared-in}

| 项目 | 内容 |
| --- | --- |
| 适用于 | 所有可调整大小的空间场景。 |
| 新场景 | 通过 [`initScene`](../js-api/initScene.md) 设置。 |
| 起始场景 | 通过 [Web App Manifest](../manifest-options/main-scene.md) 设置。 |
| 默认值 | 无 |

## 类型定义 {#type}

```ts title="resizability 类型"
{
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
}
```

## 示例

### 使用 `initScene`

```js title="通过 initScene 设置新场景的 resizability" {6-12}
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

### 使用 Web App Manifest

:::caution[Manifest 属性命名]
在 Web App Manifest 里，建议把 `minWidth` 这样的驼峰属性名改成 `min_width` 这样的全小写下划线写法。
:::

```json title="通过 Web App Manifest 设置起始场景的 resizability" {5-10}
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

## 默认值 {#default-value}

无

## 可接受的值 {#accepted-values}

| 字段 | 可接受的值 |
| --- | --- |
| `minWidth` | 数字（默认单位是 `px`）或带单位后缀的字符串，比如 `"100px"`、`"2m"`。 |
| `minHeight` | 数字（默认单位是 `px`）或带单位后缀的字符串，比如 `"100px"`、`"2m"`。 |
| `maxWidth` | 数字（默认单位是 `px`）或带单位后缀的字符串，比如 `"100px"`、`"2m"`。 |
| `maxHeight` | 数字（默认单位是 `px`）或带单位后缀的字符串，比如 `"100px"`、`"2m"`。 |
