<template><div><p>TI-RTOS 队列模块提供了一个线程安全的单向消息传递模块，以先进先出 (FIFO) 的方式运行。队列通常用于允许高优先级线程将消息传递给低优先级任务以进行延迟处理；因此允许低优先级任务阻塞直到需要运行。</p>
<p>在图 43 中，队列配置为从任务 A 到任务 B 的单向通信。任务 A 将消息“放入”队列，任务 B 从队列中“获取”消息。</p>
<center id="figure-43"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-queue-messaging-process.jpg" alt="Semaphore Functionality" /><br /><i>图 43. 队列消息处理</i></center>
<p>在 BLE5-Stack 中，TI-RTOS 队列函数已被抽象为 <code v-pre>util.c</code> 中的函数，请参阅 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf" target="_blank" rel="noopener noreferrer">TI-RTOS 内核 (SYS/BIOS) 用户指南<ExternalLinkIcon/></a>中的队列模块文档。<code v-pre>util.c</code> 中的函数将 Queue 模块中的队列与 Event 模块中的事件组合在一起，以在线程之间传递消息。</p>
<p>在 CC2640R2 软件中，ICall 使用来自各自模块的队列和事件在应用程序和堆栈任务之间传递消息。这方面的一个例子可以在 <code v-pre>SimpleCentral_enqueueMsg()</code> 中看到。高优先级任务、Swi 或 Hwi 将消息排队到应用程序任务。当没有其他高优先级线程正在运行时，应用程序任务将在其自己的上下文中处理此消息。</p>
<p><code v-pre>util</code> 模块包含一组抽象的 TI-RTOS 队列函数，如下所示：</p>
<ul>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga1a402aa73798e67c21ea960bb67ed516" target="_blank" rel="noopener noreferrer"><code v-pre>Util_constructQueue()</code><ExternalLinkIcon/></a> 创建队列。</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#gada1270148b25421486d6a0f6e001a3b5" target="_blank" rel="noopener noreferrer"><code v-pre>Util_enqueueMsg()</code><ExternalLinkIcon/></a> 入队。</li>
<li><a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#ga2119072ce502da984eed8a9dd614da07" target="_blank" rel="noopener noreferrer"><code v-pre>Util_dequeueMsg()</code><ExternalLinkIcon/></a> 出队。</li>
</ul>
<h2 id="功能示例" tabindex="-1"><a class="header-anchor" href="#功能示例" aria-hidden="true">#</a> 功能示例</h2>
<p><a href="#figure-44">图 44</a> 和<a href="#figure-45">图 45</a> 说明了如何使用队列将来自 Hwi 的按钮按下消息排队（到 Board Key 模块中的 Swi）以在任务上下文中进行后处理。此示例取自 BLE5-Stack 中的 simple_central 项目。</p>
<center  id="figure-44"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/plantuml-d2d063751a6f60aa88d8c95dba442896549d0f77.png" /><br /><i>图 44. 消息入队时序图</i></center>
<p>启用中断后，引脚中断可以在 Hwi 上下文中异步发生。为了使中断尽可能短，与中断相关的工作被推迟到任务进行处理。在 BLE5-Stack 中的 simple_central 示例中，引脚中断是通过 Board Key 模块抽象出来的。该模块通过 Swi 回调通知已注册的函数。在这种情况下，SimpleCentral_keyChangeHandler 是注册的回调函数。</p>
<p><a href="#figure-44">图 44</a> 中的步骤 1 显示了按下某个键时对 SimpleCentral_keyChangeHandler 的回调。该事件被放入应用程序的队列中进行处理。</p>
<center><span id="listing-9">清单 9. 定义 SimpleCentral_keyChangeHandler()</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">SimpleCentral_keyChangeHandler</span><span class="token punctuation">(</span>uint8 keys<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">SimpleCentral_enqueueMsg</span><span class="token punctuation">(</span>SC_KEY_CHANGE_EVT<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="#figure-44">图 44</a> 中的步骤 2 显示了此按键是如何为 simple_central 任务排队的。在这里，内存是通过 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___i_call.html#ga00ce08b268a246cee700442af6ac10ec" target="_blank" rel="noopener noreferrer">ICall_malloc()<ExternalLinkIcon/></a> 分配的，因此可以将消息添加到队列中。添加后，<a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/doxygen/ble/html/group___util.html#gada1270148b25421486d6a0f6e001a3b5" target="_blank" rel="noopener noreferrer">Util_enqueueMsg()<ExternalLinkIcon/></a> 将生成一个 UTIL_QUEUE_EVENT_ID 事件以通知应用程序进行处理。</p>
<center><span id="listing-10">清单 10. 定义 SimpleCentral_enqueueMsg()</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">static</span> <span class="token class-name">uint8_t</span> <span class="token function">SimpleCentral_enqueueMsg</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> event<span class="token punctuation">,</span> <span class="token class-name">uint8_t</span> state<span class="token punctuation">,</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>pData<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name">scEvt_t</span> <span class="token operator">*</span>pMsg <span class="token operator">=</span> <span class="token function">ICall_malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token class-name">scEvt_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Create dynamic pointer to message.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pMsg<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    pMsg<span class="token operator">-></span>hdr<span class="token punctuation">.</span>event <span class="token operator">=</span> event<span class="token punctuation">;</span>
    pMsg<span class="token operator">-></span>hdr<span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    pMsg<span class="token operator">-></span>pData <span class="token operator">=</span> pData<span class="token punctuation">;</span>

    <span class="token comment">// Enqueue the message.</span>
    <span class="token keyword">return</span> <span class="token function">Util_enqueueMsg</span><span class="token punctuation">(</span>appMsgQueue<span class="token punctuation">,</span> syncEvent<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>pMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>false<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><center id="figure-45"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/plantuml-258398d03de89f27b5ace3b65194be1d11b2b676.png" /><br /><i>图 45. 消息入队时序图</i></center>
<p><a href="#figure-45">图 45</a> 中的第 3 步，simple_central 应用程序被发布的 <code v-pre>UTIL_QUEUE_EVENT_ID</code> 事件解除阻塞，它继续检查消息是否已放入队列中进行处理。</p>
<center><span id="listing-11">清单 11. 处理应用消息</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// If RTOS queue is not empty, process app message</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">&amp;</span> SC_QUEUE_EVT<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">scEvt_t</span> <span class="token operator">*</span>pMsg<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>pMsg <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">scEvt_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">Util_dequeueMsg</span><span class="token punctuation">(</span>appMsgQueue<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Process message</span>
        <span class="token function">SimpleCentral_processAppMsg</span><span class="token punctuation">(</span>pMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Free the space from the message</span>
        <span class="token function">ICall_free</span><span class="token punctuation">(</span>pMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="#figure-45">图 45</a> 中的第 4 步，simple_central 应用程序获取出队消息并对其进行处理。</p>
<center><span id="listing-12">清单 12. 处理按键中断消息</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">SimpleCentral_processAppMsg</span><span class="token punctuation">(</span><span class="token class-name">sbcEvt_t</span> <span class="token operator">*</span>pMsg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>pMsg<span class="token operator">-></span>hdr<span class="token punctuation">.</span>event<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">case</span> SC_KEY_CHANGE_EVT<span class="token operator">:</span>
      <span class="token function">SimpleCentral_handleKeys</span><span class="token punctuation">(</span>pMsg<span class="token operator">-></span>hdr<span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">//...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="#figure-45">图 45</a> 中的第 5 步，simple_central 应用程序现在可以释放在步骤 2 中分配的内存。</p>
</div></template>


