# STM32 Learning Process

## 安装 STM32CubeIDE

## 使用 STM32CubeIDE 创建一个项目

1. 点击 Toolbar 中的 File，然后将鼠标悬浮在 New 那一项，选择 STM32 Project。

   ![](/assets/img/stm32/create_project.png)

2. 初次创建时，会自动下载相关的 SDK 和一些其他的依赖（stm32cube_fw_f4_v1270、stm32cube_fw_f4_v1271），包括驱动、以及第三方中间件（如 free-rtos）。

3. 选择 MCU：根据自己芯片的特性可以很快地筛选出自己所用的 MCU。下图的左侧边栏是筛选条件，在 Commercial Part Number 输入自己使用的 MCU 型号。

   ![image-20220811003052482](/assets/img/stm32/Select_Board.png)

4. 在右侧视图的下面选择自己的 MCU，然后点击 next，输入 Project 名称，点击 FInish，一个 STM32 项目就创建完成了。

### STM32 项目目录结构

1. STM32 项目目录结构如下

```path
─Test_ADXL346
    ├─.settings
    ├─Core
    │  ├─Inc
    │  ├─Src
    │  └─Startup
    ├─Debug
    │  ├─Core
    │  │  ├─Src
    │  │  └─Startup
    │  └─Drivers
    │      └─STM32F4xx_HAL_Driver
    │          └─Src
    └─Drivers
        ├─CMSIS
        │  ├─Device
        │  │  └─ST
        │  │      └─STM32F4xx
        │  │          ├─Include
        │  │          └─Source
        │  │              └─Templates
        │  └─Include
        └─STM32F4xx_HAL_Driver
            ├─Inc
            │  └─Legacy
            └─Src
```

2. 根据自己所了解的情况进行一些简单说明，主要是 Core 文件夹：

   ```path
   -─Core
      ├─Inc
      │      main.h
      │      stm32f4xx_hal_conf.h
      │      stm32f4xx_it.h
      │
      ├─Src
      │      main.c
      │      stm32f4xx_hal_msp.c
      │      stm32f4xx_it.c
      │      syscalls.c
      │      sysmem.c
      │      system_stm32f4xx.c
      │
      └─Startup
              startup_stm32f411retx.s
   ```

   1. Inc 文件夹是一些头文件目录
   2. Src 文件夹是 .c 文件所在目录，包含了整个程序的启动文件 main.c。

3. Drivers 文件夹

   ```markdown
   -─Drivers
      ├─CMSIS
      │  ├─Device
      │  │  └─ST
      │  │      └─STM32F4xx
      │  │          ├─Include
      │  │          └─Source
      │  │              └─Templates
      │  └─Include
      └─STM32F4xx_HAL_Driver
          ├─Inc
          │  └─Legacy
          └─Src
   ```

   1. STM32F4xx_HAL_Driver/Inc 目录中是程序可能会使用到的驱动的头文件，STM32F4xx_HAL_Driver/Src 为相对应的源文件（.c 文件）。

## 快速开始

### 点亮一个 LED 灯

1. 准备工作：查看 Drivers/STM32F4xx_HAL_Driver/Inc 目录下是否存在 `stm32f4xx_hal_gpio.h` 驱动文件

   1. 如果存在则执行下一步

   2. 如果没有

      1. 从 `STM32Cube_FW_F4_V1.27.1/Drivers/STM32F4xx_HAL_Driver/Inc` 目录下找到并添加至项目文件夹`Drivers/STM32F4xx_HAL_Driver/Inc`中。<mark>Tips：</mark> STM32Cube_FW_F4_V1.27.1 文件夹所在位置如下图所示：在用户根目录的 `STM32Cube/Repository` 目录下

      ![](/assets/img/stm32/path.png)

      2. 找到启用 GPIO 的配置头文件 `Cores/Inc/stm32f4xx_hal_conf.h`：

         然后检索到如下代码位置，将`#define HAL_GPIO_MODULE_ENABLED`的注释去掉，或者在定义的末尾直接添加。

         ```c
         #define HAL_MODULE_ENABLED
         
         /* #define HAL_ADC_MODULE_ENABLED   */
         /* #define HAL_CRYP_MODULE_ENABLED   */
         /* #define HAL_CAN_MODULE_ENABLED   */
         /* #define HAL_CRC_MODULE_ENABLED   */
         /* #define HAL_CAN_LEGACY_MODULE_ENABLED   */
         /* #define HAL_CRYP_MODULE_ENABLED   */
         /* #define HAL_DAC_MODULE_ENABLED   */
         /* #define HAL_DCMI_MODULE_ENABLED   */
         /* #define HAL_DMA2D_MODULE_ENABLED   */
         /* #define HAL_ETH_MODULE_ENABLED   */
         /* #define HAL_NAND_MODULE_ENABLED   */
         /* #define HAL_NOR_MODULE_ENABLED   */
         /* #define HAL_PCCARD_MODULE_ENABLED   */
         /* #define HAL_SRAM_MODULE_ENABLED   */
         /* #define HAL_SDRAM_MODULE_ENABLED   */
         /* #define HAL_HASH_MODULE_ENABLED   */
         #define HAL_I2C_MODULE_ENABLED
         /* #define HAL_I2S_MODULE_ENABLED   */
         /* #define HAL_IWDG_MODULE_ENABLED   */
         /* #define HAL_LTDC_MODULE_ENABLED   */
         /* #define HAL_RNG_MODULE_ENABLED   */
         /* #define HAL_RTC_MODULE_ENABLED   */
         /* #define HAL_SAI_MODULE_ENABLED   */
         /* #define HAL_SD_MODULE_ENABLED   */
         /* #define HAL_MMC_MODULE_ENABLED   */
         /* #define HAL_SPI_MODULE_ENABLED   */
         /* #define HAL_TIM_MODULE_ENABLED   */
         #define HAL_UART_MODULE_ENABLED
         /* #define HAL_USART_MODULE_ENABLED   */
         /* #define HAL_IRDA_MODULE_ENABLED   */
         /* #define HAL_SMARTCARD_MODULE_ENABLED   */
         /* #define HAL_SMBUS_MODULE_ENABLED   */
         /* #define HAL_WWDG_MODULE_ENABLED   */
         /* #define HAL_PCD_MODULE_ENABLED   */
         /* #define HAL_HCD_MODULE_ENABLED   */
         /* #define HAL_DSI_MODULE_ENABLED   */
         /* #define HAL_QSPI_MODULE_ENABLED   */
         /* #define HAL_QSPI_MODULE_ENABLED   */
         /* #define HAL_CEC_MODULE_ENABLED   */
         /* #define HAL_FMPI2C_MODULE_ENABLED   */
         /* #define HAL_FMPSMBUS_MODULE_ENABLED   */
         /* #define HAL_SPDIFRX_MODULE_ENABLED   */
         /* #define HAL_DFSDM_MODULE_ENABLED   */
         /* #define HAL_LPTIM_MODULE_ENABLED   */
         #define HAL_GPIO_MODULE_ENABLED
         #define HAL_EXTI_MODULE_ENABLED
         #define HAL_DMA_MODULE_ENABLED
         #define HAL_RCC_MODULE_ENABLED
         #define HAL_FLASH_MODULE_ENABLED
         #define HAL_PWR_MODULE_ENABLED
         #define HAL_CORTEX_MODULE_ENABLED
         ```

   3. 至此添加驱动的配置就完成了，对于需要使用其他外设，也是如此配置。

2. 开始编写代码逻辑

   ```c
   #include "main.h"
   
   int main(void)
   {
       // 1. 初始化 HAL 库
       HAL_Init();
       
       // 2. 现在所使用的板子总共有 5 种 GPIO 总线（A、B、C、D、H），GPIO 引脚命名规则，总线号 + 引脚号。只有开启相总线时钟后，才能使用引脚
       __HAL_RCC_GPIOA_CLK_ENABLE();
       
       GPIO_InitTypeDef GPIO_InitStructure;
       // 3. LED 相关引脚初始化，现在使用的板子 LED 使用的是 PA5 引脚
       // 选用 A 总线 5 号引脚
       GPIO_InitStructure.Pin = GPIO_PIN_5;
       // 选用推挽模式
   	GPIO_InitStructure.Mode = GPIO_MODE_OUTPUT_PP;
       // 选择 GPIO 的速度
   	GPIO_InitStructure.Speed = GPIO_SPEED_FREQ_HIGH;
       
       // GPIOA 表示选用 GPIO A 总线
       HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);
       
       // 将 LED 灯电平拉高，点亮 LED。
       HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);
       
       // 以下死循环是必要的。
       while(1)
       {
           
       }
   }
   ```

   