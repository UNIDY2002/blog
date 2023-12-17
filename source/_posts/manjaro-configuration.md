---
thumbnail: /images/random/material-9.png
title: Manjaro 新机配置小记
qrcode: true
share_menu: true
donate: false
date: 2023-12-7
categories: 技术宅
tags:
  - Linux
comments: true
excerpt: 为下次重装提供快速参考
---

## 安装镜像

- 从 [Manjaro 官网](https://manjaro.org/)下载 Plasma 主题镜像。
- 使用 [SUSE Studio Imagewriter](https://github.com/openSUSE/imagewriter) 将镜像写入 USB。
- 按 F12 进入 Boot Menu，选择 USB 镜像，安装镜像。

---

## 配置准备

### 连接蓝牙鼠标

- 打开菜单，搜索 bluetooth，进入蓝牙设置。
- 通过 Tab 键和空格键进入“添加新设备”菜单，通过 Tab 键、方向键和回车键配对鼠标。

### 连接无线网络

- 购买 TP-LINK TL-WN725N 无线网络接收器，Linux 内核自带驱动。

### 启用 AUR

- 打开软件包管理器，进入首选项，在第三方选项卡中，启用 AUR 支持。
- 打开软件包管理器，安装 `yay`。

### 安装 `base-devel`

- 打开软件包管理器，安装 `base-devel`。

### 安装中文输入法

- 打开软件包管理器，安装 `fcitx-sogoupinyin` 和 `kcm-fcitx`。
- 修改 `/etc/profile`，写入以下内容：

```bash
#fcitx
XIM_PROGRAM=fcitx
XIM=fcitx
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS="@im=fcitx"
```

---

## 系统设置

### 设置交换内存

- 参见 [Swap - ArchWiki](https://wiki.archlinux.org/title/Swap#Swap_file) 。

---

## 软件配置

### Fish

- 打开软件包管理器，安装 `fish`。
- 编辑 `~/.config/fish/config.fish`，设置 `set -U fish_greeting`。
- 打开 Konsole，新建配置方案“Fish”，将启动命令改为 `/usr/bin/fish`，适当调整字号，并将该配置方案设为默认配置。

### Firefox

- 设置语言。
- 设置隐私模式。
- 设置默认搜索引擎。
- 设置新标签菜单。
- 设置关闭多标签页时确认。
- 安装 Learn Helper、Zotero 等插件。

### Clash

- 打开软件包管理器，安装 `clash`。
- 创建配置目录 `/etc/clash`，并从旧电脑上拷贝必要的配置文件。
- 创建配置文件 `/etc/systemd/system/clash.service`，写入以下内容：

```toml
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network-online.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/bin/clash -d /etc/clash

[Install]
WantedBy=multi-user.target
```

- 重新加载 `systemd` 模块：`systemctl daemon-reload`。
- 启动 `clash` 服务：`systemctl start clash`。
- 设置开机自启：`systemctl enable clash`。

### JetBrains

- 打开软件包管理器，安装 `jetbrains-toolbox`。
- 登录 JetBrains Toolbox。
- 设置打开 Toolbox App 的全局快捷键 `Ctrl + Alt + J`。

### QQ

- 打开软件包管理器，安装 `linuxqq`。

### 微信

- 打开软件包管理器，安装 `deepin-wine-wechat`。

### 飞书

- 打开软件包管理器，安装 `feishu-bin`。

### 网易云音乐

- 打开软件包管理器，安装 `netease-cloud-music`。

### Typora

- 打开软件包管理器，安装 `typora-free`。

### Thunderbird

- 打开软件包管理器，安装 `thunderbird`。

### Telegram

- 打开软件包管理器，安装 `telegram-desktop`。

### Zotero

- 打开软件包管理器，安装 `zotero-bin`。

### 腾讯会议

- 打开软件包管理器，安装 `wemeet-bin`。

### WPS

- 打开软件包管理器，安装 `wps-office`、`wps-office-fonts`、`wps-office-mime`、`wps-office-mui-zh-cn`。

### OneDrive

- 打开软件包管理器，安装 `onedrive-git`。
