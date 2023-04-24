<template><div><p>所有功耗管理功能均由 TI-RTOS 电源驱动程序处理，并由外围驱动程序（例如 UART、SPI、I2C 等）使用。应用程序可以选择通过设置功率限制来阻止 CC2640R2 进入低功耗模式。</p>
<p>有关功耗管理功能的更多信息，请参阅<a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/drivers/Power_Management.pdf" target="_blank" rel="noopener noreferrer">电源管理用户指南<ExternalLinkIcon/></a>。只有在使用自定义驱动程序时才需要这些 API。</p>
<p>对于 BLE5-Stack 应用程序，通过定义 <code v-pre>POWER_SAVINGS</code> 预处理器符号在 <code v-pre>main()</code> 中设置功率约束。定义和启用后，设备会根据 BLE5-Stack 事件、外设事件、应用程序计时器等的要求进入和退出睡眠状态。未定义时，设备保持唤醒状态。</p>
<p>另请参阅 <a href="https://ti.com/lit/swra478" target="_blank" rel="noopener noreferrer">测量蓝牙智能功耗<ExternalLinkIcon/></a>，了解分析系统功耗和电池寿命的步骤。</p>
</div></template>


