---
sidebar_position: 3
description: '处理双手缩放手势，并读取交互产生的缩放倍率。'
---

# 空间缩放（Spatial Magnify）

## 概述 {#summary}

表示完成了一次对空间目标的双手「选择、激活、持续」动作，并产生缩放效果。无论这种交互是[通过间接的「注视 + 捏合」完成，还是通过直接触摸完成](../../../concepts/natural-interactions.md)。

## 触发条件 {#trigger-conditions}

| 目标 | 触发时机 |
| --- | --- |
| [空间化 2D HTML 元素](../../../concepts/spatialized-html-elements.md) | 在自身内容占据的 3D 空间位置被「捏住不放」后触发这套事件。 |
| [3D 容器元素](../../../concepts/3d-content-containers.md) | 在自身可交互内容占据的 3D 空间位置被「捏住不放」后触发这套事件。 |

## 心智模型 {#mental-model}

双手之间的连线（相当于一个真实物体）可以在 3D 空间中做拉伸。

## 事件类型名称 {#event-type-signature}

| 阶段 | DOM 事件 |
| --- | --- |
| 缩放持续中 | `spatialmagnify` |
| 缩放结束 | `spatialmagnifyend` |

## React 用法 {#react-usage}

| 阶段 | JSX 属性 |
| --- | --- |
| 缩放持续中 | `onSpatialMagnify` |
| 缩放结束 | `onSpatialMagnifyEnd` |

## 原生 DOM 用法 {#native-dom-usage}

:::info[当前限制]
[WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 现阶段不允许在 DOM 元素（包括来自 Ref 的元素）上直接监听空间事件。
:::

## 事件生命周期 {#event-lifecycle}

「选择」过程中不触发事件；捏住不放激活后，保持动作会持续触发 `spatialmagnify`，松开后触发 `spatialmagnifyend`。

## SpatialMagnifyEvent 事件数据 {#spatialmagnifyevent-payload}

| 字段 | 取值 | 含义 |
| --- | --- | --- |
| `magnification` | 百分比风格的数字，比如 `1` 表示 100%，`1.5` 表示 150%。 | 相对于初始状态的缩放量。 |

## SpatialMagnifyEndEvent 事件数据 {#spatialmagnifyendevent-payload}

:::info[没有额外数据]
`spatialmagnifyend` 回调拿到的 `SpatialMagnifyEndEvent` 对象没有额外属性。
:::
