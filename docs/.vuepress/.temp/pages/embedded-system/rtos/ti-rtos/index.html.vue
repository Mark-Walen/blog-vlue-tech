<template><div><p>TI-RTOS 内核管理四种不同线程执行的上下文级别。线程模块按优先级降序显示如下：</p>
<ul>
<li>硬件中断</li>
<li>软件中断</li>
<li>任务</li>
<li>后台空闲函数的空闲任务</li>
</ul>
<div class="figure align-center" id="figure-40">
    <span id="fig-tirtos-threads"></span>
    <img class="medium-zoom-image" alt="TI-RTOS Execution Threads" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-tirtos-threads.jpg">
    <p class="caption">
        <span class="caption-number">Figure 40. </span>
        <span class="caption-text">图 40. TI-RTOS 执行线程</span>
    </p>
</div>
<h2 id="硬件中断-hwi" tabindex="-1"><a class="header-anchor" href="#硬件中断-hwi" aria-hidden="true">#</a> 硬件中断（Hwi）</h2>
<p>在 TI-RTOS 应用中，硬件中断线程（也被称为中断服务例程或 ISRs）拥有最高优先级。硬件中断线程用于执行有严格时间期限的任务。实时环境中有外部异步事件（中断）时，会触发硬件中断线程。通常情况下，硬件中断线程运行后，就会一直运行到完成，不会被其它线程抢占。如果启用了中断嵌套，硬件中断线程可以被其它更高优先级的硬件中断线程临时抢占。有关中断的嵌套、向量表和功能的具体信息，请参阅 <a href="https://www.ti.com/lit/ug/swcu117i/swcu117i.pdf?ts=1672803242700" target="_blank" rel="noopener noreferrer">CC13x0 CC26x0 SimpleLink 无线 MCU 技术参考手册<ExternalLinkIcon/></a>。</p>
<p>通常中断服务例程执行的时间较短，避免影响硬实时系统要求。此外，由于硬件中断线程必须运行到完成，因此不能从上下文中调用阻塞 API。</p>
<p>需要中断的 TI-RTOS 驱动程序将为分配的外设初始化所需的中断。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>调试提供了使用 GPIO 和 Hwis 的示例。虽然 SDK 包含用于抽象硬件寄存器访问的外设驱动程序库，但建议使用线程安全的 TI-RTOS 驱动程序。</p>
</div>
<p>CC2640R2 的 Hwi 模块支持零延迟中断。这些中断不需要通过 TI-RTOS Hwi 调度程序，因此他们比标准中断响应更快，但是这一特性禁止其<u>中断服务例程</u>（ISR， interrupt service routine）直接调用任何 TI-RTOS 内核 API。ISR 需要保留自己的上下文以防止它干扰内核的调度程序。</p>
<h2 id="软件中断-swi" tabindex="-1"><a class="header-anchor" href="#软件中断-swi" aria-hidden="true">#</a> 软件中断（Swi）</h2>
<p>仿造硬件中断（Hwi），软件中断线程在 Hwi 线程和任务线程之间提供额外的优先级。Swi 与 Hwi（由硬件中断触发）不同的是：通过调用某些 Swi 模块 API 以编程方式触发。Swi 处理受时间限制的线程，这些时间限制阻止它们作为任务运行，但其最后期限不像硬件 ISR 那样严格。与 Hwis 一样，Swi 线程运行后，就会一直运行到完成，不会被其它线程抢占。Swi 允许 Hwi 将不太重要的处理推迟到较低优先级的线程，从而最大限度地减少 CPU 在中断服务例程中花费的时间，在中断服务例程中可以禁用其他 Hwi。Swis 只需要足够的空间来保存每个 Swi 中断优先级的上下文，而任务为每个线程使用单独的堆栈。</p>
<p>与 Hwi 类似，Swi 的运行时间应该要短，并且不能调用任何阻塞 API。这允许高优先级任务（如无线协议栈）根据需要执行。建议 <code v-pre>_post()</code> 一些 TI-RTOS <u>同步原语</u>（synchronization primitive），以允许在任务上下文中进行进一步的后处理。请参阅图 41 来说明此类用例。</p>
<center id="figure-41"><img class="medium-zoom-image" src="https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-preemption-scenario.jpg" alt="Preemption Scenario" /><br />图 41. 抢占场景</center>
<h2 id="任务" tabindex="-1"><a class="header-anchor" href="#任务" aria-hidden="true">#</a> 任务</h2>
<p>任务线程的优先级高于后台（空闲）线程，但低于软件中断。任务与软件中断的不同之处在于它们可以在执行期间等待（阻塞）直到需要的资源是可用状态。任务需要每个线程都有一个单独的堆栈。TI-RTOS 提供了许多可用于任务间通信和同步的机制。这些包括<u>信号量</u>（Semaphores）、<u>事件</u>（Event）、<u>消息队列</u>（Message queues）和<u>邮箱</u>（Mailboxes）。</p>
<h2 id="空闲任务-idle-task" tabindex="-1"><a class="header-anchor" href="#空闲任务-idle-task" aria-hidden="true">#</a> 空闲任务（Idle Task）</h2>
<p>空闲线程在 TI-RTOS 应用程序中以最低优先级执行，并在连续循环（空闲循环）中一个接一个地执行。main 返回后，TI-RTOS 应用程序调用每个 TI-RTOS 模块的启动例程，然后进入空闲循环。每个空闲线程必须等待所有其他线程完成执行才能再次调用。空闲循环会连续运行，除非它被更高优先级的线程抢占（其它线程运行时）。只有没有严格期限要求的函数才应该在空闲循环中执行。</p>
</div></template>


