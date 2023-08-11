---
title: 队列
date: 2023-01-12
description: 本文是对 ti rtos 官方文档的翻译
autoSort: -3
---

TI-RTOS 队列模块提供了一个线程安全的单向消息传递模块，以先进先出 (FIFO) 的方式运行。队列通常用于允许高优先级线程将消息传递给低优先级任务以进行延迟处理；因此允许低优先级任务阻塞直到需要运行。

在图 43 中，队列配置为从任务 A 到任务 B 的单向通信。任务 A 将消息“放入”队列，任务 B 从队列中“获取”消息。

<center id="figure-43"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-queue-messaging-process.jpg" alt="Semaphore Functionality" /><br /><i>图 43. 队列消息处理</i></center>

在 BLE5-Stack 中，TI-RTOS 队列函数已被抽象为 `util.c` 中的函数，请参阅 [TI-RTOS 内核 (SYS/BIOS) 用户指南](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf)中的队列模块文档。`util.c` 中的函数将 Queue 模块中的队列与 Event 模块中的事件组合在一起，以在线程之间传递消息。

在 CC2640R2 软件中，ICall 使用来自各自模块的队列和事件在应用程序和堆栈任务之间传递消息。这方面的一个例子可以在 `SimpleCentral_enqueueMsg()` 中看到。高优先级任务、Swi 或 Hwi 将消息排队到应用程序任务。当没有其他高优先级线程正在运行时，应用程序任务将在其自己的上下文中处理此消息。

`util` 模块包含一组抽象的 TI-RTOS 队列函数，如下所示：

* [`Util_constructQueue()`](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga1a402aa73798e67c21ea960bb67ed516) 创建队列。
* [`Util_enqueueMsg()`](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#gada1270148b25421486d6a0f6e001a3b5) 入队。
* [`Util_dequeueMsg()`](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga2119072ce502da984eed8a9dd614da07) 出队。

## 功能示例
[图 44](#figure-44) 和[图 45](#figure-45) 说明了如何使用队列将来自 Hwi 的按钮按下消息排队（到 Board Key 模块中的 Swi）以在任务上下文中进行后处理。此示例取自 BLE5-Stack 中的 simple_central 项目。

<center  id="figure-44"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/plantuml-d2d063751a6f60aa88d8c95dba442896549d0f77.png" /><br /><i>图 44. 消息入队时序图</i></center>

启用中断后，引脚中断可以在 Hwi 上下文中异步发生。为了使中断尽可能短，与中断相关的工作被推迟到任务进行处理。在 BLE5-Stack 中的 simple_central 示例中，引脚中断是通过 Board Key 模块抽象出来的。该模块通过 Swi 回调通知已注册的函数。在这种情况下，SimpleCentral_keyChangeHandler 是注册的回调函数。

[图 44](#figure-44) 中的步骤 1 显示了按下某个键时对 SimpleCentral_keyChangeHandler 的回调。该事件被放入应用程序的队列中进行处理。

<center><span id="listing-9">清单 9. 定义 SimpleCentral_keyChangeHandler()</span></center><br />

```c
void SimpleCentral_keyChangeHandler(uint8 keys)
{
  SimpleCentral_enqueueMsg(SC_KEY_CHANGE_EVT, keys, NULL);
}
```

[图 44](#figure-44) 中的步骤 2 显示了此按键是如何为 simple_central 任务排队的。在这里，内存是通过 [ICall_malloc()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___i_call.html#ga00ce08b268a246cee700442af6ac10ec) 分配的，因此可以将消息添加到队列中。添加后，[Util_enqueueMsg()](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#gada1270148b25421486d6a0f6e001a3b5) 将生成一个 UTIL_QUEUE_EVENT_ID 事件以通知应用程序进行处理。

<center><span id="listing-10">清单 10. 定义 SimpleCentral_enqueueMsg()</span></center><br />

```c
static uint8_t SimpleCentral_enqueueMsg(uint8_t event, uint8_t state, uint8_t *pData)
{
  scEvt_t *pMsg = ICall_malloc(sizeof(scEvt_t));

  // Create dynamic pointer to message.
  if (pMsg)
  {
    pMsg->hdr.event = event;
    pMsg->hdr.state = state;
    pMsg->pData = pData;

    // Enqueue the message.
    return Util_enqueueMsg(appMsgQueue, syncEvent, (uint8_t *)pMsg);
  }

  return (false);
}
```

<center id="figure-45"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/plantuml-258398d03de89f27b5ace3b65194be1d11b2b676.png" /><br /><i>图 45. 消息入队时序图</i></center>

[图 45](#figure-45) 中的第 3 步，simple_central 应用程序被发布的 `UTIL_QUEUE_EVENT_ID` 事件解除阻塞，它继续检查消息是否已放入队列中进行处理。

<center><span id="listing-11">清单 11. 处理应用消息</span></center><br />

```c
// If RTOS queue is not empty, process app message
if (events & SC_QUEUE_EVT)
{
    scEvt_t *pMsg;
    while (pMsg = (scEvt_t *)Util_dequeueMsg(appMsgQueue))
    {
        // Process message
        SimpleCentral_processAppMsg(pMsg);

        // Free the space from the message
        ICall_free(pMsg);
    }
}
```

[图 45](#figure-45) 中的第 4 步，simple_central 应用程序获取出队消息并对其进行处理。

<center><span id="listing-12">清单 12. 处理按键中断消息</span></center><br />

```c
static void SimpleCentral_processAppMsg(sbcEvt_t *pMsg)
{
  switch (pMsg->hdr.event)
  {
    case SC_KEY_CHANGE_EVT:
      SimpleCentral_handleKeys(pMsg->hdr.state);
      break;
    //...
  }
}
```

[图 45](#figure-45) 中的第 5 步，simple_central 应用程序现在可以释放在步骤 2 中分配的内存。
