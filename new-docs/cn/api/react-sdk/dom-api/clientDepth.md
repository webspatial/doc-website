# `clientDepth`

## Summary

读取 [3D 容器元素](../../../concepts/3d-content-containers.md)当前的深度。

## Exposed On

在 [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 当前的实现中，只有 3D 容器元素的 `ref.current` 上能访问这个属性。

## Mental Model

跟 `Element.clientWidth` 一样：只读，不受 [CSS Transform](../css-api/transform.md) 影响。

## Syntax

WebSpatial API 中的 DOM 属性在标准化完成前，需要加上 `xr` 前缀并把原有的首字母改成大写，因此 `clientDepth` 的属性名要写成 `xrClientDepth`。

## Read / Write Semantics

只读。

示例：

```js
const currentDepth = ref.current.xrClientDepth;
```

## Fallback Behavior

在不支持 WebSpatial 的环境里，`clientDepth` 不存在。
