<template><div><h2 id="创建-vs-构造" tabindex="-1"><a class="header-anchor" href="#创建-vs-构造" aria-hidden="true">#</a> 创建 vs 构造</h2>
<p>大多数 TI-RTOS 模块通常具有 <code v-pre>_create()</code> 和 <code v-pre>_construct()</code> API 来初始化原始实例。两个 API 之间运行时的主要差异是内存分配和错误处理。</p>
<p><strong>Create</strong> API 在初始化之前从默认 TI-RTOS 堆执行内存分配。因此，应用程序必须在继续之前检查有效 <u>句​​柄</u>（handle）的返回值。</p>
<center><span id="listing-2">清单 2. 创建一个信号量</span><br /></center>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>Semaphore_Handle sem<span class="token punctuation">;</span>
Semaphore_Params semParams<span class="token punctuation">;</span>

<span class="token function">Semaphore_Params_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>semParams<span class="token punctuation">)</span><span class="token punctuation">;</span>
sem <span class="token operator">=</span> <span class="token function">Semaphore_create</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>semParams<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* Memory allocated in here */</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>sem <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token comment">/* Check if the handle is valid */</span>
<span class="token punctuation">{</span>
    <span class="token function">System_abort</span><span class="token punctuation">(</span><span class="token string">"Semaphore could not be created"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Construct</strong> API 被赋予一个数据结构，用于存储实例的变量。由于已经为实例预分配了内存，因此构造后可能不需要进行错误检查。</p>
<center><span id="listing-3">清单 3. 构造一个信号量</span><br /></center>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>Semaphore_Handle sem<span class="token punctuation">;</span>
Semaphore_Params semParams<span class="token punctuation">;</span>
Semaphore_Struct structSem<span class="token punctuation">;</span> <span class="token comment">/* Memory allocated at build time */</span>

<span class="token function">Semaphore_Params_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>semParams<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Semaphore_construct</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>structSem<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>semParams<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* It's optional to store the handle */</span>
sem <span class="token operator">=</span> <span class="token function">Semaphore_handle</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>structSem<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


