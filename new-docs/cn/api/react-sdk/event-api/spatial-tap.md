# Spatial Tap

## Summary

表示完成了一次对空间目标的单手「选择、激活」动作，无论这种交互是[通过间接的「注视 + 捏合」完成，还是通过直接触摸完成](../../../concepts/natural-interactions.md)。

## Trigger Conditions

监听了 Spatial Tap 事件的[空间化 2D HTML 元素](../../../concepts/spatialized-html-elements.md)，在自身内容占据的 3D 空间位置被点击后，会触发这个事件。

监听了 Spatial Tap 事件的 [3D 容器元素](../../../concepts/3d-content-containers.md)，在自身的可交互内容占据的 3D 空间位置被点击后，会触发这个事件

## Mental Model

可以把 Spatial Tap 理解为「3D 空间中的 click 事件」。

## Event Type Signature

事件类型名称：`spatialtap`

## React Usage

JSX 中可用的事件属性名：`onSpatialTap`

## Native DOM Usage

[WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 现阶段不允许在 DOM 元素（包括来自 Ref 的）上直接监听空间事件。

## Event Lifecycle

「选择」过程中不触发事件，捏住立刻放开，触发 `spatialtap`。

## SpatialTapEvent Payload

### `offsetX`, `offsetY`, `offsetZ`

值是以 `px` 为单位的浮点数。

代表点击位置的 X、Y、Z 坐标。

坐标系：触发事件的[空间化 2D HTML 元素](../../../concepts/spatialized-html-elements.md)（包括 3D 容器元素）对应的[本地坐标系](../js-api/convertCoordinate.md)，采用左手坐标系，原点都位于元素对应的 2D 面片的左上角，Y 轴向下，Z 轴朝向用户。

### `clientX`, `clientY`, `clientZ`

值是以 `px` 为单位的浮点数。

代表点击位置的 X、Y、Z 坐标。

坐标系：当前[空间场景容器](../../../concepts/spatial-scenes.md)对应的[全局坐标系](../js-api/convertCoordinate.md)，采用左手坐标系，原点都位于空间场景的背板的左上角，Y 轴向下，Z 轴朝向用户。
