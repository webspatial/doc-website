---
sidebar_position: 5
description: '安装运行 Packaged WebSpatial App 所需的 Xcode、模拟器和 visionOS 组件。'
---

# 如何安装 Xcode 和 visionOS 相关组件 {#how-to-install-xcode-and-visionos-related-components}

:::info[前提条件]
你需要一台 Mac 电脑。
:::

| 步骤 | 操作 | 为什么重要 |
| --- | --- | --- |
| 1 | 打开 Mac App Store，搜索 `Xcode` 并安装。 | 它会安装 Apple 的核心开发环境。 |
| 2 | 首次启动 Xcode 时，接受许可协议，并在需要时输入管理员密码。 | Xcode 会在第一次启动时自动安装额外必需组件。 |
| 3 | 打开 `Xcode > Settings > Components`，在 `Platform Support` 里安装 `visionOS` 和 `visionOS Simulator`。 | 构建和预览 visionOS 应用都依赖这些平台组件。 |
