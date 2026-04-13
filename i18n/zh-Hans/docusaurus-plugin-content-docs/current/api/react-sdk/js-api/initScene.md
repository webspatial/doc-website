---
sidebar_position: 1
---

# `initScene`

## 概述 {#summary}

在[创建一个新的空间场景容器](../../../concepts/spatial-scenes.md#new-scenes)之前，对这个 Spatial Scene 的[初始化属性](../../../concepts/spatial-scenes.md#scene-initialization)做自定义设置。

## 调用形式 {#signature}

```js
import { initScene } from "@webspatial/react-sdk";

initScene("newSceneName", defaultConfig => {
  return {
    ...defaultConfig,
    type: "volume",
    defaultSize: {
      width: "1m",
      height: "100px",
      depth: "100px",
    },
  };
});
window.open(newSceneUrl, "newSceneName");
```

## 参数 {#parameters}

### sceneName

要初始化的 Spatial Scene 的名称（等价于打开链接的新窗口的 name）。

如果在这个 name 对应的 Spatial Scene 已打开的情况下执行 `initScene`，只会影响这个 Spatial Scene 关闭后下次再用相同 name 创建新 Spatial Scene 时的初始化属性。

如果对于同一个 name 多次调用 `initScene`，会反复修改这个 name 对应的自定义初始化属性。

### configure

一个回调函数，参数（`defaultConfig`）是这个 name 对应的自定义初始化属性的最新状态，并返回新的自定义初始化属性。

如果是第一次对这个 name 执行 `initScene`，参数（`defaultConfig`）是默认的初始化属性。

## 返回结构 {#return-shape}

不返回任何值。
