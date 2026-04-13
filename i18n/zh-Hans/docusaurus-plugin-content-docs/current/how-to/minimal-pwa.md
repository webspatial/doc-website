---
sidebar_position: 1
---

# 如何满足最低 PWA 要求 {#how-to-meet-the-minimum-pwa-requirements}

## 检查清单

| 要求 | 为什么重要 |
| --- | --- |
| 通过 HTTPS 提供这个 Web App。 | 可安装的 PWA 必须运行在安全来源上。 |
| 让应用中的每个页面都暴露 [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)。 | Manifest 负责定义应用级身份信息和启动行为。 |
| 提供 WebSpatial Runtime 所需的最小 manifest 字段。 | Runtime 需要应用身份、图标资源和起始场景设置。 |

## 添加 manifest 链接

```html title="在每个 HTML 文档中添加 manifest 链接" {1}
<link rel="manifest" href="/app.webmanifest" />
```

这个 manifest 的 URL 应该返回 [JSON MIME 类型](https://mimesniff.spec.whatwg.org/#json-mime-type)的响应，比如 `application/manifest+json`。

:::info[延伸阅读]
可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) 和 [web.dev](https://web.dev/learn/pwa/web-app-manifest/) 了解更多关于可安装 PWA 的要求。
:::

## 提供最低限度的 manifest 字段

| 字段 | 作用 | 备注 |
| --- | --- | --- |
| [`name`](https://developer.mozilla.org/en-US/docs/Web/Manifest/name) 或 [`short_name`](https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name) | 提供应用名称。 | 至少要存在其中一个字段。 |
| [`icons`](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons) | 提供应用图标。 | 至少包含一个 `"purpose": "any"` 图标，以及一个尺寸不小于 `1024×1024`、没有透明背景和圆角的 `"purpose": "maskable"` 图标。 |
| [`start_url`](https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url) | 配置起始场景对应的网址。 | 它决定应用启动后首先加载哪个页面。 |
| [`display`](https://developer.mozilla.org/en-US/docs/Web/Manifest/display) | 配置网页窗口的显示模式。 | WebSpatial Runtime 当前只支持 `"standalone"` 和 `"minimal-ui"`。 |


```json title="满足 WebSpatial 要求的最小 manifest" {2-5,7-16}
{
  "name": "My Awesome App",
  "start_url": "/",
  "display": "minimal-ui",
  "icons": [
    {
      "src": "/pwa-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-1024x1024.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

## Web App 的推荐图标 {#recommended-icons-for-web-apps}

:::tip[示例文件]
[webspatial-icon-examples.zip](https://webspatial.dev/assets/guide/webspatial-icon-examples.zip) 中已经包含满足下列要求的示例图标。
:::

| 尺寸 | 用途 | 出现场景 | 允许透明背景 | 允许圆角 | 提供方式 |
| --- | --- | --- | --- | --- | --- |
| 48 × 48 | favicon.ico | 浏览器标签栏 | 必须 | 允许 | [HTML `<link>`](https://github.com/joshbuchea/HEAD#icons) |
| 180 × 180 | [iOS 应用图标](https://developer.apple.com/design/human-interface-guidelines/app-icons#iOS-iPadOS-app-icon-sizes) | iOS“添加到主屏幕” | 不允许 | 不允许 | [HTML `<link>`](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| 192 × 192 | 标准 PWA 图标 | 主屏幕的小图标 | 必须 | 必须 | Web App Manifest |
| **512 × 512** | 标准 PWA 图标 | 各类启动页、应用市场等 | 必须 | 必须 | Web App Manifest |
| **1024 × 1024** | 空间应用图标 | [visionOS](https://developer.apple.com/design/human-interface-guidelines/app-icons#visionOS-app-icon-sizes), PICO OS 6 | **不允许** | **不允许** | Web App Manifest |
