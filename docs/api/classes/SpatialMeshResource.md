[**@webspatial/core-sdk**](../README.md)

***

[@webspatial/core-sdk](../globals.md) / SpatialMeshResource

# Class: SpatialMeshResource

Defined in: [resource/SpatialMeshResource.ts:6](https://github.com/webspatial/webspatial-sdk/blob/4b99b8c118df67a102dd2d333c40fa2b5e426143/core/src/core/resource/SpatialMeshResource.ts#L6)

Mesh asset containing geometry

## Extends

- `SpatialObject`

## Properties

### name

> **name**: `string` = `''`

Defined in: [SpatialObject.ts:23](https://github.com/webspatial/webspatial-sdk/blob/4b99b8c118df67a102dd2d333c40fa2b5e426143/core/src/core/SpatialObject.ts#L23)

#### Inherited from

`SpatialObject.name`

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: [SpatialObject.ts:18](https://github.com/webspatial/webspatial-sdk/blob/4b99b8c118df67a102dd2d333c40fa2b5e426143/core/src/core/SpatialObject.ts#L18)

Marks resource to be released (it should no longer be used)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`SpatialObject.destroy`

***

### onDestroy()

> `protected` **onDestroy**(): `Promise`\<`void`\>

Defined in: [SpatialObject.ts:25](https://github.com/webspatial/webspatial-sdk/blob/4b99b8c118df67a102dd2d333c40fa2b5e426143/core/src/core/SpatialObject.ts#L25)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`SpatialObject.onDestroy`
