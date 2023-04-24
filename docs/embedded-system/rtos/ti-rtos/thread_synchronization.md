---
title: 线程同步
date: 2023-01-10
description: 本文是对 ti rtos 官方文档的翻译
autoSort: -2
---
TI-RTOS 内核提供了几个用于同步任务的模块，例如信号量、事件和队列。以下部分讨论这些常见的 TI-RTOS 原语。
## 信号量（Semaphores）
信号量通常用于整个 TI-RTOS 应用程序中的任务同步和互斥。图 42 展示了信号量功能。信号量可以是计数信号量或二进制信号量。计数信号量使用 `Semaphore_post()` 跟踪信号量发布的次数。当任务之间共享一组资源时，此功能很有用。此类任务可能会调用 Semaphore_pend() 以在使用资源之前查看资源是否可用。二进制信号量只能有两种状态：可用（count = 1）和不可用（count = 0）。二进制信号量可用于在任务之间共享单个资源，或用于信号量可多次发布的基本信号机制。二进制信号量不跟踪计数；他们只跟踪信号量是否已发布。

<center><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-semaphore.jpg" alt="Semaphore Functionality" /><br /><i>图 42. 信号量功能</i></center>

### 初始化信号量
以下代码描述了如何在 TI-RTOS 中初始化信号量。可以按照创建与构建中的说明[创建 VS 构建信号量](./creating_vs_constructing)。

有关如何创建信号量的信息，请参见[清单 2](./creating_vs_constructing#listing-2)。

有关如何构建信号量的信息，请参见[清单 3](./creating_vs_constructing#listing-3)。

### 获取信号量

[`Semaphore_pend()`](https://software-dl.ti.com/dsps/dsps_public_sw/sdo_sb/targetcontent/sysbios/6_52_00_12/exports/bios_6_52_00_12/docs/cdoc/ti/sysbios/knl/Semaphore.html#pend) 是一个阻塞函数调用。此调用只能从<mark>任务上下文</mark>中调用。调用此函数的任务将允许执行优先级较低的任务（如果它们已准备好运行）。如果计数器为 0，则调用 `Semaphore_pend()` 的任务将阻塞，否则它将计数器减 1。该任务将保持阻塞状态，直到另一个线程调用 `Semaphore_post()` 或发生调用`Semaphore_pend()`时传入的系统滴答超时；以先到者为准。通过读取 `Semaphore_pend()` 的返回值，可以区分信号量是已发布还是超时。

<center><span id="listing-4">清单 4. 获取信号量</span></center>
<br />

```c
bool isSuccessful;
uint32_t timeout = 1000 * (1000/Clock_tickPeriod);

/* Pend (approximately) up to 1 second */
isSuccessful = Semaphore_pend(sem, timeoutInTicks);

if (isSuccessful)
{
    System_printf("Semaphore was posted");
}
else
{
    System_printf("Semaphore timed out");
}
```

::: tip
默认的 TI-RTOS 系统滴答周期为 1 毫秒。通过在 .cfg 文件中设置 Clock.tickPeriod = 10，将 CC2640R2 的默认值重新配置为 10 微秒。

给定 10 微秒的系统节拍，[清单 4](#listing-4) 中的超时将大约为 1 秒。
:::

### 释放信号量

释放信号量是通过调用 `Semaphore_post()` 来完成的。在调用 `Semaphore_post()` 释放信号量后，被挂起的任务获得这个信号量将从阻塞状态转换为就绪状态。如果没有更高优先级的线程准备好运行，它将允许执行先前挂起的任务。如果信号量上没有待处理的任务，则调用 `Semaphore_post()` 将增加其计数器。二进制信号量的最大计数为 1。

<center><span id="listing-5">清单 5. 释放信号量</span></center>
<br>

```c
Semaphore_post(sem);
```


## 事件（Event）

信号量本身提供线程之间的基本同步。在某些情况下，仅信号量本身就足以了解需要触发什么进程。然而，同步的特定原因通常也需要跨线程传递。为帮助实现这一目标，可以利用 TI-RTOS 事件模块。

从某种意义上说，事件类似于信号量，事件对象的每个实例实际上都包含一个信号量。使用事件的额外优势在于可以以线程安全的方式将特定事件通知给任务。

### 初始化事件

创建和构建事件遵循[创建 VS 构建](./creating_vs_constructing)中解释的相同准则。[清单 6](#listing-6) 中显示的是有关如何构造事件实例的示例。

<center><span id="listing-6">清单 6. 构造事件</span></center><br />

```c
Event_Handle event;
Event_Params eventParams;
Event_Struct structEvent; /* Memory allocated at build time */

Event_Params_init(&eventParams);
Event_construct(&structEvent, 0, &eventParams);

/* It's optional to store the handle */
event = Event_handle(&structEvent);
```

### 监听事件

与 `Semaphore_pend()` 类似，任务线程通常会阻塞在 `Event_pend()` 上，直到通过 `Event_post()` 发布事件或指定的超时已过期。[清单 7](#listing-7) 中显示的是在下面显示的 3 个示例事件 ID 中的任何一个上挂起的任务的片段。`BIOS_WAIT_FOREVER` 用于防止发生超时。结果，`Event_pend()` 将在返回的位掩码值中发布一个或多个事件。

从 Event_pend() 返回的每个事件都已以线程安全的方式在事件实例中自动清除。因此，只需要保留已发布事件的本地副本。有关如何使用 Event_pend() 的完整详细信息，请参阅 [TI-RTOS 内核 (SYS/BIOS) 用户指南](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf)。

<center><span id="listing-7">清单 7. 监听事件</span></center><br />

```c
#define START_ADVERTISING_EVT         Event_Id_00
#define START_CONN_UPDATE_EVT         Event_Id_01
#define CONN_PARAM_TIMEOUT_EVT        Event_Id_02

void TaskFxn(..)
{
    /* Local copy of events that have been posted */
    uint32_t events;

    while(1)
    {
        /* Wait for an event to be posted */
        events = Event_pend(event,
                            Event_Id_NONE,
                            START_ADVERTISING_EVT |
                            START_CONN_UPDATE_EVT |
                            CONN_PARAM_TIMEOUT_EVT,
                            BIOS_WAIT_FOREVER);

        if (events & START_ADVERTISING_EVT)
        {
            /* Process this event */
        }

        if (events & START_CONN_UPDATE_EVT)
        {
            /* Process this event */
        }

        if (events & CONN_PARAM_TIMEOUT_EVT)
        {
            /* Process this event */
        }
    }
}
```

::: tip
默认的 TI-RTOS 系统滴答周期为 1 毫秒。通过在 .cfg 文件中设置 Clock.tickPeriod = 10，将 CC26xx 和 CC13xx 器件的默认值重新配置为 10 微秒。

给定 10 微秒的系统滴答，[清单 4](#listing-4) 中的超时将大约为 1 秒。
:::

### 响应事件

事件可以从任何 TI-RTOS 内核上下文发布，只需调用事件实例的 `Event_post()` 和事件 ID 即可完成。[清单 8](#listing-8) 显示了高优先级线程（例如 Swi）如何响应特定事件。

<center><span id="listing-8">清单 8. 响应事件</span></center><br />

```c
#define START_ADVERTISING_EVT         Event_Id_00
#define START_CONN_UPDATE_EVT         Event_Id_01
#define CONN_PARAM_TIMEOUT_EVT        Event_Id_02

void SwiFxn(UArg arg)
{
    Event_post(event, START_ADVERTISING_EVT);
}
```
