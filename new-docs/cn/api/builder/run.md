# `webspatial-builder run`

用于在模拟器中预览 [Packaged WebSpatial App](../../concepts/webspatial-app.md#packaged-webspatial-app) 的效果。

会自动打包、调起模拟器、推送安装包到模拟器里、自动安装和启动。

## When to Use

要在不包含 [WebSpatial Runtime](../../concepts/webspatial-app.md#webspatial-runtime) 的[空间计算](../../concepts/spatial-computing.md)平台（比如 visionOS）上运行 [WebSpatial App](../../concepts/webspatial-app.md)。

只需要[在模拟器里预览效果](../../introduction/getting-started.md#preview)，不需要在真实设备上使用。

## When Not to Use

要在内置了 [WebSpatial Runtime](../../concepts/webspatial-app.md#webspatial-runtime) 、支持直接用 URL 运行 [WebSpatial App](../../concepts/webspatial-app.md) 的[空间计算](../../concepts/spatial-computing.md)平台上运行（比如 [PICO OS 6](https://developer.picoxr.com/document/web/web-app/)）。

要[在真实设备上测试](./build.md)，或[对外大量分发应用](./publish.md)。

## Syntax

`webspatial-builder run`

`webspatial-builder run [--base=<base url>] [--manifest=<local path>] [--manifest-url=<url>] [--project=<dist>]`

## Options

### `--base`

为当前 [Web App](../../concepts/webspatial-app.md#web-app) 的起始网址（[`start_url`](https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url)）指定 base URL。默认值是 `""`。

如果 WebSpatial Builder 不知道当前 Web App 的 `start_url` 是什么，`--base` 的值会被直接作为 `start_url`。

如果 WebSpatial Builder 获取到的当前 Web App 的 `start_url` 是[相对地址，缺少域名部分](#--manifest)，可以通过 `--base` 提供域名，补全 URL。

如果 `start_url` 完整可用，WebSpatial Builder 打包出的 Packaged App 在运行过程中会从线上加载 HTML/CSS/JS 等 Web 文件。

如果缺少完整 `start_url`，WebSpatial Builder 会自动把[网站构建产物](../../concepts/webspatial-app.md#web-build-tool)打包进原生应用安装包里，运行过程中从应用包的本地文件中离线获取网站文件。

> 在开发调试阶段，这种离线打包模式会导致每次有代码修改都需要重新运行 Builder，等待打包和安装完成，效率较低，建议在开发调试阶段始终提供 `--base` 参数。

如果 WebSpatial Builder 已经获取到的当前 Web App 的完整 `start_url`，可以用 `--base` 修改 `start_url` 的 base 部分。

### `--manifest`

让 WebSpatial Builder 知道从当前项目的什么路径获取 Web App Manifest 文件。默认会从 `public/manifest.webmanifest` 或 `public/manifest.json` 获取。

在执行 `run` 命令时，如果获取不到 manifest，WebSpatial Builder 会自动用以下默认值作为临时 manifest，减少项目开发初期的工作量。

```json5
{
  name: "WebSpatialTest",
  display: "minimal-ui",
  start_url: "/",
  scope: "/",
}
```

Web App Manifest 文件中的 `start_url` 等字段一般都是相对地址，不会写死域名等 base URL 部分，从而导致 WebSpatial Builder 仅凭项目仓库中的 manifest 文件无法获知如何通过 URL 访问当前 Web App，需要[依靠 `--base` 来获取域名、补全 URL](#--base)。否则会在生成的 Packaged App 中包含所有[网站构建产物](../../concepts/webspatial-app.md#web-build-tool)，不从线上加载网站。

### `--manifest-url`

让 WebSpatial Builder 直接通过 URL 获取线上网站中的 Web App Manifest。

由于这种 URL 中包含域名等 base 部分，即使 Manifest 文件中的 `start_url` 等字段是相对地址，WebSpatial Builder 也可以像浏览器一样自动推导、补全 `start_url`。在这种情况下 WebSpatial Builder 相当于直接把线上的 Web App 以 URL 形式嵌入 Packaged App，不需要本地项目文件，也不需要 [`--base`](#--base) 等其他参数。

### `--project`

如果 WebSpatial Builder 无法获知如何通过 URL 访问当前 Web App，默认会从 `dist/` 中获取[网站构建产物](../../concepts/webspatial-app.md#web-build-tool)打包进原生应用安装包里。

可以用 `--project` 让 WebSpatial Builder 从其他路径获取网站构建产物。
