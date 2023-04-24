---
title: 时钟
date: 2023-02-20
description: 本文是对 ti rtos 官方文档的翻译
autoSort: -5
---

时钟实例是可以安排在一定数量的系统滴答后运行的函数。时钟实例是一次性的或周期性的。这些实例在创建后立即启动，配置为在延迟后启动，并且可以随时停止。所有时钟实例在 [Swi](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-swi) 上下文中过期时执行。以下示例显示最小分辨率是 TI-RTOS 配置文件 (`.cfg`) 中设置的 TI-RTOS 时钟节拍周期。

:::tip

默认的 TI-RTOS 内核节拍周期为 1 毫秒。对于 CC2640R2 设备，这在 TI-RTOS 配置文件 (.cfg) 中重新配置：

```cfg
Clock.tickPeriod = 10;
```

:::

派生自实时时钟 RTC 的每个系统节拍都会启动一个时钟对象，该对象将运行节拍计数与每个时钟的周期进行比较，以确定相关函数是否应该运行。对于更高分辨率的定时器，TI 建议使用 16 位硬件定时器通道或传感器控制器。请参阅 [TI-RTOS 内核 (SYS/BIOS) 用户指南](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf)的包 `ti.sysbios.knl` 部分中的时钟模块。有关这些功能的更多信息。

:::tip

传感器控制器在 [CC2640R2L](https://www.ti.com/product/CC2640R2L) 上不可用。

:::

您可以直接在您的应用程序中使用内核的时钟 API，此外，Util 模块还包含一组抽象的 TI-RTOS 时钟函数，如下所示：

* [Util_constructClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga761dca11dc0c6199168011949db793c5) 创建一个时钟对象。
* [Util_startClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga1c499454cba90c216ab2514b54f7ce88) 启动一个存在的时钟对象.
* [Util_restartClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga3d36870c30686d68d7096fd333090c3f) 停止，重启一个存在的时钟对象.
* [Util_isActive()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga077436ed5f5a43a39f8c96cba253160e) 检查时钟对象是否正在运行.
* [Util_stopClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#gae0a8cd00a21d57e55a96283336ceab17) 停止一个存在的时钟对象.
* [Util_rescheduleClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga59503ce945c3762bb32e8a1e2cb9c8f9) 重新配置一个存在的时钟对象.

## 功能示例

以下示例取自 BLE5-Stack 中的 simple_peripheral 项目。

<center id="figure-46"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/plantuml-5ab860f1261838a17544f9a753c20ad9825851ff.png" /><br /><i>图 46. 触发时钟对象</i></center>

**步骤 1** ，通过 [Util_constructClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga761dca11dc0c6199168011949db793c5) 构造时钟对象。在示例进入连接状态后，它将通过 [Util_startClock()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga1c499454cba90c216ab2514b54f7ce88) 启动时钟对象。

<center><span id="listing-14">清单 14. 在simple_peripheral中构造`periodicClock`时钟对象</span></center><br/>

```c
// Clock instances for internal periodic events.
static Clock_Struct periodicClock;

// Create one-shot clocks for internal periodic events.
Util_constructClock(&periodicClock, SimplePeripheral_clockHandler,
    SP_PERIODIC_EVT_PERIOD, 0, false, SP_PERIODIC_EVT);
```

**步骤 2**，当 Clock 对象的定时器超时后，它将在 Swi 上下文中执行 `SimplePeripheral_clockHandler()`。由于无法阻止此调用并阻止所有任务，因此通过调用 `Event_post(SP_PERIODIC_EVT)` 在 simple_peripheral 中进行后处理来保持简短。

<center><span id="listing-15">清单 15. 定义 SimplePeripheral_clockHandler()</span></center><br/>

```c
static void SimplePeripheral_clockHandler(UArg arg)
{
    /* arg is passed in from Clock_construct() */
    Event_post(events, arg);
}
```

:::warning

时钟函数不得调用阻塞内核 API 或 TI-RTOS 驱动程序 API！执行长例程将影响分配给无线协议栈的高优先级任务中的实时约束！

:::

**步骤 3**，由于 `Event_post(SP_PERIODIC_EVT)`，simple_peripheral 任务被解锁，它继续调用 `SimplePeripheral_performPeriodicTask()` 函数。之后，要重新启动此函数的周期性执行，它将重新启动 `periodicClock` 时钟对象。

<center><span id="listing-16">清单 16. 为 SP_PERIODIC_EVT 事件提供服务</span></center><br/>

```c
if (events & SP_PERIODIC_EVT)
{
  // Perform periodic application task
  SimplePeripheral_performPeriodicTask();

  Util_startClock(&periodicClock);
}
```