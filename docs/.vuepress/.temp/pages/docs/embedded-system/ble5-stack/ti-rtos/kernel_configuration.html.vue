<template><div><h2 id="内核配置" tabindex="-1"><a class="header-anchor" href="#内核配置" aria-hidden="true">#</a> 内核配置</h2>
<p>TI-RTOS 应用程序使用配置文件（<code v-pre>.cfg</code> 文件）配置 TI-RTOS 内核。在 IAR 和 CCS 项目中，此文件位于 <code v-pre>TOOLS</code> 文件夹下的应用程序项目工作区中。</p>
<p>配置是通过有选择性地引入或使用内核可用的 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-rtsc" target="_blank" rel="noopener noreferrer">RTSC<ExternalLinkIcon/></a> 模块来完成的。若要使用模块，在 <code v-pre>.cfg</code> 配置文件中调用 <code v-pre>xdc.useModule()</code> 之后，<code v-pre>xdc.useModule()</code> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow></mrow><mrow><mo stretchy="false">[</mo><mn>1</mn><mo stretchy="false">]</mo></mrow></msup></mrow><annotation encoding="application/x-tex">^{[1]}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.888em;"></span><span class="mord"><span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.888em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">[</span><span class="mord mtight">1</span><span class="mclose mtight">]</span></span></span></span></span></span></span></span></span></span></span></span> 可以设置 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf" target="_blank" rel="noopener noreferrer">TI-RTOS Kernel (SYS/BIOS) User’s Guide<ExternalLinkIcon/></a> 中定义的各种选项。</p>
<p style="color: #666;">以下内容为译者补充，了解更多 <code>XDCscript</code></p>
<blockquote>
<ul>
<li>
<p>官方 API 文档 <a href="https://software-dl.ti.com/dsps/dsps_public_sw/sdo_sb/targetcontent/rtsc/3_16_02_32/exports/docs/rtscpedia/XDCscript_-_xdc.useModule/XDCscript_-_xdc.useModule.html" target="_blank" rel="noopener noreferrer">XDCscript - xdc.useModule<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.ti.com/lit/ug/spruex4/spruex4.pdf" target="_blank" rel="noopener noreferrer">XDC Consumer User's Guide<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://blog.csdn.net/ambercctv/article/details/116175625%22" target="_blank" rel="noopener noreferrer">xdc.useModule 和 xdc.loadPackage两个函数使用心得<ExternalLinkIcon/></a></p>
</li>
</ul>
</blockquote>
<p><code v-pre>.cfg</code> 文件中可以配置的一些选项包括但不限于：</p>
<ul>
<li>Boot options</li>
<li>Hwi、Swi 和任务优先级的数量</li>
<li>Exception and Error handling</li>
<li>系统 tick 的持续时间（TI-RTOS 内核中最基本的时间单位）</li>
<li>定义应用程序的入口点和中断向量</li>
<li>TI-RTOS heaps and stacks</li>
<li>引入预编译内核和 TI-RTOS 驱动程序库</li>
<li>System providers (for System_printf())</li>
</ul>
<p>每当对 <code v-pre>.cfg</code> 文件进行更改时，您将重新运行 XDCTools 的配置工具。在提供的 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-iar" target="_blank" rel="noopener noreferrer">IAR<ExternalLinkIcon/></a> 和 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-ccs" target="_blank" rel="noopener noreferrer">CCS<ExternalLinkIcon/></a> 示例中，此步骤已作为预构建步骤为您处理。</p>
<p>对于 CC2640R2，<a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-rom" target="_blank" rel="noopener noreferrer">ROM<ExternalLinkIcon/></a> 中存在一个 TI-RTOS 内核。通常为了节省闪存占用空间，<code v-pre>.cfg</code> 将包含内核的 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-rom" target="_blank" rel="noopener noreferrer">ROM<ExternalLinkIcon/></a> 模块，如<a href="#rom-listing">清单 1</a> 所示。</p>
<center id="rom-listing"> 清单1. 如何在 ROM 中包含 TI-RTOS 内核 <br /></center>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/* ================ ROM configuration ================ */</span>
<span class="token comment">/*
 * To use BIOS in flash, comment out the code block below.
 */</span>
<span class="token keyword">var</span> <span class="token constant">ROM</span> <span class="token operator">=</span> xdc<span class="token punctuation">.</span><span class="token function">useModule</span><span class="token punctuation">(</span><span class="token string">'ti.sysbios.rom.ROM'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>Program<span class="token punctuation">.</span>cpu<span class="token punctuation">.</span>deviceName<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">CC26X2</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">ROM</span><span class="token punctuation">.</span>romName <span class="token operator">=</span> <span class="token constant">ROM</span><span class="token punctuation">.</span><span class="token constant">CC26X2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Program<span class="token punctuation">.</span>cpu<span class="token punctuation">.</span>deviceName<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">CC13X2</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">ROM</span><span class="token punctuation">.</span>romName <span class="token operator">=</span> <span class="token constant">ROM</span><span class="token punctuation">.</span><span class="token constant">CC13X2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ROM 中的 TI-RTOS 内核针对性能进行了优化。如果您的应用程序需要额外的仪器（通常用于调试），您必须在 flash 内存中包含 TI-RTOS 内核，这将增加 flash 内存消耗。</p>
<ul>
<li><code v-pre>BIOS.assertsEnabled</code> 必须设置为</li>
<li><code v-pre>BIOS.logsEnabled</code> 必须设置为 <code v-pre>false</code></li>
<li><code v-pre>BIOS.taskEnabled</code> 必须设置为 <code v-pre>true</code></li>
<li><code v-pre>BIOS.swiEnabled</code> 必须设置为 <code v-pre>true</code></li>
<li><code v-pre>BIOS.runtimeCreatesEnabled</code> 必须设置为 <code v-pre>true</code></li>
<li>BIOS 必须使用 <code v-pre>ti.sysbios.gates.GateMutex</code> 模块</li>
<li><code v-pre>Clock.tickSource</code> 必须设置为 <code v-pre>Clock.TickSource_TIMER</code></li>
<li><code v-pre>Semaphore.supportsPriority</code> must be <code v-pre>false</code></li>
<li>不允许使用 Swi, Task, and Hwi 钩子函数</li>
<li>不允许使用 Swi, Task, and Hwi 具名实例</li>
<li>禁用 Task 堆栈检查</li>
<li><code v-pre>Hwi.disablePriority</code> 必须设置为 <code v-pre>0x20</code></li>
<li><code v-pre>Hwi.dispatcherAutoNestingSupport</code> 必须设置为 <code v-pre>true</code></li>
</ul>
</div></template>


