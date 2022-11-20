---
thumbnail: /images/random/material-15.png
author: UNIDY
title: 对 Node.js 程序进行性能分析
date: 2022-11-20
categories: 技术宅
tags:
  - JavaScript
qrcode: true
share_menu: true
donate: false
toc: false
comments: true
excerpt: 记录我分析 Saiblo 评测机性能问题时用到的小工具
---

这个暑假，我用 Node.js 将 Saiblo 评测机重写了一遍。但测试时，我遇到了一些 IO 性能问题。

出于一些安全性与保密性的原则，我在这里并不介绍具体的问题，而是简单记录一下我分析问题时的心路历程，以便后续回顾。

## 寻找 IO 代码

Node.js 最典型的特征是事件驱动 IO，它的底层 IO 采用 [libuv](https://libuv.org/) 实现。

在本项目中，我需要重点关注文件读写的性能。以写文件（`write`）为例，经过层层搜索，我找到了 Node.js 里写文件的 [C++ 实现](https://github.com/nodejs/node/blob/v19.0.0/src/node_file.cc#L1939-L1993)。其中，调用 libuv 接口的异步代码是：

```C++
if (req_wrap_async != nullptr) {  // write(fd, buffer, off, len, pos, req)
  FS_ASYNC_TRACE_BEGIN0(UV_FS_WRITE, req_wrap_async)
  AsyncCall(env, req_wrap_async, args, "write", UTF8, AfterInteger,
            uv_fs_write, fd, &uvbuf, 1, pos);
}
```

我们再看一下 `AsyncCall` [相关定义](https://github.com/nodejs/node/blob/v19.0.0/src/node_file-inl.h#L253-L286)，就会明白，这里执行的代码相当于：

```C++
uv_fs_write(env()->event_loop(), req(), fd, &uvbuf, 1, pos, AfterInteger);
```

其中，`AfterInteger` 是[回调函数](https://github.com/nodejs/node/blob/v19.0.0/src/node_file.cc#L770-L781)，用于处理 write 的返回值：

```C++
void AfterInteger(uv_fs_t* req) {
  FSReqBase* req_wrap = FSReqBase::from_req(req);
  FSReqAfterScope after(req_wrap, req);
  FS_ASYNC_TRACE_END1(
      req->fs_type, req_wrap, "result", static_cast<int>(req->result))
  int result = static_cast<int>(req->result);
  if (result >= 0 && req_wrap->is_plain_open())
    req_wrap->env()->AddUnmanagedFd(result);

  if (after.Proceed())
    req_wrap->Resolve(Integer::New(req_wrap->env()->isolate(), result));
}
```

## 进行性能分析

就当我准备自己插装代码，分析 IO 耗时，寻找性能瓶颈时，我注意到了这两个宏：

```C++
FS_ASYNC_TRACE_BEGIN0(UV_FS_WRITE, req_wrap_async);
FS_ASYNC_TRACE_END1(req->fs_type, req_wrap, "result", static_cast<int>(req->result));
```

难道 Node.js 本身就插装了性能追踪代码？

经过进一步分析和寻找，我发现果然如此，并找到了[相关文档](https://github.com/nodejs/node/blob/v19.0.0/doc/api/tracing.md)。

真是太棒了，我只要指定事件类别（`"node.fs.async"`），即可轻松完成性能追踪。

> 当然，由于 Saiblo 评测机是多进程执行的，我只需要追踪其中一个子进程的 IO 事件。这里简单记录一下代码，以便后续回顾：
>
> ```typescript
> // ...
> import trace from "node:trace_events";
> // ...
> 
> const main = async () => {
>     if (process.argv[2] === "worker") {
>         const tracing = trace.createTracing({ categories: ["node.fs.async"] });
>         tracing.enable();
>         // ...
>     } else {
>         // ...
>     }
> };
> ```

## 阅读追踪日志

但当我拿到日志文件时，我傻眼了，因为它是以人类几乎不可读的 JSON 格式记录的。

![阅读困难：JSON](/images/meme_yaml.jpg)

当然，Node.js 的文档里写得很清楚，在 Chrome 浏览器中访问 [`chrome://tracing`](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 即可以可视化的方式加载追踪日志。然而，我没有 Chrome 浏览器，那可怎么办呢？

经过在网上搜索，我找到了谷歌写的一个网站 [Perfetto UI](https://ui.perfetto.dev/)，与 [`chrome://tracing`](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 有着同样的功能。有了这个网站，我成功完成了 IO 性能的分析。
