---
thumbnail: /images/random/material-2.png
title: 在容器中运行完整版 Chromium
qrcode: true
share_menu: true
donate: false
date: 2023-3-23
categories: 技术宅
tags:
  - JavaScript
  - Docker
comments: true
excerpt: 如何在容器里支持图形界面
---

前几天接了一个活，需要使用代码驱动浏览器（具体而言，我使用了 puppeteer），并且需要在云服务器上部署。

由于要使用代码驱动一个**完整的** Chromium 浏览器，需要一个图形界面，因此只能通过远程桌面登录云服务器进行操作。随着业务规模的扩张，操作的人力成本也随之增加。我亟需将这个系统转化为一个微服务，从而支持快速部署与增缩。

最后，我参考了 [chrome-in-docker](https://github.com/c0b/chrome-in-docker) 的实现，完成了这一目标。我在这里摘录了部分代码，供以后有类似需求时查阅。

```dockerfile
# Dockerfile
...

RUN apt-get update && \
    apt-get install -y xvfb chromium && \
    apt-get clean

...
```

```bash
# entry.sh
#!/bin/bash

rm -f /tmp/.X10-lock
Xvfb :10 -screen 0 1920x1480x24+32 -ac -r -cc 4 -accessx -xinerama +extension Composite -extension RANDR +extension GLX &
sleep 5
export DISPLAY=":10"
yarn start
```

