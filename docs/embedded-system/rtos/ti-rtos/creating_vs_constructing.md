---
title: 创建 vs 构造
date: 2023-01-10
description: 本文是对 ti rtos 官方文档的翻译
autoSort: -1
---
## 创建 vs 构造
大多数 TI-RTOS 模块通常具有 `_create()` 和 `_construct()` API 来初始化原始实例。两个 API 之间运行时的主要差异是内存分配和错误处理。

**Create** API 在初始化之前从默认 TI-RTOS 堆执行内存分配。因此，应用程序必须在继续之前检查有效 <u>句​​柄</u>（handle）的返回值。

<center><span id="listing-2">清单 2. 创建一个信号量</span><br /></center>

```c
Semaphore_Handle sem;
Semaphore_Params semParams;

Semaphore_Params_init(&semParams);
sem = Semaphore_create(0, &semParams, NULL); /* Memory allocated in here */

if (sem == NULL) /* Check if the handle is valid */
{
    System_abort("Semaphore could not be created");
}
```
**Construct** API 被赋予一个数据结构，用于存储实例的变量。由于已经为实例预分配了内存，因此构造后可能不需要进行错误检查。

<center><span id="listing-3">清单 3. 构造一个信号量</span><br /></center>

```c
Semaphore_Handle sem;
Semaphore_Params semParams;
Semaphore_Struct structSem; /* Memory allocated at build time */

Semaphore_Params_init(&semParams);
Semaphore_construct(&structSem, 0, &semParams);

/* It's optional to store the handle */
sem = Semaphore_handle(&structSem);
```
