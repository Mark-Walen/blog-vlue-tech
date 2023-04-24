---
title: 功耗管理
date: 2023-02-20
description: 本文是对 ti rtos 官方文档的翻译
autoSort: -6
---

所有功耗管理功能均由 TI-RTOS 电源驱动程序处理，并由外围驱动程序（例如 UART、SPI、I2C 等）使用。应用程序可以选择通过设置功率限制来阻止 CC2640R2 进入低功耗模式。

有关功耗管理功能的更多信息，请参阅[电源管理用户指南](https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/drivers/Power_Management.pdf)。只有在使用自定义驱动程序时才需要这些 API。

对于 BLE5-Stack 应用程序，通过定义 `POWER_SAVINGS` 预处理器符号在 `main()` 中设置功率约束。定义和启用后，设备会根据 BLE5-Stack 事件、外设事件、应用程序计时器等的要求进入和退出睡眠状态。未定义时，设备保持唤醒状态。

另请参阅 [测量蓝牙智能功耗](https://ti.com/lit/swra478)，了解分析系统功耗和电池寿命的步骤。