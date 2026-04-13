---
sidebar_position: 2
---

# 空间拖拽（Spatial Drag）

## 概述 {#summary}

表示完成了一次对空间目标的单手「选择、激活、持续」动作，无论这种交互[是通过间接的「注视 + 捏合」完成，还是通过直接触摸完成](../../../concepts/natural-interactions.md)。

## 触发条件 {#trigger-conditions}

| 目标 | 触发时机 |
| --- | --- |
| [空间化 2D HTML 元素](../../../concepts/spatialized-html-elements.md) | 在自身内容占据的 3D 空间位置被「捏住不放」后触发这套事件。 |
| [3D 容器元素](../../../concepts/3d-content-containers.md) | 在自身可交互内容占据的 3D 空间位置被「捏住不放」后触发这套事件。 |

## 心智模型 {#mental-model}

可以在 3D 空间中的任意方向上拖拽，并把目标放到空间中的任意位置。

## 事件类型名称 {#event-type-signature}

| 阶段 | DOM 事件 |
| --- | --- |
| 拖拽开始 | `spatialdragstart` |
| 拖拽持续中 | `spatialdrag` |
| 拖拽结束 | `spatialdragend` |

## React 用法 {#react-usage}

| 阶段 | JSX 属性 |
| --- | --- |
| 拖拽开始 | `onSpatialDragStart` |
| 拖拽持续中 | `onSpatialDrag` |
| 拖拽结束 | `onSpatialDragEnd` |

## 原生 DOM 用法 {#native-dom-usage}

:::info[当前限制]
[WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 现阶段不允许在 DOM 元素（包括来自 Ref 的元素）上直接监听空间事件。
:::

## 事件生命周期 {#event-lifecycle}

「选择」过程中不触发事件；捏住不放刚开始会触发 `spatialdragstart`，激活后保持会持续触发 `spatialdrag`，松开后触发 `spatialdragend`。

## SpatialDragStartEvent 事件数据 {#spatialdragstartevent-payload}

| 字段 | 单位 | 含义 | 坐标系 |
| --- | --- | --- | --- |
| `offsetX`, `offsetY`, `offsetZ` | `px` | 激活位置的 X、Y、Z 坐标。 | 触发事件的[空间化 2D HTML 元素](../../../concepts/spatialized-html-elements.md)（包括 3D 容器元素）对应的[本地坐标系](../js-api/convertCoordinate.md)，采用左手坐标系，原点位于元素对应 2D 面片的左上角，Y 轴向下，Z 轴朝向用户。 |
| `clientX`, `clientY`, `clientZ` | `px` | 激活位置的 X、Y、Z 坐标。 | 当前[空间场景容器](../../../concepts/spatial-scenes.md)对应的[全局坐标系](../js-api/convertCoordinate.md)，采用左手坐标系，原点位于空间场景背板的左上角，Y 轴向下，Z 轴朝向用户。 |

## SpatialDragEvent 事件数据 {#spatialdragevent-payload}

| 字段 | 单位 | 含义 |
| --- | --- | --- |
| `translationX`, `translationY`, `translationZ` | `px` | 相对于拖拽起点的偏移量。 |

## SpatialDragEndEvent 事件数据 {#spatialdragendevent-payload}

:::info[没有额外数据]
`spatialdragend` 回调拿到的 `SpatialDragEndEvent` 对象没有额外属性。
:::
