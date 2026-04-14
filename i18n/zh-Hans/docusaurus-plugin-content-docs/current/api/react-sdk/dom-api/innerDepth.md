---
sidebar_position: 4
description: '通过 DOM 接口读取 volume 类型空间场景当前的深度。'
---

# `innerDepth`

## 概述 {#summary}

读取 [Volume 类型空间场景容器](../../../concepts/spatial-scenes.md)的深度/厚度。

## 可用对象 {#exposed-on}

`window` 对象上可以访问这个属性。

## 心智模型 {#mental-model}

跟 `window.innerHeight` 一样：只读，不含网页之外窗口原生 UI 的高度。

## 语法 {#syntax}

:::caution[标准化完成前的临时 DOM 命名]
WebSpatial API 中的 DOM 属性在标准化完成前，需要加上 `xr` 前缀并把原有的首字母改成大写，因此 `innerDepth` 的属性名要写成 `xrInnerDepth`。
:::

## 读写语义 {#read--write-semantics}

只读。

示例：

```js
const currentVolumeDepth = window.xrInnerDepth;
```

## 回退行为 {#fallback-behavior}

在不支持 WebSpatial 的环境里，`innerDepth` 不存在。
