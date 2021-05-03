---
thumbnail: /images/random/material-2.png
author: UNIDY
title: 跨平台fetch
date: 2021-1-26
categories: 代码控
tags:
  - JavaScript
qrcode: true
share_menu: false
donate: false
toc: false
comments: false
excerpt: JavaScript与其说是一门语言，不如说是一套协议。
---

JavaScript与其说是一门语言，不如说是一套协议。**只是各大宿主平台恰好都按照这一协议实现了对应的接口。**至于怎么实现，ECMA委员会并不管，也管不了。所以JavaScript没有标准库。如果某个平台上的某个实现有问题，那也绝对是平台的特性，绝不可能甩锅给JavaScript。

这与Java的跨平台属性有着显著的不同。JVM提供了一个完全抽象的层次，开发者理论上不必关心同一段代码在不同平台上的表现问题。**JavaScript则将这一责任移交给开发人员**，各大宿主平台仿佛只是读代码的机器，读到一半很任性地抛给你一个`xxx is not implemented`都是意料之中的（没错，[说的就是你](https://github.com/facebook/react-native/blob/master/Libraries/Blob/FileReader.js#L83)）。开发者需要自己进行兼容与缝合。

网络库就是一大坑——它天然与宿主平台相关。**尽管有统一的`Fetch API`接口规范，但各大平台对`fetch`的实现情况都不尽理想。**[`cross-fetch`](https://www.npmjs.com/package/cross-fetch)是一个很优秀的库，它基本实现了node、browser和react-native三端统一的`fetch`功能，可惜它对不同字符集编码解析的跨平台支持有些无能为力。

针对这一问题，我在项目中基于`cross-fetch`定制了一个更加通用的`uFetch`，并在此加以记录。

---

> Talk is cheap. Show me the code.

```typescript
import fetch from "cross-fetch";

const cookies: {[key: string]: string} = {};

/**
 * Clear the cookies.
 */
export const clearCookies = () => {
    Object.keys(cookies).forEach((key) => delete cookies[key]);
};

/**
 * Gets the response data from the given `url`, with a specified `referer` if
 * provided.
 *
 * If param `post` is provided, a `POST` request with the given post form will
 * be sent. Otherwise, a `GET` request will be sent.
 *
 * The `timeout` is `60000` by default, in milliseconds.
 */
export const uFetch = async (
    url: string,
    referer?: string,
    post?: object | string,
    timeout = 60000,
): Promise<string> => {
    // Prepare request headers
    const defaultHeaders = {
        // Setup content-type and user-agent
        "Content-Type": CONTENT_TYPE_FORM,
        "User-Agent": USER_AGENT,
    };

    const headersWithCookies = global.FileReader === undefined ? {
        ...defaultHeaders,
        // Cookie should be manually set in Node.js
        Cookie: Object.keys(cookies).map((key) => `${key}=${cookies[key]}`).join(";"),
    } : defaultHeaders;

    // Add referer to header if specified
    const headers =
        referer === undefined
            ? headersWithCookies
            : {...headersWithCookies, Referer: referer};

    // Handle timeout abortion
    const controller = new AbortController();
    const timeoutEvent = setTimeout(() => {
        controller.abort();
    }, timeout);
    const defaultInit = {
        headers: headers,
        signal: controller.signal,
    };

    // Switch method to `POST` if post-body is provided
    const init =
        post === undefined
            ? defaultInit
            : {
                ...defaultInit,
                method: "POST",
                body: typeof post === "string" ? post : stringify(post),
            };

    // Perform the network request
    try {
        const response = await fetch(url, init);

        // Manage cookies
        response.headers.forEach((value, key) => {
            if (key === "set-cookie") {
                const segment = value.split(";")[0];
                const [item, val] = segment.split("=");
                cookies[item] = val;
            }
        });

        // Detect charset based on content-type
        const contentType = response.headers.get("Content-Type");
        let base64 = false;
        let charset = "UTF-8";
        if (contentType) {
            if (contentType.includes("application/octet-stream")) {
                base64 = true;
            } else {
                /charset=(.*?);/.test(contentType + ";");
                charset = RegExp.$1;
            }
        }

        if (global.FileReader) {
            // For browser and react-native
            const blob = await response.blob();
            return await new Promise<string>(((resolve, reject) => {
                // Use FileReader to read blob data
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                        if (base64) {
                            // Simply return the string data with the MIME header removed
                            resolve(reader.result.substr("data:application/octet-stream;base64,".length));
                        } else {
                            // The value stored in `reader.result` has already been parsed with the correct encoding
                            resolve(reader.result);
                        }
                    } else {
                        // This should not happen
                        reject(new Error("Blob parsing error."));
                    }
                };
                // Read and transform
                if (base64) {
                    reader.readAsDataURL(blob);
                } else {
                    reader.readAsText(blob, charset);
                }
            }));
        } else {
            // For node.js
            const arrayBuffer = await response.arrayBuffer();
            // Use iconv-lite to transform arrayBuffer into string
            return iconv.decode(Buffer.from(arrayBuffer), charset);
        }
    } finally {
        // We have to clear the timeout
        clearTimeout(timeoutEvent);
    }
};
```

这份代码并没有太多不平凡的地方，交代几个细节即可。

### 利用`global.FileReader`判断平台

RN和浏览器环境实现了`FileReader`，Node.js没有，因此`global.FileReader === undefined`等价于平台为Node.js。

有两处需要用到这一判定。一是cookie相关。Node.js环境下开发者需要自己管理cookie，而浏览器和RN环境会自动进行管理。二是解析响应数据相关。RN环境没有实现将响应数据以`arrayBuffer`的形式加载——这对于使用指定编码解析数据的需求是致命的。因此，只能先取得`blob`形式的数据，再使用`FileReader`的`readAsText`方法进行解析。

### 编码的判定

借助响应头的`Content-Type`字段进行判断。需要注意的是，如果`Content-Type`包含`application/octet-stream`，那么直接返回`blob`中的`base64`编码数据即可。

（最后，为啥我这网页的代码高亮又崩了hhh）