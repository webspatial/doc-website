# `offsetBack`

## Summary

读取一个[空间化 HTML 元素](../../../concepts/spatialized-html-elements.md)相对于空间化之前的 Z 轴位置「抬升」了多少距离。

## Exposed On

在 [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 当前的实现中，只有空间化 HTML 元素的 `ref.current` 上能访问这个属性。

## Mental Model

`offsetBack` 相当于当前空间化 HTML 元素跟父层级中最近的空间化 HTML 元素（如果没有，就选取网页本身）对应的 2D 面片之间的 Z 轴距离。因为一个空间化 HTML 元素在空间化之前一定位于这个 2D 面片上。

跟 `HTMLElement.offsetHeight` 一样：只读，不受 [CSS Transform](../css-api/transform.md) 影响。

## Syntax

WebSpatial API 中的 DOM 属性在标准化完成前，需要加上 `xr` 前缀并把原有的首字母改成大写，因此 `offsetBack` 的属性名要写成 `xrOffsetBack`。

## Read / Write Semantics

只读。

示例：

```js
const currentOffsetZ = ref.current.xrOffsetBack;
```

## Fallback Behavior

在不支持 WebSpatial 的环境里，`offsetBack` 不存在。
