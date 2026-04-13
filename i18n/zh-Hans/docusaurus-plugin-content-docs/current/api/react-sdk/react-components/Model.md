---
sidebar_position: 2
---

# `<Model>`

`<Model>` 组件实现了 WebSpatial API 中的[静态 3D 内容容器元素](../../../concepts/3d-content-containers.md)，这种元素兼容 Web 标准中的 `<model>` 元素的 API，同时对 web 标准中的能力做了增强，不仅让元素对应的 2D 面片具备了[空间化 HTML 元素的能力](../../../concepts/spatialized-html-elements.md)，也让 3D 模型能在这个 2D 面片前方的空间中渲染出有真实体积的 3D 内容。

:::info[标准 model element 的行为]
Web 标准中的 model element 原本只能让 3D 模型在这个元素的「画布」上渲染，这个画布看上去像一个洞口，3D 内容在洞口的「内部」或「后方」显示。可参考 [WebKit 的文档](https://webkit.org/blog/17118/a-step-into-the-spatial-web-the-html-model-element-in-apple-vision-pro/) 和 [demo](https://webkit.org/demos/model-demos/index.html)。
:::

要启用这种增强，需要在 `<Model>` 上添加[空间化 HTML 元素的标记（`enable-xr`）](./jsx-marker.md#enable-xr)：

```jsx
import { Model } from "@webspatial/react-sdk";

function Example() {
  return (
    <Model
      enable-xr
      src="/modelasset/vehicle.usdz"
      style={{ height: "200px", "--xr-depth": "100px" }}
    />
  );
}
```

## 回退行为 {#fallback}

如果没有添加 `enable-xr` 标记，或当前运行环境中没有 [WebSpatial Runtime](../../../concepts/webspatial-app.md#webspatial-runtime)， `<Model>` 组件会自动降级成 web 标准中的 `<model>` 元素，由浏览器引擎负责渲染（当前平台上的浏览器引擎可能还不支持这个新标准，可以用 `typeof HTMLModelElement !== "undefined"` 做特性检测）。

WebSpatial SDK 当前版本中，`<Model>` 支持以下 model element 的 API：

## 属性 {#attributes}

`src`

要嵌入的 3D 模型的 URL。

## 生命周期事件 {#lifecycle-events}

`onLoad`

当 3D 模型成功加载，并且已可用于显示时触发。

`onError`

当模型加载失败时触发。

## JavaScript API {#javascript-api}

`currentSrc`

只读字符串，返回当前已加载资源的 URL。

`ready`

当模型的源文件已完成加载和处理时，这个 Promise 会 resolve。
如果源文件无法被获取，或者文件无法被解析为有效的 3D 模型资源，这个 Promise 会 reject。

`entityTransform`

一个可读可写的 DOMMatrixReadOnly，可以表示 [3D 模型和 3D 内容容器内部空间之间的关系](https://github.com/immersive-web/model-element/blob/main/explainer.md#visual-presentation-control)。

在默认状态下，3D 模型会在保持原有比例的前提下，尽可能撑满 `<Model>` 的宽或高，因此可以通过控制 `<Model>` 对应的 2D 面片的尺寸来控制 3D 模型的大小。
