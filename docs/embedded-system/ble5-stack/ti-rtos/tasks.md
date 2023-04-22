---
title: 任务
date: 2023-01-13
description: 本文是对 ti rtos 官方文档的翻译
autoSort: -4
---
TI-RTOS 任务在概念上等同于在单个 C 程序中并行执行函数的独立线程。实际上，将处理器从一项任务切换到另一项任务有助于实现并发。每个任务始终处于以下执行模式之一：

* **执行**：任务当前正在运行
* **就绪**： 任务被安排执行
* **阻塞**：任务暂停执行
* **停止**：任务执行完成后，进入终止状态
* **静止**：任务在非活动列表中

一个（并且只有一个）任务始终在运行，即使它只是空闲任务（参见[图 40](./#figure-40)）。当前运行的任务可以通过调用某些任务模块函数以及其他模块（如信号量）提供的函数来阻止执行。当前任务也可以自行终止。在任何一种情况下，处理器都会切换到准备运行的最高优先级任务。有关这些功能的更多信息，请参阅 [TI-RTOS 内核 (SYS/BIOS) 用户指南](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf)的包 `ti.sysbios.knl` 部分中的任务模块。

数字优先级分配给任务，多个任务可以具有相同的优先级。任务已准备好按从高到低的优先级执行；相同优先级的任务按到达顺序安排。当前正在运行的任务的优先级永远不会低于任何就绪任务的优先级。当有更高优先级的就绪任务时，正在运行的任务将被抢占并重新安排执行。

在 simple_peripheral 应用程序中，低功耗蓝牙协议栈任务被赋予最高优先级 (5)，而应用程序任务被赋予最低优先级 (1)。

## 初始化任务

当任务被初始化时，它有自己的运行时堆栈，用于存储局部变量以及函数调用的进一步嵌套。在单个程序中执行的所有任务共享一组通用的全局变量，根据 C 函数作用域的标准规则进行访问。这套记忆就是任务的上下文。以下是正在构建的应用程序任务的示例。

<center><span id="listing-13">清单 13. 一个 TI-RTOS 任务</span></center><br/>

```c
#include <xdc/std.h>
#include <ti/sysbios/BIOS.h>
#include <ti/sysbios/knl/Task.h>

/* Task's stack */
uint8_t sbcTaskStack[TASK_STACK_SIZE];

/* Task object (to be constructed) */
Task_Struct task0;

/* Task function */
void taskFunction(UArg arg0, UArg arg1)
{
    /* Local variables. Variables here go onto task stack!! */

    /* Run one-time code when task starts */

    while (1) /* Run loop forever (unless terminated) */
    {
        /*
         * Block on a signal or for a duration. Examples:
         *  ``Sempahore_pend()``
         *  ``Event_pend()``
         *  ``Task_sleep()``
         *
         * "Process data"
         */
    }
}

int main() {

    Task_Params taskParams;

    // Configure task
    Task_Params_init(&taskParams);
    taskParams.stack = sbcTaskStack;
    taskParams.stackSize = TASK_STACK_SIZE;
    taskParams.priority = TASK_PRIORITY;

    Task_construct(&task0, taskFunction, &taskParams, NULL);

    BIOS_start();
}
```

在 `BIOS_start()` 启动 TI-RTOS 内核的调度程序之前，任务创建在 `main() `函数中完成。调度程序启动后，任务将以指定的优先级执行。

TI 建议使用现有的应用程序任务进行特定于应用程序的处理。将附加任务添加到应用程序项目时，必须在 TI-RTOS 优先级范围内为任务的优先级分配优先级，该范围在 TI-RTOS 配置文件 (`.cfg`) 中定义。

:::tip

减少任务优先级的数量以获得 TI-RTOS 配置文件 (.cfg) 中的额外 RAM 节省：

`Task.numPriorities = 6;`

:::

不要添加优先级等于或高于蓝牙低功耗协议栈任务和相关支持任务的任务。有关系统任务层次结构的详细信息，请参阅[标准项目任务层次结构](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-tirtos/tasks.html#initializing-a-task)。

确保任务的最小任务堆栈大小为 512 字节的预定义内存。至少，每个堆栈必须足够大以处理正常的子例程调用和一个任务抢占上下文。任务抢占上下文是当一个任务由于中断线程准备更高优先级任务而抢占另一个任务时保存的上下文。使用 IDE 的 TI-RTOS 分析工具，可以分析任务以确定峰值任务堆栈使用情况。

:::tip

术语*创建*描述了任务的实例化。实际的 TI-RTOS 方法是构建任务。有关构建 TI-RTOS 对象的详细信息，请参阅[创建 vs 构造](./creating_vs_constructing)。

:::

## 任务函数

当一个任务被初始化时，一个指向任务函数的函数指针被传递给 `Task_construct` 函数。当任务第一次有机会处理时，这是 TI-RTOS 运行的函数。[清单 13](#listing-13). 显示了这个 Task 函数的一般拓扑结构。在典型的用例中，任务大部分时间都处于阻塞状态，它会调用 `_pend()` API，例如 `Semaphore_pend()`。通常，高优先级线程（例如 Hwis 或 Swis）使用 `_post()` API（例如 `Semaphore_post()`）解除任务阻塞。
