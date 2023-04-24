<template><div><h1 id="栈" tabindex="-1"><a class="header-anchor" href="#栈" aria-hidden="true">#</a> 栈</h1>
<h2 id="顺序栈" tabindex="-1"><a class="header-anchor" href="#顺序栈" aria-hidden="true">#</a> 顺序栈</h2>
<h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3>
<blockquote>
<p><strong>栈</strong> 仅限定在表尾进行插入或删除操作的线性表，是一种<strong>后进先出</strong>的数据结构</p>
</blockquote>
<figure><img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/06/03/screen-shot-2018-06-02-at-203523.png" alt="栈" tabindex="0" loading="lazy"><figcaption>栈</figcaption></figure>
<center><font size="2px">图1.1 栈 (来源：<a href="https://leetcode-cn.com/leetbook/read/queue-stack/ghqur/">leetcode</a>)</font></center>
<h3 id="存储结构" tabindex="-1"><a class="header-anchor" href="#存储结构" aria-hidden="true">#</a> 存储结构</h3>
<p>我们通过移动栈顶指针(top)进行相关的数据操作，用线性结构(如数组、链表等)存储栈的元素</p>
<p>顺序栈的表示：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAXSIZE</span> <span class="token expression"><span class="token number">100</span>			</span><span class="token comment">//顺序栈存储空间的初始分配量</span></span>

<span class="token keyword">typedef</span> <span class="token keyword">int</span> ElemType<span class="token punctuation">;</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span>
<span class="token punctuation">{</span>
    ElemType <span class="token operator">*</span>base<span class="token punctuation">;</span>			<span class="token comment">//存储栈元素</span>
    <span class="token keyword">int</span> top<span class="token punctuation">;</span>				<span class="token comment">//栈顶指针</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>严蔚敏书中的定义：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAXSIZE</span> <span class="token expression"><span class="token number">100</span>				</span><span class="token comment">//顺序栈存储空间的初始分配量</span></span>

<span class="token keyword">typedef</span> <span class="token keyword">int</span> SElemType<span class="token punctuation">;</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span>
<span class="token punctuation">{</span>
    ElemType <span class="token operator">*</span>base<span class="token punctuation">;</span>				<span class="token comment">//存储栈元素</span>
    ElemType <span class="token operator">*</span>top<span class="token punctuation">;</span>				<span class="token comment">//栈顶指针</span>
    <span class="token keyword">int</span> stacksize<span class="token punctuation">;</span>				<span class="token comment">//栈可用的最大容量</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>说明1</mark></p>
<ol>
<li>栈底指针base始终指向栈底的位置，若base的值为NULL，表明栈结构不存在</li>
<li>top为栈顶指针，其初值指向栈底，即<code v-pre>top = base</code>
<ol>
<li>向栈顶插入新的元素时，指针top增1（前提：栈未满）</li>
<li>删除栈顶元素时，指针top减1（前提：栈不为空）</li>
</ol>
</li>
</ol>
<h3 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h3>
<p>⚠️ <span style="background-color:red; color:#f2f2f2">栈只能在栈顶进行一系列操作。</span></p>
<blockquote>
<p>入栈<code v-pre>push_back</code>(插入操作)、出栈<code v-pre>pop_back</code>(删除操作)、栈空的判断(<code v-pre>isEmpty</code>)、取栈顶元素(<code v-pre>getTop</code>)</p>
</blockquote>
<h4 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h4>
<p><mark>定义</mark> 为顺序栈动态分配一个预定义大小的数组空间。</p>
<p><mark>动画</mark></p>
<img src="/assets/img/stack/Init.gif" alt="InitStack" style="zoom:500%;" />
<center><font size="2px">图2.1 初始化栈</font></center>
<p><mark>实现</mark> 点击 <a href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%A0%88">➡️</a>，查看。</p>
<h4 id="入栈" tabindex="-1"><a class="header-anchor" href="#入栈" aria-hidden="true">#</a> 入栈</h4>
<p><mark>定义</mark> 入栈操作是指在栈顶插入一个新的元素</p>
<p><mark>动画</mark></p>
<figure><img src="/assets/img/stack/push.gif" alt="insert-stack" tabindex="0" loading="lazy"><figcaption>insert-stack</figcaption></figure>
<p><mark>实现</mark> 点击 <a href="#%E5%85%A5%E6%A0%88-2">➡️</a>，查看。</p>
<h4 id="出栈" tabindex="-1"><a class="header-anchor" href="#出栈" aria-hidden="true">#</a> 出栈</h4>
<p><mark>定义</mark> 将栈顶元素删除</p>
<p><mark>动画</mark></p>
<figure><img src="/assets/img/stack/pop.gif" alt="pop-back" tabindex="0" loading="lazy"><figcaption>pop-back</figcaption></figure>
<p><mark>实现</mark> 点击 <a href="#%E5%87%BA%E6%A0%88-2">➡️</a>，查看。</p>
<h3 id="用数组模拟栈" tabindex="-1"><a class="header-anchor" href="#用数组模拟栈" aria-hidden="true">#</a> 用数组模拟栈</h3>
<h4 id="动态数组模拟栈" tabindex="-1"><a class="header-anchor" href="#动态数组模拟栈" aria-hidden="true">#</a> 动态数组模拟栈</h4>
<blockquote>
<p>动态数组：动态数组的内存空间是从堆动态分配的。是通过执行代码(关键字：<code v-pre>malloc</code>, <code v-pre>calloc</code>, <code v-pre>realloc)</code>而为其分配存储空间。<a href="https://blog.csdn.net/zhanshen112/article/details/80758850" target="_blank" rel="noopener noreferrer">详情<ExternalLinkIcon/></a></p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAXSIZE</span> <span class="token expression"><span class="token number">100</span></span></span>

<span class="token keyword">typedef</span> <span class="token keyword">int</span> ElemType<span class="token punctuation">;</span>
<span class="token keyword">int</span> top<span class="token punctuation">;</span>	<span class="token comment">//栈顶指针</span>
ElemType <span class="token operator">*</span> <span class="token function">InitStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>							<span class="token comment">//初始化栈</span>
<span class="token keyword">void</span> <span class="token function">PushBack</span><span class="token punctuation">(</span>ElemType <span class="token operator">*</span>stack<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//入栈</span>
ElemType <span class="token function">PopBack</span><span class="token punctuation">(</span>ElemType <span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>				<span class="token comment">//出栈</span>
ElemType <span class="token function">GetTop</span><span class="token punctuation">(</span>ElemType <span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>				<span class="token comment">//取栈顶元素</span>
<span class="token keyword">int</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>									<span class="token comment">//判断栈为空</span>

ElemType<span class="token operator">*</span> <span class="token function">InitStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	ElemType <span class="token operator">*</span>stack <span class="token operator">=</span> <span class="token punctuation">(</span>ElemType <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>ElemType<span class="token punctuation">)</span><span class="token operator">*</span>MAXSIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> stack<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">PushBack</span><span class="token punctuation">(</span>ElemType <span class="token operator">*</span>stack<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">==</span> MAXSIZE<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>		<span class="token comment">//栈满则不能插入</span>
    stack<span class="token punctuation">[</span>top<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

ElemType <span class="token function">PopBack</span><span class="token punctuation">(</span>ElemType <span class="token operator">*</span>stack<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>		<span class="token comment">//栈为空</span>
    <span class="token keyword">return</span> stack<span class="token punctuation">[</span><span class="token operator">--</span>top<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

ElemType <span class="token function">GetTop</span><span class="token punctuation">(</span>ElemType <span class="token operator">*</span>stack<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> stack<span class="token punctuation">[</span>top<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//初始化栈</span>
    <span class="token keyword">return</span> top <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//初始化栈1;</span>
    ElemType <span class="token operator">*</span>stack <span class="token operator">=</span> <span class="token function">InitStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//初始化栈2;</span>
    <span class="token comment">//ElemType *stack = (ElemType *)malloc(sizeof(ElemType)*MAXSIZE);</span>
    <span class="token comment">//top = 0;</span>
    <span class="token function">free</span><span class="token punctuation">(</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//动态分配的空间记得释放。</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>小结</mark></p>
<ol>
<li>用数组实现栈比较方便，容易实现。</li>
<li>可以使用静态数组模拟栈(实现见<a href="#%E9%9D%99%E6%80%81%E6%95%B0%E7%BB%84">附录</a>)
<ol>
<li>定义初始化一个静态数组，并定义一个下标(top = 0)模拟栈顶指针;</li>
<li>向栈中插入元素<code v-pre>top++</code>，删除元素<code v-pre>--top</code>；</li>
<li>栈为空即<code v-pre>top=0</code> 栈满top值等于初始化时数组的长度。</li>
</ol>
</li>
<li>用数组模拟栈，进行删除操作时，其实需要删除的元素(设下标为del )并未删除，当我们去遍历整个数组（即栈区: <code v-pre>[0, top]</code> + 非栈区：<code v-pre>[top+1, stackSize]</code>）时依然可以看见stack[del]. 当我们再次插入元素(<code v-pre>top = del</code>)时，下标<code v-pre>del</code>处的值会被覆盖重写。</li>
</ol>
<h3 id="用结构体实现" tabindex="-1"><a class="header-anchor" href="#用结构体实现" aria-hidden="true">#</a> 用结构体实现</h3>
<blockquote>
<p>本文用上述<a href="#%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84">存储结构</a>中第一种定义的结构体实现。</p>
</blockquote>
<p><mark>Tips</mark> 当然也可以根据自己的需求定义相应栈的结构体。</p>
<h4 id="相关头文件" tabindex="-1"><a class="header-anchor" href="#相关头文件" aria-hidden="true">#</a> 相关头文件</h4>
<p><span id="header"><code v-pre>stack.h</code></span></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">STACK_H_INCLUDED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STACK_H_INCLUDED</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAXSTACKSIZE</span> <span class="token expression"><span class="token number">100</span></span></span>
<span class="token keyword">typedef</span> <span class="token keyword">int</span> ElemType<span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span>
<span class="token punctuation">{</span>
    ElemType <span class="token operator">*</span>base<span class="token punctuation">;</span>				<span class="token comment">//用于存储数据</span>
    <span class="token keyword">int</span> top<span class="token punctuation">;</span>					<span class="token comment">//栈顶指针，栈尾指针默认为下标0</span>
<span class="token punctuation">}</span>SeqStack<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">InitStack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                 <span class="token comment">//初始化栈</span>
<span class="token keyword">void</span> <span class="token function">Destroy</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                   <span class="token comment">//销毁栈</span>
<span class="token keyword">void</span> <span class="token function">ClearStack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">//清空栈</span>
<span class="token keyword">int</span> <span class="token function">Empty</span><span class="token punctuation">(</span>SeqStack stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                      <span class="token comment">//判断栈是否为空</span>
<span class="token keyword">int</span> <span class="token function">length</span><span class="token punctuation">(</span>SeqStack stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                     <span class="token comment">//获取栈元素的个数</span>
ElemType <span class="token function">GetTop</span><span class="token punctuation">(</span>SeqStack stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">//获取栈顶元素</span>
<span class="token keyword">void</span> <span class="token function">PushBack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//栈顶插入元素</span>
ElemType <span class="token function">PopBack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">//删除栈顶元素，并返回</span>
<span class="token keyword">void</span> <span class="token function">Traverse</span><span class="token punctuation">(</span>SeqStack stack<span class="token punctuation">)</span><span class="token punctuation">;</span>                   <span class="token comment">//遍历栈</span>


<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">// STACK_H_INCLUDED</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="初始化栈" tabindex="-1"><a class="header-anchor" href="#初始化栈" aria-hidden="true">#</a> 初始化栈</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">InitStack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    stack<span class="token operator">-></span>base <span class="token operator">=</span> <span class="token punctuation">(</span>ElemType <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>ElemType<span class="token punctuation">)</span><span class="token operator">*</span>MAXSIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">//为栈申请空间</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token operator">-></span>base<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>	<span class="token comment">//分配失败，终止。当然我们也可以修改函数的返回类型，了解分配情况。</span>
    stack<span class="token operator">-></span>top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//返回SeqStack *类型</span>
SeqStack <span class="token operator">*</span><span class="token function">InitStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    SeqStack <span class="token operator">*</span>stack<span class="token punctuation">;</span>
    stack<span class="token operator">-></span>base <span class="token operator">=</span> <span class="token punctuation">(</span>ElemType <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>ElemType<span class="token punctuation">)</span><span class="token operator">*</span>MAXSIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">//为栈申请空间</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token operator">-></span>base<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>	<span class="token comment">//分配失败，终止。当然我们也可以修改函数的返回类型，了解分配情况。</span>
    stack<span class="token operator">-></span>top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> stack<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>说明1</mark></p>
<p>对于严蔚敏书中的实现：</p>
<ol>
<li>
<p>由于c语言中不能使用引用类型(&amp;)作为函数形式参数使用，所以改用指针。但在调用函数传递实参时可以使用（C语言中是取地址符），因为传入的是变量的地址。</p>
<p>以<strong>初始化栈函数为例</strong>：<code v-pre>SeqStack stack; InitStack(&amp;stack);</code></p>
</li>
<li>
<p>栈顶指针：<code v-pre>*top</code> | 栈尾指针：*base。</p>
<p>top初始化为base：<code v-pre>stack-&gt;top = stack-&gt;base</code>表示栈为空。</p>
<font color="red">解释</font>：<font size="3px" color="#333">当两个指针指向同一个数组时，它们可以相减，其为结果为两个指针之间的元素数目。</font></li>
</ol>
<h4 id="入栈-1" tabindex="-1"><a class="header-anchor" href="#入栈-1" aria-hidden="true">#</a> 入栈</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">PushBack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//判断栈是否已满</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>stack<span class="token operator">-></span>top <span class="token operator">&lt;</span> MAXSTACKSIZE<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        stack<span class="token operator">-></span>base<span class="token punctuation">[</span>stack<span class="token operator">-></span>top<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"stack overflow!!!\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>说明2</mark></p>
<p>对于严蔚敏书中的实现：</p>
<ol>
<li>
<p>函数定义<code v-pre>Status Push(SqStack *stack, SElemType e);</code></p>
</li>
<li>
<p>元素入栈:</p>
<ol>
<li>
<p><code v-pre>*(stack-&gt;top) = e;stack-&gt;top++;</code></p>
<font color="red">解释</font>：<font size="3px" color="#333">定义变量a：`int *a`，`stack->top` 相当于`a` (`*(stack->top)`相当于`*a`)。 </font></li>
<li>
<p>不能这样赋值：<code v-pre>stack-&gt;top = &amp;e;</code>。</p>
<font color="red">解释</font>：这样会把<code v-pre>e</code>的地址值赋给<code v-pre>stack-&gt;top</code>。<code v-pre>stack-&gt;top</code>与<code v-pre>stack-&gt;base</code>指向的不是同一个数组，即<code v-pre>stack-&gt;top - stack-&gt;base</code>不能用来判断栈空或栈满。</li>
</ol>
</li>
</ol>
<h4 id="出栈-1" tabindex="-1"><a class="header-anchor" href="#出栈-1" aria-hidden="true">#</a> 出栈</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>ElemType <span class="token function">PopBack</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//判断栈是否为空</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">Empty</span><span class="token punctuation">(</span><span class="token operator">*</span>stack<span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">//? stack->top = 0</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//可以简化为 return stack->base[--stack->top];</span>
        ElemType data <span class="token operator">=</span> stack<span class="token operator">-></span>base<span class="token punctuation">[</span><span class="token operator">--</span>stack<span class="token operator">-></span>top<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"stack is empty!!!\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>说明3</mark></p>
<p>对于严蔚敏书中的实现：</p>
<ol>
<li>
<p>函数定义 ①<code v-pre>Status Pop(SqStack *stack, ElemType *e);</code>或②<code v-pre>ElemType Pop(SqStack *stack)</code></p>
</li>
<li>
<p>函数出栈</p>
<ol>
<li>
<p>①：<code v-pre>e = --stack-&gt;top;</code></p>
<font color="red">解释</font>：将--s-&gt;top(栈顶)的地址值赋给e。</li>
<li>
<p>②：<code v-pre>return *(--stack-&gt;top);</code></p>
</li>
</ol>
</li>
</ol>
<h4 id="取栈顶元素" tabindex="-1"><a class="header-anchor" href="#取栈顶元素" aria-hidden="true">#</a> 取栈顶元素</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>ElemType <span class="token function">GetTop</span><span class="token punctuation">(</span>SeqStack <span class="token operator">*</span>stack<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>stack<span class="token operator">-></span>top <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">*</span><span class="token punctuation">(</span>stack<span class="token operator">-></span>top <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>	<span class="token comment">//栈为空，返回-1;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><span style="background-color:yellow; color: #333;">写在最后</span> 栈的基本操作已实现，对于<a href="#header">stack.h</a>中未实现的函数，可以自己尝试去实现，感谢你的阅读。</p>
<h3 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h3>
<h4 id="静态数组模拟栈" tabindex="-1"><a class="header-anchor" href="#静态数组模拟栈" aria-hidden="true">#</a> 静态数组模拟栈</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> stack<span class="token punctuation">[</span>stackSize<span class="token punctuation">]</span><span class="token punctuation">;</span>	<span class="token comment">//stackSize：栈的长度，请自行定义并初始化。</span>
    <span class="token keyword">int</span> top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    
    <span class="token comment">//k in [1, stackSize]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        stack<span class="token punctuation">[</span>top<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token operator">*</span>i <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>		<span class="token comment">//插入元素</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"删除的元素：%d\n"</span><span class="token punctuation">,</span> stack<span class="token punctuation">[</span><span class="token operator">--</span>top<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"栈顶元素：%d\n"</span><span class="token punctuation">,</span> stack<span class="token punctuation">[</span>top<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>思考</mark> 当删除元素时，一定是<code v-pre>--top</code>吗？</p>
<p>回答：其实<code v-pre>--top</code> 与 <code v-pre>top--</code>两者皆可。top的含义：栈顶指针以及栈中元素的个数。数组的下标是从0开始的，所以栈顶元素的值：<code v-pre>stack[top-1]</code>。我们知道删除元素是删除栈顶元素（设下标为<code v-pre>del = top-1</code>），当我们需要使用这个元素时（如作为返回值、输出或其它用途）推荐使用<code v-pre>--top</code>(<code v-pre>top = del</code>)，当然使用 <code v-pre>top--</code>也可以(① <code v-pre>top--;stack[top];</code> 或 ②<code v-pre>stack[top-1]; top--；</code>)</p>
<h3 id="练习" tabindex="-1"><a class="header-anchor" href="#练习" aria-hidden="true">#</a> 练习</h3>
<ol>
<li>
<p><a href="https://leetcode-cn.com/problems/valid-parentheses/" target="_blank" rel="noopener noreferrer">有效的括号<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/" target="_blank" rel="noopener noreferrer">逆波兰表达式求值<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://leetcode-cn.com/problems/validate-stack-sequences/" target="_blank" rel="noopener noreferrer">验证栈序列<ExternalLinkIcon/></a></p>
</li>
</ol>
</div></template>


