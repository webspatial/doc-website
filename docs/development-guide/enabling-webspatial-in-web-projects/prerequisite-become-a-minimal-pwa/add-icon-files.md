---
sidebar_position: 2
---

# Add Icon Files

The best practice for a WebSpatial project is to include at least the following icon files:

| Icon Size       | Purpose                                                                                                         | Context                                                 | Transparent Background | Rounded Corners | How to Provide                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48 × 48         | favicon.ico                                                                                                     | Browser tab bar                                         | Required               | Allowed         | [HTML `<link>`](https://github.com/joshbuchea/HEAD#icons)                                                                                                                          |
| 180 × 180       | [iOS app](https://developer.apple.com/design/human-interface-guidelines/app-icons#iOS-iPadOS-app-icon-sizes)    | "Add to Home Screen"                                    | Not allowed            | Not allowed     | [HTML `<link>`](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| 192 × 192       | Regular PWA                                                                                                     | Small icon on the home screen                           | Required               | Required        | Web App Manifest                                                                                                                                                                   |
| **512 × 512**   | Regular PWA                                                                                                     | Larger icon for splash screens, app stores, and similar | Required               | Required        | Web App Manifest                                                                                                                                                                   |
| **1024 × 1024** | [visionOS app](https://developer.apple.com/design/human-interface-guidelines/app-icons#visionOS-app-icon-sizes) | App icon in Vision Pro                                  | **Not allowed**        | **Not allowed** | WebSpatial + Web App Manifest                                                                                                                                                      |

:::tip
Ready-to-use sample icons (you can use this directly in your demo): [webspatial-icon-examples.zip](/assets/guide/webspatial-icon-examples.zip)
:::

In addition to the standard PWA requirements, a [**Packaged WebSpatial App**](../../../core-concepts/unique-concepts-in-webspatial#webspatial-sdk) has extra icon rules:

Because the minimum icon size for a visionOS app is 1024 × 1024 and the system automatically crops icons into a circle, your site must supply a PWA-standard icon with **a minimum size of 1024 × 1024** and of type **`maskable`** (no transparent background or rounded corners) before it can be published to the visionOS App Store.

:::tip
Other PWA icons (such as the 512 × 512 and 192 × 192 versions) are typically type `"any"` and may include rounded corners and transparency, because not every platform performs automatic cropping.
:::

At the very minimum, to run as a standalone app on desktop and visionOS, you need to provide two icon sizes:

- **512×512** (`"any"` type)
- **1024×1024** (`"maskable"` type)

In the [Web App Manifest](./add-web-app-manifest), these two icons are configured like this:

```json5
  "icons": [
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-1024-maskable.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
```
