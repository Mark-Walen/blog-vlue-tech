<template><div><h1 id="stm32-learning-process" tabindex="-1"><a class="header-anchor" href="#stm32-learning-process" aria-hidden="true">#</a> STM32 Learning Process</h1>
<h2 id="安装-stm32cubeide" tabindex="-1"><a class="header-anchor" href="#安装-stm32cubeide" aria-hidden="true">#</a> 安装 STM32CubeIDE</h2>
<h2 id="使用-stm32cubeide-创建一个项目" tabindex="-1"><a class="header-anchor" href="#使用-stm32cubeide-创建一个项目" aria-hidden="true">#</a> 使用 STM32CubeIDE 创建一个项目</h2>
<ol>
<li>
<p>点击 Toolbar 中的 File，然后将鼠标悬浮在 New 那一项，选择 STM32 Project。</p>
<figure><img src="/assets/img/stm32/create_project.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p>初次创建时，会自动下载相关的 SDK 和一些其他的依赖（stm32cube_fw_f4_v1270、stm32cube_fw_f4_v1271），包括驱动、以及第三方中间件（如 free-rtos）。</p>
</li>
<li>
<p>选择 MCU：根据自己芯片的特性可以很快地筛选出自己所用的 MCU。下图的左侧边栏是筛选条件，在 Commercial Part Number 输入自己使用的 MCU 型号。</p>
<figure><img src="/assets/img/stm32/Select_Board.png" alt="image-20220811003052482" tabindex="0" loading="lazy"><figcaption>image-20220811003052482</figcaption></figure>
</li>
<li>
<p>在右侧视图的下面选择自己的 MCU，然后点击 next，输入 Project 名称，点击 FInish，一个 STM32 项目就创建完成了。</p>
</li>
</ol>
<h3 id="stm32-项目目录结构" tabindex="-1"><a class="header-anchor" href="#stm32-项目目录结构" aria-hidden="true">#</a> STM32 项目目录结构</h3>
<ol>
<li>STM32 项目目录结构如下</li>
</ol>
<div class="language-path line-numbers-mode" data-ext="path"><pre v-pre class="language-path"><code>─Test_ADXL346
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>
<p>根据自己所了解的情况进行一些简单说明，主要是 Core 文件夹：</p>
<div class="language-path line-numbers-mode" data-ext="path"><pre v-pre class="language-path"><code>-─Core
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>Inc 文件夹是一些头文件目录</li>
<li>Src 文件夹是 .c 文件所在目录，包含了整个程序的启动文件 main.c。</li>
</ol>
</li>
<li>
<p>Drivers 文件夹</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>-─Drivers
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>STM32F4xx_HAL_Driver/Inc 目录中是程序可能会使用到的驱动的头文件，STM32F4xx_HAL_Driver/Src 为相对应的源文件（.c 文件）。</li>
</ol>
</li>
</ol>
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2>
<h3 id="点亮一个-led-灯" tabindex="-1"><a class="header-anchor" href="#点亮一个-led-灯" aria-hidden="true">#</a> 点亮一个 LED 灯</h3>
<ol>
<li>
<p>准备工作：查看 Drivers/STM32F4xx_HAL_Driver/Inc 目录下是否存在 <code v-pre>stm32f4xx_hal_gpio.h</code> 驱动文件</p>
<ol>
<li>
<p>如果存在则执行下一步</p>
</li>
<li>
<p>如果没有</p>
<ol>
<li>从 <code v-pre>STM32Cube_FW_F4_V1.27.1/Drivers/STM32F4xx_HAL_Driver/Inc</code> 目录下找到并添加至项目文件夹<code v-pre>Drivers/STM32F4xx_HAL_Driver/Inc</code>中。<mark>Tips：</mark> STM32Cube_FW_F4_V1.27.1 文件夹所在位置如下图所示：在用户根目录的 <code v-pre>STM32Cube/Repository</code> 目录下</li>
</ol>
<figure><img src="/assets/img/stm32/path.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>
<p>找到启用 GPIO 的配置头文件 <code v-pre>Cores/Inc/stm32f4xx_hal_conf.h</code>：</p>
<p>然后检索到如下代码位置，将<code v-pre>#define HAL_GPIO_MODULE_ENABLED</code>的注释去掉，或者在定义的末尾直接添加。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_MODULE_ENABLED</span></span>

<span class="token comment">/* #define HAL_ADC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_CRYP_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_CAN_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_CRC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_CAN_LEGACY_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_CRYP_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_DAC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_DCMI_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_DMA2D_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_ETH_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_NAND_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_NOR_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_PCCARD_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SRAM_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SDRAM_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_HASH_MODULE_ENABLED   */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_I2C_MODULE_ENABLED</span></span>
<span class="token comment">/* #define HAL_I2S_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_IWDG_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_LTDC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_RNG_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_RTC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SAI_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SD_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_MMC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SPI_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_TIM_MODULE_ENABLED   */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_UART_MODULE_ENABLED</span></span>
<span class="token comment">/* #define HAL_USART_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_IRDA_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SMARTCARD_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SMBUS_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_WWDG_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_PCD_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_HCD_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_DSI_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_QSPI_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_QSPI_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_CEC_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_FMPI2C_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_FMPSMBUS_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_SPDIFRX_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_DFSDM_MODULE_ENABLED   */</span>
<span class="token comment">/* #define HAL_LPTIM_MODULE_ENABLED   */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_GPIO_MODULE_ENABLED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_EXTI_MODULE_ENABLED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_DMA_MODULE_ENABLED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_RCC_MODULE_ENABLED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_FLASH_MODULE_ENABLED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_PWR_MODULE_ENABLED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">HAL_CORTEX_MODULE_ENABLED</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>至此添加驱动的配置就完成了，对于需要使用其他外设，也是如此配置。</p>
</li>
</ol>
</li>
<li>
<p>开始编写代码逻辑</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"main.h"</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 1. 初始化 HAL 库</span>
    <span class="token function">HAL_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 2. 现在所使用的板子总共有 5 种 GPIO 总线（A、B、C、D、H），GPIO 引脚命名规则，总线号 + 引脚号。只有开启相总线时钟后，才能使用引脚</span>
    <span class="token function">__HAL_RCC_GPIOA_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    GPIO_InitTypeDef GPIO_InitStructure<span class="token punctuation">;</span>
    <span class="token comment">// 3. LED 相关引脚初始化，现在使用的板子 LED 使用的是 PA5 引脚</span>
    <span class="token comment">// 选用 A 总线 5 号引脚</span>
    GPIO_InitStructure<span class="token punctuation">.</span>Pin <span class="token operator">=</span> GPIO_PIN_5<span class="token punctuation">;</span>
    <span class="token comment">// 选用推挽模式</span>
	GPIO_InitStructure<span class="token punctuation">.</span>Mode <span class="token operator">=</span> GPIO_MODE_OUTPUT_PP<span class="token punctuation">;</span>
    <span class="token comment">// 选择 GPIO 的速度</span>
	GPIO_InitStructure<span class="token punctuation">.</span>Speed <span class="token operator">=</span> GPIO_SPEED_FREQ_HIGH<span class="token punctuation">;</span>
    
    <span class="token comment">// GPIOA 表示选用 GPIO A 总线</span>
    <span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span>GPIOA<span class="token punctuation">,</span> GPIO_PIN_5<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 将 LED 灯电平拉高，点亮 LED。</span>
    <span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span>GPIOA<span class="token punctuation">,</span> GPIO_PIN_5<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 以下死循环是必要的。</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


