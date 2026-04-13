# `convertCoordinate`

## Summary

在[不同坐标系](../../../concepts/3d-content-containers.md#2d-containing-3d)之间转换，包括：

- [空间场景容器](../../../concepts/spatial-scenes.md)的全局坐标系：基于 2D 布局系统，采用左手坐标系，原点都位于背板的左上角，Y 轴向下，Z 轴朝向用户，长度单位默认用面向 GUI 的 point 单位（`px`）
- [空间化 HTML 元素](../../../concepts/spatialized-html-elements.md)的本地坐标系：基于 2D 布局系统，采用左手坐标系，原点都位于 2D 面片的左上角，Y 轴向下，Z 轴朝向用户，长度单位默认用面向 GUI 的 point 单位（`px`）
- [3D entity](../react-components/Reality.md#3d-entity) 的本地坐标系：基于 3D 引擎系统，采用右手坐标系，原点在 3D 内容容器对应的局部 3D 空间的中心点，Y 轴朝上，Z 轴朝向用户，长度单位默认用面向现实世界物体的物理单位（`m`）

## Signature

```js
import { convertCoordinate } from "@webspatial/react-sdk";

const e2e = await convertCoordinate(position, {
  from: elementOrEntity,
  to: elementOrEntity,
});
const e2w = await convertCoordinate(position, {
  from: elementOrEntity,
  to: window,
});
const w2e = await convertCoordinate(position, {
  from: window,
  to: elementOrEntity,
});
```

## Parameters

### position

```ts
type CoordinateLike = { x: number; y: number; z: number };
```

要转换的位置点。
这个位置必须使用 `options.from` 所指定坐标系中的坐标值和默认单位来表达。

### options

- `options.from`：源坐标系。
- `options.to`：目标坐标系

## Return Shape

```ts
Promise<CoordinateLike>;
```

返回一个 Promise，resolve 后得到转换后的坐标点。
