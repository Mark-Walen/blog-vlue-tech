<template><div><p>时钟实例是可以安排在一定数量的系统滴答后运行的函数。时钟实例是一次性的或周期性的。这些实例在创建后立即启动，配置为在延迟后启动，并且可以随时停止。所有时钟实例在 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-swi" target="_blank" rel="noopener noreferrer">Swi<ExternalLinkIcon/></a> 上下文中过期时执行。以下示例显示最小分辨率是 TI-RTOS 配置文件 (<code v-pre>.cfg</code>) 中设置的 TI-RTOS 时钟节拍周期。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>默认的 TI-RTOS 内核节拍周期为 1 毫秒。对于 CC2640R2 设备，这在 TI-RTOS 配置文件 (.cfg) 中重新配置：</p>
<div class="language-cfg line-numbers-mode" data-ext="cfg"><pre v-pre class="language-cfg"><code>Clock.tickPeriod = 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<p>派生自实时时钟 RTC 的每个系统节拍都会启动一个时钟对象，该对象将运行节拍计数与每个时钟的周期进行比较，以确定相关函数是否应该运行。对于更高分辨率的定时器，TI 建议使用 16 位硬件定时器通道或传感器控制器。请参阅 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf" target="_blank" rel="noopener noreferrer">TI-RTOS 内核 (SYS/BIOS) 用户指南<ExternalLinkIcon/></a>的包 <code v-pre>ti.sysbios.knl</code> 部分中的时钟模块。有关这些功能的更多信息。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>传感器控制器在 <a href="https://www.ti.com/product/CC2640R2L" target="_blank" rel="noopener noreferrer">CC2640R2L<ExternalLinkIcon/></a> 上不可用。</p>
</div>
<p>您可以直接在您的应用程序中使用内核的时钟 API，此外，Util 模块还包含一组抽象的 TI-RTOS 时钟函数，如下所示：</p>
<ul>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga761dca11dc0c6199168011949db793c5" target="_blank" rel="noopener noreferrer">Util_constructClock()<ExternalLinkIcon/></a> 创建一个时钟对象。</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga1c499454cba90c216ab2514b54f7ce88" target="_blank" rel="noopener noreferrer">Util_startClock()<ExternalLinkIcon/></a> 启动一个存在的时钟对象.</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga3d36870c30686d68d7096fd333090c3f" target="_blank" rel="noopener noreferrer">Util_restartClock()<ExternalLinkIcon/></a> 停止，重启一个存在的时钟对象.</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga077436ed5f5a43a39f8c96cba253160e" target="_blank" rel="noopener noreferrer">Util_isActive()<ExternalLinkIcon/></a> 检查时钟对象是否正在运行.</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#gae0a8cd00a21d57e55a96283336ceab17" target="_blank" rel="noopener noreferrer">Util_stopClock()<ExternalLinkIcon/></a> 停止一个存在的时钟对象.</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga59503ce945c3762bb32e8a1e2cb9c8f9" target="_blank" rel="noopener noreferrer">Util_rescheduleClock()<ExternalLinkIcon/></a> 重新配置一个存在的时钟对象.</li>
</ul>
<h2 id="功能示例" tabindex="-1"><a class="header-anchor" href="#功能示例" aria-hidden="true">#</a> 功能示例</h2>
<p>以下示例取自 BLE5-Stack 中的 simple_peripheral 项目。</p>
<center id="figure-46"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/plantuml-5ab860f1261838a17544f9a753c20ad9825851ff.png" /><br /><i>图 46. 触发时钟对象</i></center>
<p><strong>步骤 1</strong> ，通过 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga761dca11dc0c6199168011949db793c5" target="_blank" rel="noopener noreferrer">Util_constructClock()<ExternalLinkIcon/></a> 构造时钟对象。在示例进入连接状态后，它将通过 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga1c499454cba90c216ab2514b54f7ce88" target="_blank" rel="noopener noreferrer">Util_startClock()<ExternalLinkIcon/></a> 启动时钟对象。</p>
<center><span id="listing-14">清单 14. 在simple_peripheral中构造`periodicClock`时钟对象</span></center><br/>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// Clock instances for internal periodic events.</span>
<span class="token keyword">static</span> Clock_Struct periodicClock<span class="token punctuation">;</span>

<span class="token comment">// Create one-shot clocks for internal periodic events.</span>
<span class="token function">Util_constructClock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>periodicClock<span class="token punctuation">,</span> SimplePeripheral_clockHandler<span class="token punctuation">,</span>
    SP_PERIODIC_EVT_PERIOD<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> false<span class="token punctuation">,</span> SP_PERIODIC_EVT<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤 2</strong>，当 Clock 对象的定时器超时后，它将在 Swi 上下文中执行 <code v-pre>SimplePeripheral_clockHandler()</code>。由于无法阻止此调用并阻止所有任务，因此通过调用 <code v-pre>Event_post(SP_PERIODIC_EVT)</code> 在 simple_peripheral 中进行后处理来保持简短。</p>
<center><span id="listing-15">清单 15. 定义 SimplePeripheral_clockHandler()</span></center><br/>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">SimplePeripheral_clockHandler</span><span class="token punctuation">(</span>UArg arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* arg is passed in from Clock_construct() */</span>
    <span class="token function">Event_post</span><span class="token punctuation">(</span>events<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>时钟函数不得调用阻塞内核 API 或 TI-RTOS 驱动程序 API！执行长例程将影响分配给无线协议栈的高优先级任务中的实时约束！</p>
</div>
<p><strong>步骤 3</strong>，由于 <code v-pre>Event_post(SP_PERIODIC_EVT)</code>，simple_peripheral 任务被解锁，它继续调用 <code v-pre>SimplePeripheral_performPeriodicTask()</code> 函数。之后，要重新启动此函数的周期性执行，它将重新启动 <code v-pre>periodicClock</code> 时钟对象。</p>
<center><span id="listing-16">清单 16. 为 SP_PERIODIC_EVT 事件提供服务</span></center><br/>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">&amp;</span> SP_PERIODIC_EVT<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Perform periodic application task</span>
  <span class="token function">SimplePeripheral_performPeriodicTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">Util_startClock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>periodicClock<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


