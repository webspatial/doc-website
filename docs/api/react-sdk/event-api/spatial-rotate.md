---
sidebar_position: 4
---

# Spatial Rotate

## Summary {#summary}

Represents a completed two-handed "select, activate, and hold" action on a target in space that produces rotation, whether the interaction is [performed through indirect "gaze + pinch" or direct touch](../../../concepts/natural-interactions.md).

## Trigger Conditions {#trigger-conditions}

| Target | Triggered when |
| --- | --- |
| [Spatialized 2D HTML element](../../../concepts/spatialized-html-elements.md) | After the 3D spatial position occupied by its own content is pinched and held. |
| [3D container element](../../../concepts/3d-content-containers.md) | After the 3D spatial position occupied by its own interactive content is pinched and held. |

## Mental Model {#mental-model}

The line between the two hands, effectively like a real object, can rotate at arbitrary angles in 3D space.

## Event Type Signature {#event-type-signature}

| Stage | DOM event |
| --- | --- |
| Rotating | `spatialrotate` |
| Rotate end | `spatialrotateend` |

## React Usage {#react-usage}

| Stage | JSX prop |
| --- | --- |
| Rotating | `onSpatialRotate` |
| Rotate end | `onSpatialRotateEnd` |

## Native DOM Usage {#native-dom-usage}

:::info[Current limitation]
At the current stage, the [WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) does not allow listening to spatial events directly on DOM elements, including those obtained from refs.
:::

## Event Lifecycle {#event-lifecycle}

No event is triggered during the "selection" phase. After pinch-and-hold activates, `spatialrotate` is triggered continuously while the hold continues. Releasing ends the action and triggers `spatialrotateend`.

## SpatialRotateEvent Payload {#spatialrotateevent-payload}

| Field | Value | Meaning |
| --- | --- | --- |
| `quaternion` | A quaternion. | The amount of rotation relative to the initial state, including the rotation axis. |

## SpatialRotateEndEvent Payload {#spatialrotateendevent-payload}

:::info[No extra payload]
The `SpatialRotateEndEvent` object passed to the `spatialrotateend` callback has no extra properties.
:::
