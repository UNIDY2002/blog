---
thumbnail: /images/random/material-19.png
author: UNIDY
title: 再见，Travis-CI！
date: 2020-11-06
categories: 技术宅
tags:
  - 随想
qrcode: false
share_menu: false
donate: false
toc: false
comments: true
excerpt: 我横竖睡不着，仔细看了半夜，才从字缝里看出字来，满篇都写着两个字：“收费”。
---

事情起源于这样一篇文章：[The new pricing model for travis-ci.com](https://blog.travis-ci.com/2020-11-02-travis-ci-new-billing)

**我横竖睡不着，仔细看了半夜，才从字缝里看出字来，满篇都写着两个字：“收费”。**

表面上，这篇文章写得很客气：我们的free plan转为credit模式啦，你有10K的免费credit，blah blah blah。可我仔细核算了一下，**这10K的额度，至多够我的项目苟3天**。付费计划又显然太贵。因此，**我亟需找到一个新的免费CI平台**。

我将目光转向GitHub Actions。

---

用了GitHub Actions后，我最大的感受是：**真香**。

- GitHub**原生支持**，上传artifacts，生成release，**均可丝滑地实现**；
- 开源社区**提供大量即插即用式的Action**，**构建workflow非常灵活**；
- **充分发挥自己的想象力，还能完成更多功能**（我打算整一个自动化的Release文案编写，甚至触发[thuinfo.github.io](https://thuinfo.github.io)的更新）。

此外，GitHub Actions相比于Travis-CI，生命周期的设计更为简明，不过我目前Git Actions用得也不多，暂时无法充分评价其优劣。

还有一点发现：**GitHub Actions的机器性能似乎优于Travis-CI的**。在Travis-CI上，一次MacOS的构建需要30分钟，但在GitHub Actions上只需约10分钟——再也不要心焦地等MacOS的构建结果了。

Travis-CI的open-ssl也一直成谜——**对同一个文件，使用相同的秘钥，本地解密和Travis的机器上解密的结果居然不一样**。我当初配Travis-CI时，这一步折腾了好久。在GitHub Actions上全无此类问题。

……

想吐槽Travis的或许还有一些吧，暂时可能想不起来，但有一点感慨是确定的：

**为啥我不早点使用GitHub Actions呢 [问号脸] [问号脸]**

---

在GitHub Actions之外，我还摸到了一个好东西：App Center。它是微软提供的应用测试托管平台，其中自动化真机测试服务是要钱的，但只是托管自己的应用程序则完全免费。

App Center也有相应的GitHub Actions支持，同样即插即用，体验极佳。因此，**我决定使用App Center托管THUInfo的Android安装包，自动化部署的事也就顺带搞定了**。

---

摸爬滚打一天多，总算把THUInfo的CI/CD从Travis-CI迁移到了GitHub Actions。如果要问我有什么想说的，那就是：

**微软NB！**

---

附：配GitHub Actions的过程中参考了这篇超棒的博客——[Automate React Native builds with GitHub Actions](https://blog.usejournal.com/automate-react-native-builds-with-github-actions-af54212d26dc)