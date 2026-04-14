---
sidebar_position: 6
description: '了解如何在 visionOS 真机上测试 Packaged WebSpatial App，并提交到 App Store Connect。'
---

# 如何在 visionOS 设备上测试并提交到 App Store {#how-to-test-on-visionos-devices-and-submit-to-the-app-store}

## 前提条件 {#prerequisites}

| 需要准备的内容 | 获取位置 | 后续用途 |
| --- | --- | --- |
| **Team ID** | [Apple 开发者账号控制台](https://developer.apple.com/account) | 后续通过 `--teamId` 传给 Builder。 |
| **Bundle ID** | [Certificates, Identifiers & Profiles -> Identifiers](https://developer.apple.com/account/resources/identifiers/list) | 后续通过 `--bundle-id` 传给 Builder。 |

## 设备测试 {#device-testing}

1. 登录 [App Store Connect](https://appstoreconnect.apple.com/)，创建一个使用前面 **Bundle ID** 的应用记录。
2. 把测试设备连接到已经安装 **Xcode** 且登录了开发者账号的 Mac，在 Xcode 里打开 **Window -> Devices and Simulators**，记录设备的 **Identifier**（UDID）。
3. 在 [Certificates, Identifiers & Profiles -> Devices](https://developer.apple.com/account/resources/devices/list) 中注册这台测试设备。
4. 在 Web 项目中运行 [WebSpatial Builder 的 `build` 命令](../api/builder/build.md)，并同时提供 **Team ID** 与 **Bundle ID**：

```bash title="为已注册测试设备构建 IPA" {2-3}
webspatial-builder build \
  --base=$PREVIEW_SERVER \
  --bundle-id=$APPLE_BUNDLE_ID \
  --teamId=$APPLE_TEAM_ID
```

5. 构建完成后，在仓库的 `build/` 目录找到 IPA 文件，再次打开 Xcode 的 **Window -> Devices and Simulators**，选中测试设备，并在 **Installed Apps** 中添加这个 IPA。

## 提交到 App Store {#submission-to-the-app-store}

:::tip[先补齐 App Store Connect 元数据]
上传前，先在 App Store Connect 中补齐截图、宣传文案、审核信息、价格、法规信息和隐私信息。
:::

1. 打开 [App Store Connect](https://appstoreconnect.apple.com/apps) 中对应的应用记录。
2. 除了 **Team ID** 和 **Bundle ID** 之外，再带上版本号与账号凭证，运行 [WebSpatial Builder 的 `publish` 命令](../api/builder/publish.md)：

```bash title="构建并上传 App Store 提交版本" {2-6}
webspatial-builder publish \
  --base=$PRODUCT_SERVER \
  --bundle-id=$APPLE_BUNDLE_ID \
  --teamId=$APPLE_TEAM_ID \
  --version=$APP_VERSION \
  --u=$APPLE_DEV_NAME \
  --p=$APPLE_DEV_PASSWORD
```

3. 上传完成后，在 App Store Connect 的 **Build Versions** 中选择新构建版本并提交审核。
