# Function: notifyUpdateStandInstanceLayout()

> **notifyUpdateStandInstanceLayout**(): `void`

Defined in: doc-website/XRSDK/react/src/spatial-react-components/notifyUpdateStandInstanceLayout.ts:12

External-developers can call this function to sync the standardInstance layout to PortalInstance.

Currently: notifyUpdateStandInstanceLayout is called when the document head changed
or when the monitored div changed (in both cases spatialDiv's layout may be changed, so we need to update the layout)

## Returns

`void`
