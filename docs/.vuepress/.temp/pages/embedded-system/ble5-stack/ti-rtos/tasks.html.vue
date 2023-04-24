<template><div><p>TI-RTOS 任务在概念上等同于在单个 C 程序中并行执行函数的独立线程。实际上，将处理器从一项任务切换到另一项任务有助于实现并发。每个任务始终处于以下执行模式之一：</p>
<ul>
<li><strong>执行</strong>：任务当前正在运行</li>
<li><strong>就绪</strong>： 任务被安排执行</li>
<li><strong>阻塞</strong>：任务暂停执行</li>
<li><strong>停止</strong>：任务执行完成后，进入终止状态</li>
<li><strong>静止</strong>：任务在非活动列表中</li>
</ul>
<p>一个（并且只有一个）任务始终在运行，即使它只是空闲任务（参见<RouterLink to="/embedded-system/ble5-stack/ti-rtos/#figure-40">图 40</RouterLink>）。当前运行的任务可以通过调用某些任务模块函数以及其他模块（如信号量）提供的函数来阻止执行。当前任务也可以自行终止。在任何一种情况下，处理器都会切换到准备运行的最高优先级任务。有关这些功能的更多信息，请参阅 <a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf" target="_blank" rel="noopener noreferrer">TI-RTOS 内核 (SYS/BIOS) 用户指南<ExternalLinkIcon/></a>的包 <code v-pre>ti.sysbios.knl</code> 部分中的任务模块。</p>
<p>数字优先级分配给任务，多个任务可以具有相同的优先级。任务已准备好按从高到低的优先级执行；相同优先级的任务按到达顺序安排。当前正在运行的任务的优先级永远不会低于任何就绪任务的优先级。当有更高优先级的就绪任务时，正在运行的任务将被抢占并重新安排执行。</p>
<p>在 simple_peripheral 应用程序中，低功耗蓝牙协议栈任务被赋予最高优先级 (5)，而应用程序任务被赋予最低优先级 (1)。</p>
<h2 id="初始化任务" tabindex="-1"><a class="header-anchor" href="#初始化任务" aria-hidden="true">#</a> 初始化任务</h2>
<p>当任务被初始化时，它有自己的运行时堆栈，用于存储局部变量以及函数调用的进一步嵌套。在单个程序中执行的所有任务共享一组通用的全局变量，根据 C 函数作用域的标准规则进行访问。这套记忆就是任务的上下文。以下是正在构建的应用程序任务的示例。</p>
<center><span id="listing-13">清单 13. 一个 TI-RTOS 任务</span></center><br/>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;xdc/std.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;ti/sysbios/BIOS.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;ti/sysbios/knl/Task.h></span></span>

<span class="token comment">/* Task's stack */</span>
<span class="token class-name">uint8_t</span> sbcTaskStack<span class="token punctuation">[</span>TASK_STACK_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">/* Task object (to be constructed) */</span>
Task_Struct task0<span class="token punctuation">;</span>

<span class="token comment">/* Task function */</span>
<span class="token keyword">void</span> <span class="token function">taskFunction</span><span class="token punctuation">(</span>UArg arg0<span class="token punctuation">,</span> UArg arg1<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* Local variables. Variables here go onto task stack!! */</span>

    <span class="token comment">/* Run one-time code when task starts */</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">/* Run loop forever (unless terminated) */</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/*
         * Block on a signal or for a duration. Examples:
         *  ``Sempahore_pend()``
         *  ``Event_pend()``
         *  ``Task_sleep()``
         *
         * "Process data"
         */</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    Task_Params taskParams<span class="token punctuation">;</span>

    <span class="token comment">// Configure task</span>
    <span class="token function">Task_Params_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>taskParams<span class="token punctuation">)</span><span class="token punctuation">;</span>
    taskParams<span class="token punctuation">.</span>stack <span class="token operator">=</span> sbcTaskStack<span class="token punctuation">;</span>
    taskParams<span class="token punctuation">.</span>stackSize <span class="token operator">=</span> TASK_STACK_SIZE<span class="token punctuation">;</span>
    taskParams<span class="token punctuation">.</span>priority <span class="token operator">=</span> TASK_PRIORITY<span class="token punctuation">;</span>

    <span class="token function">Task_construct</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>task0<span class="token punctuation">,</span> taskFunction<span class="token punctuation">,</span> <span class="token operator">&amp;</span>taskParams<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">BIOS_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>BIOS_start()</code> 启动 TI-RTOS 内核的调度程序之前，任务创建在 <code v-pre>main() </code>函数中完成。调度程序启动后，任务将以指定的优先级执行。</p>
<p>TI 建议使用现有的应用程序任务进行特定于应用程序的处理。将附加任务添加到应用程序项目时，必须在 TI-RTOS 优先级范围内为任务的优先级分配优先级，该范围在 TI-RTOS 配置文件 (<code v-pre>.cfg</code>) 中定义。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>减少任务优先级的数量以获得 TI-RTOS 配置文件 (.cfg) 中的额外 RAM 节省：</p>
<p><code v-pre>Task.numPriorities = 6;</code></p>
</div>
<p>不要添加优先级等于或高于蓝牙低功耗协议栈任务和相关支持任务的任务。有关系统任务层次结构的详细信息，请参阅<a href="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-tirtos/tasks.html#initializing-a-task" target="_blank" rel="noopener noreferrer">标准项目任务层次结构<ExternalLinkIcon/></a>。</p>
<p>确保任务的最小任务堆栈大小为 512 字节的预定义内存。至少，每个堆栈必须足够大以处理正常的子例程调用和一个任务抢占上下文。任务抢占上下文是当一个任务由于中断线程准备更高优先级任务而抢占另一个任务时保存的上下文。使用 IDE 的 TI-RTOS 分析工具，可以分析任务以确定峰值任务堆栈使用情况。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>术语<em>创建</em>描述了任务的实例化。实际的 TI-RTOS 方法是构建任务。有关构建 TI-RTOS 对象的详细信息，请参阅<a href="./creating_vs_constructing">创建 vs 构造</a>。</p>
</div>
<h2 id="任务函数" tabindex="-1"><a class="header-anchor" href="#任务函数" aria-hidden="true">#</a> 任务函数</h2>
<p>当一个任务被初始化时，一个指向任务函数的函数指针被传递给 <code v-pre>Task_construct</code> 函数。当任务第一次有机会处理时，这是 TI-RTOS 运行的函数。<a href="#listing-13">清单 13</a>. 显示了这个 Task 函数的一般拓扑结构。在典型的用例中，任务大部分时间都处于阻塞状态，它会调用 <code v-pre>_pend()</code> API，例如 <code v-pre>Semaphore_pend()</code>。通常，高优先级线程（例如 Hwis 或 Swis）使用 <code v-pre>_post()</code> API（例如 <code v-pre>Semaphore_post()</code>）解除任务阻塞。</p>
</div></template>


