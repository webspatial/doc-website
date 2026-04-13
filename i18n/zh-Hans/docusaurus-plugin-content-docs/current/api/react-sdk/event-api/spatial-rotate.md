---
sidebar_position: 4
---

# 空间旋转（Spatial Rotate） {#spatial-rotate}

## 概述 {#summary}

表示完成了一次对空间目标的双手「选择、激活、持续」动作，起到旋转作用。无论这种交互是[通过间接的「注视 + 捏合」完成，还是通过直接触摸完成](../../../concepts/natural-interactions.md)。

## 触发条件 {#trigger-conditions}

监听了 Spatial Rotate 系列事件的[空间化 2D HTML 元素](../../../concepts/spatialized-html-elements.md)，在自身内容占据的 3D 空间位置被「捏住不放」后，会触发这套事件。

监听了 Spatial Rotate 系列事件的 [3D 容器元素](../../../concepts/3d-content-containers.md)，在自身的可交互内容占据的 3D 空间位置被「捏住不放」后，会触发这套事件。

## 心智模型 {#mental-model}

双手之间的连线（相当于一个真实物体）可以在 3D 空间中做任意角度的旋转。

## 事件类型名称 {#event-type-signature}

- `spatialrotate`
- `spatialrotateend`

## React 用法 {#react-usage}

JSX 中可用的事件属性名

- `onSpatialRotate`
- `onSpatialRotateEnd`

## 原生 DOM 用法 {#native-dom-usage}

[WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 现阶段不允许在 DOM 元素（包括来自 Ref 的）上直接监听空间事件。

## 事件生命周期 {#event-lifecycle}

「选择」过程中不触发事件，捏住不放「激活」后「保持」，会持续触发`spatialrotate`，松开后「结束」，触发 `spatialrotateend`。

## SpatialRotateEvent 事件数据 {#spatialrotateevent-payload}

### `quaternion`

值是四元数。

表示相对于初始状态的旋转量，其中包含旋转轴的信息。

## SpatialRotateEndEvent 事件数据 {#spatialrotateendevent-payload}

`spatialrotateend` 事件回调获得的 SpatialRotateEndEvent 对象没有额外属性。
