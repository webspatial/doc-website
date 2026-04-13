---
sidebar_position: 1
---

# `main_scene`

在 [WebSpatial App](../../../concepts/webspatial-app.md) 的 [Web App Manifest](../../../concepts/webspatial-app.md#web-app) 中，可以用这个新字段设置[起始场景](../../../concepts/spatial-scenes.md#start-scene)的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)。

:::caution[标准化完成前的临时 Manifest 键名]
WebSpatial API 在 Web App Manifest 标准中扩展出的新属性，在标准化完成前，使用时需要加上 `xr_` 前缀，因此 `main_scene` 的属性名要写成 `xr_main_scene`。
:::

支持以下初始化属性：

- [`type`](../scene-options/type.md)
- [`default_size`](../scene-options/defaultSize.md)
- [`resizability`](../scene-options/resizability.md)
- [`world_scaling`](../scene-options/worldScaling.md)
- [`world_alignment`](../scene-options/worldAlignment.md)
- [`baseplate_visibility`](../scene-options/baseplateVisibility.md)

## 结构定义 {#schema}

```ts
{
  type?: "volume" | "window"
  default_size?: {
    width?: number | string
    height?: number | string
    depth?: number | string
  }
  resizability?: {
    min_width?: number | string
    max_width?: number | string
    min_height?: number | string
    max_height?: number | string
  }
  world_scaling?: "automatic" | "dynamic"
  world_alignment?: "automatic" | "gravityAligned"
  baseplate_visibility?: "automatic" | "hidden"
}
```

示例：

```json
{
  "name": "example app",
  "start_url": "/",
  "xr_main_scene": {
    "type": "volume",
    "default_size": {
      "width": 100,
      "height": 100,
      "depth": "1m"
    },
    "resizability": {
      "min_width": 50,
      "max_width": 500,
      "min_height": 50,
      "max_height": 500
    },
    "world_scaling": "dynamic",
    "world_alignment": "gravityAligned",
    "baseplate_visibility": "hidden"
  }
}
```
