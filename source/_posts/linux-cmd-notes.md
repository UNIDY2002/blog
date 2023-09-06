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
