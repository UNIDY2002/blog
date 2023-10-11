---
thumbnail: /images/random/material-4.png
title: 一些神奇的 Linux 指令
qrcode: true
share_menu: true
donate: false
date: 2023-9-6
categories: 技术宅
tags:
  - Linux
  - C++
comments: true
excerpt: 记录一下，防止忘掉
---

## `perf` 获得准确的调用栈

指令要点：`perf record --call-graph lbr`

参考资料：https://gaomf.cn/2019/10/30/perf_stack_traceback

## 减小内核编译产物的大小

指令要点：`make INSTALL_MOD_STRIP=1 modules_install && make install`

参考资料：https://unix.stackexchange.com/questions/270390

## 使用了 `openssl@v3` 但需要连接 Tsinghua-Secure

指令要点：`nmcli connection modify id Tsinghua-Secure 802-1x.phase1-auth-flags tls-1-0-enable`

参考资料：https://thu.services/services/#tsinghua-secure

## 让 `.bashrc` 生效

指令要点：创建一个默认 `~/.profile`

参考资料：https://askubuntu.com/questions/161249
