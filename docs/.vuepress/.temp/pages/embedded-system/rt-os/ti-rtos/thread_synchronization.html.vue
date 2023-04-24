<template><div><p>TI-RTOS 内核提供了几个用于同步任务的模块，例如信号量、事件和队列。以下部分讨论这些常见的 TI-RTOS 原语。</p>
<h2 id="信号量-semaphores" tabindex="-1"><a class="header-anchor" href="#信号量-semaphores" aria-hidden="true">#</a> 信号量（Semaphores）</h2>
<p>信号量通常用于整个 TI-RTOS 应用程序中的任务同步和互斥。图 42 展示了信号量功能。信号量可以是计数信号量或二进制信号量。计数信号量使用 <code v-pre>Semaphore_post()</code> 跟踪信号量发布的次数。当任务之间共享一组资源时，此功能很有用。此类任务可能会调用 Semaphore_pend() 以在使用资源之前查看资源是否可用。二进制信号量只能有两种状态：可用（count = 1）和不可用（count = 0）。二进制信号量可用于在任务之间共享单个资源，或用于信号量可多次发布的基本信号机制。二进制信号量不跟踪计数；他们只跟踪信号量是否已发布。</p>
<center><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-semaphore.jpg" alt="Semaphore Functionality" /><br /><i>图 42. 信号量功能</i></center>
<h3 id="初始化信号量" tabindex="-1"><a class="header-anchor" href="#初始化信号量" aria-hidden="true">#</a> 初始化信号量</h3>
<p>以下代码描述了如何在 TI-RTOS 中初始化信号量。可以按照创建与构建中的说明<a href="./creating_vs_constructing">创建 VS 构建信号量</a>。</p>
<p>有关如何创建信号量的信息，请参见<a href="./creating_vs_constructing#listing-2">清单 2</a>。</p>
<p>有关如何构建信号量的信息，请参见<a href="./creating_vs_constructing#listing-3">清单 3</a>。</p>
<h3 id="获取信号量" tabindex="-1"><a class="header-anchor" href="#获取信号量" aria-hidden="true">#</a> 获取信号量</h3>
<p><a href="https://software-dl.ti.com/dsps/dsps_public_sw/sdo_sb/targetcontent/sysbios/6_52_00_12/exports/bios_6_52_00_12/docs/cdoc/ti/sysbios/knl/Semaphore.html#pend" target="_blank" rel="noopener noreferrer"><code v-pre>Semaphore_pend()</code><ExternalLinkIcon/></a> 是一个阻塞函数调用。此调用只能从<mark>任务上下文</mark>中调用。调用此函数的任务将允许执行优先级较低的任务（如果它们已准备好运行）。如果计数器为 0，则调用 <code v-pre>Semaphore_pend()</code> 的任务将阻塞，否则它将计数器减 1。该任务将保持阻塞状态，直到另一个线程调用 <code v-pre>Semaphore_post()</code> 或发生调用<code v-pre>Semaphore_pend()</code>时传入的系统滴答超时；以先到者为准。通过读取 <code v-pre>Semaphore_pend()</code> 的返回值，可以区分信号量是已发布还是超时。</p>
<center><span id="listing-4">清单 4. 获取信号量</span></center>
<br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>bool isSuccessful<span class="token punctuation">;</span>
<span class="token class-name">uint32_t</span> timeout <span class="token operator">=</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1000</span><span class="token operator">/</span>Clock_tickPeriod<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* Pend (approximately) up to 1 second */</span>
isSuccessful <span class="token operator">=</span> <span class="token function">Semaphore_pend</span><span class="token punctuation">(</span>sem<span class="token punctuation">,</span> timeoutInTicks<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>isSuccessful<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">System_printf</span><span class="token punctuation">(</span><span class="token string">"Semaphore was posted"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token function">System_printf</span><span class="token punctuation">(</span><span class="token string">"Semaphore timed out"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>默认的 TI-RTOS 系统滴答周期为 1 毫秒。通过在 .cfg 文件中设置 Clock.tickPeriod = 10，将 CC2640R2 的默认值重新配置为 10 微秒。</p>
<p>给定 10 微秒的系统节拍，<a href="#listing-4">清单 4</a> 中的超时将大约为 1 秒。</p>
</div>
<h3 id="释放信号量" tabindex="-1"><a class="header-anchor" href="#释放信号量" aria-hidden="true">#</a> 释放信号量</h3>
<p>释放信号量是通过调用 <code v-pre>Semaphore_post()</code> 来完成的。在调用 <code v-pre>Semaphore_post()</code> 释放信号量后，被挂起的任务获得这个信号量将从阻塞状态转换为就绪状态。如果没有更高优先级的线程准备好运行，它将允许执行先前挂起的任务。如果信号量上没有待处理的任务，则调用 <code v-pre>Semaphore_post()</code> 将增加其计数器。二进制信号量的最大计数为 1。</p>
<center><span id="listing-5">清单 5. 释放信号量</span></center>
<br>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">Semaphore_post</span><span class="token punctuation">(</span>sem<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="事件-event" tabindex="-1"><a class="header-anchor" href="#事件-event" aria-hidden="true">#</a> 事件（Event）</h2>
<p>信号量本身提供线程之间的基本同步。在某些情况下，仅信号量本身就足以了解需要触发什么进程。然而，同步的特定原因通常也需要跨线程传递。为帮助实现这一目标，可以利用 TI-RTOS 事件模块。</p>
<p>从某种意义上说，事件类似于信号量，事件对象的每个实例实际上都包含一个信号量。使用事件的额外优势在于可以以线程安全的方式将特定事件通知给任务。</p>
<h3 id="初始化事件" tabindex="-1"><a class="header-anchor" href="#初始化事件" aria-hidden="true">#</a> 初始化事件</h3>
<p>创建和构建事件遵循<a href="./creating_vs_constructing">创建 VS 构建</a>中解释的相同准则。<a href="#listing-6">清单 6</a> 中显示的是有关如何构造事件实例的示例。</p>
<center><span id="listing-6">清单 6. 构造事件</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>Event_Handle event<span class="token punctuation">;</span>
Event_Params eventParams<span class="token punctuation">;</span>
Event_Struct structEvent<span class="token punctuation">;</span> <span class="token comment">/* Memory allocated at build time */</span>

<span class="token function">Event_Params_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>eventParams<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Event_construct</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>structEvent<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>eventParams<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* It's optional to store the handle */</span>
event <span class="token operator">=</span> <span class="token function">Event_handle</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>structEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监听事件" tabindex="-1"><a class="header-anchor" href="#监听事件" aria-hidden="true">#</a> 监听事件</h3>
<p>与 <code v-pre>Semaphore_pend()</code> 类似，任务线程通常会阻塞在 <code v-pre>Event_pend()</code> 上，直到通过 <code v-pre>Event_post()</code> 发布事件或指定的超时已过期。<a href="#listing-7">清单 7</a> 中显示的是在下面显示的 3 个示例事件 ID 中的任何一个上挂起的任务的片段。<code v-pre>BIOS_WAIT_FOREVER</code> 用于防止发生超时。结果，<code v-pre>Event_pend()</code> 将在返回的位掩码值中发布一个或多个事件。</p>
<p>从 Event_pend() 返回的每个事件都已以线程安全的方式在事件实例中自动清除。因此，只需要保留已发布事件的本地副本。有关如何使用 Event_pend() 的完整详细信息，请参阅 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf" target="_blank" rel="noopener noreferrer">TI-RTOS 内核 (SYS/BIOS) 用户指南<ExternalLinkIcon/></a>。</p>
<center><span id="listing-7">清单 7. 监听事件</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">START_ADVERTISING_EVT</span>         <span class="token expression">Event_Id_00</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">START_CONN_UPDATE_EVT</span>         <span class="token expression">Event_Id_01</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CONN_PARAM_TIMEOUT_EVT</span>        <span class="token expression">Event_Id_02</span></span>

<span class="token keyword">void</span> <span class="token function">TaskFxn</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* Local copy of events that have been posted */</span>
    <span class="token class-name">uint32_t</span> events<span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/* Wait for an event to be posted */</span>
        events <span class="token operator">=</span> <span class="token function">Event_pend</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span>
                            Event_Id_NONE<span class="token punctuation">,</span>
                            START_ADVERTISING_EVT <span class="token operator">|</span>
                            START_CONN_UPDATE_EVT <span class="token operator">|</span>
                            CONN_PARAM_TIMEOUT_EVT<span class="token punctuation">,</span>
                            BIOS_WAIT_FOREVER<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">&amp;</span> START_ADVERTISING_EVT<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">/* Process this event */</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">&amp;</span> START_CONN_UPDATE_EVT<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">/* Process this event */</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">&amp;</span> CONN_PARAM_TIMEOUT_EVT<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">/* Process this event */</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>默认的 TI-RTOS 系统滴答周期为 1 毫秒。通过在 .cfg 文件中设置 Clock.tickPeriod = 10，将 CC26xx 和 CC13xx 器件的默认值重新配置为 10 微秒。</p>
<p>给定 10 微秒的系统滴答，<a href="#listing-4">清单 4</a> 中的超时将大约为 1 秒。</p>
</div>
<h3 id="响应事件" tabindex="-1"><a class="header-anchor" href="#响应事件" aria-hidden="true">#</a> 响应事件</h3>
<p>事件可以从任何 TI-RTOS 内核上下文发布，只需调用事件实例的 <code v-pre>Event_post()</code> 和事件 ID 即可完成。<a href="#listing-8">清单 8</a> 显示了高优先级线程（例如 Swi）如何响应特定事件。</p>
<center><span id="listing-8">清单 8. 响应事件</span></center><br />
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">START_ADVERTISING_EVT</span>         <span class="token expression">Event_Id_00</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">START_CONN_UPDATE_EVT</span>         <span class="token expression">Event_Id_01</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CONN_PARAM_TIMEOUT_EVT</span>        <span class="token expression">Event_Id_02</span></span>

<span class="token keyword">void</span> <span class="token function">SwiFxn</span><span class="token punctuation">(</span>UArg arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">Event_post</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> START_ADVERTISING_EVT<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


