---
title: 内核配置
date: 2023-01-09
description: 本文是对 ti rtos 官方文档的翻译
---
## 内核配置
TI-RTOS 应用程序使用配置文件（`.cfg` 文件）配置 TI-RTOS 内核。在 IAR 和 CCS 项目中，此文件位于 `TOOLS` 文件夹下的应用程序项目工作区中。

配置是通过有选择性地引入或使用内核可用的 [RTSC](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-rtsc) 模块来完成的。若要使用模块，在 `.cfg` 配置文件中调用 `xdc.useModule()` 之后，`xdc.useModule()` $^{[1]}$ 可以设置 [TI-RTOS Kernel (SYS/BIOS) User’s Guide](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf) 中定义的各种选项。

<p style="color: #666;">以下内容为译者补充，了解更多 <code>XDCscript</code></p>

> * 官方 API 文档 [XDCscript - xdc.useModule](https://software-dl.ti.com/dsps/dsps_public_sw/sdo_sb/targetcontent/rtsc/3_16_02_32/exports/docs/rtscpedia/XDCscript_-_xdc.useModule/XDCscript_-_xdc.useModule.html)
> * [XDC Consumer User's Guide](https://www.ti.com/lit/ug/spruex4/spruex4.pdf)
>
> * [xdc.useModule 和 xdc.loadPackage两个函数使用心得](https://blog.csdn.net/ambercctv/article/details/116175625")

`.cfg` 文件中可以配置的一些选项包括但不限于：

* Boot options
* Hwi、Swi 和任务优先级的数量
* Exception and Error handling
* 系统 tick 的持续时间（TI-RTOS 内核中最基本的时间单位）
* 定义应用程序的入口点和中断向量
* TI-RTOS heaps and stacks
* 引入预编译内核和 TI-RTOS 驱动程序库
* System providers (for System_printf())

每当对 `.cfg` 文件进行更改时，您将重新运行 XDCTools 的配置工具。在提供的 [IAR](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-iar) 和 [CCS](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-ccs) 示例中，此步骤已作为预构建步骤为您处理。

对于 CC2640R2，[ROM](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-rom) 中存在一个 TI-RTOS 内核。通常为了节省闪存占用空间，`.cfg` 将包含内核的 [ROM](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-rom) 模块，如[清单 1](#rom-listing) 所示。

<center id="rom-listing"> 清单1. 如何在 ROM 中包含 TI-RTOS 内核 <br /></center>

```js
/* ================ ROM configuration ================ */
/*
 * To use BIOS in flash, comment out the code block below.
 */
var ROM = xdc.useModule('ti.sysbios.rom.ROM');
if (Program.cpu.deviceName.match(/CC26X2/)) {
    ROM.romName = ROM.CC26X2;
}
else if (Program.cpu.deviceName.match(/CC13X2/)) {
    ROM.romName = ROM.CC13X2;
}
```

ROM 中的 TI-RTOS 内核针对性能进行了优化。如果您的应用程序需要额外的仪器（通常用于调试），您必须在 flash 内存中包含 TI-RTOS 内核，这将增加 flash 内存消耗。

* `BIOS.assertsEnabled` 必须设置为 
* `BIOS.logsEnabled` 必须设置为 `false`
* `BIOS.taskEnabled` 必须设置为 `true`
* `BIOS.swiEnabled` 必须设置为 `true`
* `BIOS.runtimeCreatesEnabled` 必须设置为 `true`
* BIOS 必须使用 `ti.sysbios.gates.GateMutex` 模块
* `Clock.tickSource` 必须设置为 `Clock.TickSource_TIMER`
* `Semaphore.supportsPriority` must be `false`
* 不允许使用 Swi, Task, and Hwi 钩子函数
* 不允许使用 Swi, Task, and Hwi 具名实例
* 禁用 Task 堆栈检查
* `Hwi.disablePriority` 必须设置为 `0x20`
* `Hwi.dispatcherAutoNestingSupport` 必须设置为 `true`
