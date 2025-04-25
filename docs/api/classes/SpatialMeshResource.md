# Class: SpatialMeshResource

Defined in: [resource/SpatialMeshResource.ts:6](https://github.com/webspatial/webspatial-sdk/blob/61c10fdd1eb0797e7a65f18c05fc06e8b1381245/core/src/core/resource/SpatialMeshResource.ts#L6)

Mesh asset containing geometry

## Extends

- `SpatialObject`

## Properties

### name

> **name**: `string` = `''`

Defined in: [SpatialObject.ts:23](https://github.com/webspatial/webspatial-sdk/blob/61c10fdd1eb0797e7a65f18c05fc06e8b1381245/core/src/core/SpatialObject.ts#L23)

#### Inherited from

`SpatialObject.name`

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: [SpatialObject.ts:18](https://github.com/webspatial/webspatial-sdk/blob/61c10fdd1eb0797e7a65f18c05fc06e8b1381245/core/src/core/SpatialObject.ts#L18)

Marks resource to be released (it should no longer be used)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`SpatialObject.destroy`

***

### onDestroy()

> `protected` **onDestroy**(): `Promise`\<`void`\>

Defined in: [SpatialObject.ts:25](https://github.com/webspatial/webspatial-sdk/blob/61c10fdd1eb0797e7a65f18c05fc06e8b1381245/core/src/core/SpatialObject.ts#L25)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`SpatialObject.onDestroy`
