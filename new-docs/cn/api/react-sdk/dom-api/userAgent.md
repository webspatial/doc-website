# `userAgent`

## Summary

获取当前设备、操作系统和运行环境的信息，包括 [Web Runtime](../../../concepts/webspatial-app.md#web-runtime) 和 [WebSpatial Runtime](../../../concepts/webspatial-app.md#webspatial-runtime) 的信息。

## Exposed On

`Navigator` 对象上可以访问这个属性。

## Mental Model

如果从 User Agent 字符串中能匹配到 `/WebSpatial\/(\S+)/`，说明当前运行环境有 WebSpatial Runtime，版本号是这个 Runtime 能全面支持的 [React SDK](../../../introduction/getting-started.md#installation) 的 npm 包版本。

如果从 User Agent 字符串中能匹配到 `/\sVR\s/`，说明当前运行环境支持 WebXR。

如果从 User Agent 字符串中能匹配到 `\swv\)`，说明当前运行环境的 Web Runtime 是 WebView。

如果从 User Agent 字符串中能匹配到 `/WSAppShell\/(\S+)/`，说明当前运行环境是自带 WebSpatial Runtime 的 [Packaged WebSpatial App](../../../concepts/webspatial-app.md#packaged-webspatial-app)。如果还能匹配到 `"Macintosh"`，说明是 visionOS 环境。

如果从 User Agent 字符串中能匹配到 `/PicoWebApp\/(\S+)/`，说明当前运行环境是 [PICO OS 6 的 Web App Runtime](https://developer.picoxr.com/document/web/web-platform/)。

## Read / Write Semantics

只读。

示例：

```js
const ua = navigator.userAgent.toString();
```

## Fallback Behavior

在不支持 WebSpatial（没有 WebSpatial Runtime）的环境里，User Agent 字符串里不存在 `WebSpatial` 字段。
