<template><div><h1 id="线性表" tabindex="-1"><a class="header-anchor" href="#线性表" aria-hidden="true">#</a> 线性表</h1>
<h2 id="单链表" tabindex="-1"><a class="header-anchor" href="#单链表" aria-hidden="true">#</a> 单链表</h2>
<img src="/assets/img/linear-table/traverse.gif" style="margin-top: 6px;">
<h3 id="存储结构" tabindex="-1"><a class="header-anchor" href="#存储结构" aria-hidden="true">#</a> 存储结构</h3>
<blockquote>
<p>链式存储结构</p>
</blockquote>
<p>问题1：<font size = 2px, color = "#ff0f">什么是链式存储结构？</font></p>
<p>链式存储结构的特点：</p>
<p>用一组<mark>任意的</mark>存储单元存储线性表的数据元素。</p>
<p><strong>两个域</strong></p>
<ol>
<li>
<p>数据域：存储数据元素的信息。</p>
</li>
<li>
<p>指针域：存储后继结点的存储位置（即地址）。</p>
<img src="/assets/img/linear-table/链式存储构成.png" alt="链式的结构" style="zoom:48%;" />
</li>
</ol>
<p>答案：<font color = "#aa">链表的存储单元在逻辑上是连续的，但在物理空间（存储单元）上不一定是连续的，用指针域存储地址，将所有结点链接在一起，形成一个链表，实现了逻辑上的连续。</font></p>
<p>问题2：<font size = 2px, color = "#ff0f">链表如何存取信息?</font></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">int</span> ElemType<span class="token punctuation">;</span>		<span class="token comment">//定义元素的数据类型</span>
<span class="token comment">//------ 单链表的存储结构 ------</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">LNode</span>
<span class="token punctuation">{</span>
    ElemType data<span class="token punctuation">;</span>		<span class="token comment">//结点的数据域</span>
    <span class="token keyword">struct</span> <span class="token class-name">LNode</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>	<span class="token comment">//结点的指针域</span>
<span class="token punctuation">}</span>LNode<span class="token punctuation">,</span> <span class="token operator">*</span>LinkedList<span class="token punctuation">;</span>	<span class="token comment">//LinkedList为指向结构体LNode的指针类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>代码说明1</mark></p>
<div style = "border: 1px solid">
    <ol>
        <li>LinkedList与LNode*，两者本质上是等价的。</li>
        <li>通常习惯上用LinkedList定义单链表</li>
        <li>用LNode *定义指向单链表中任意结点的指针变量。</li>
        <li>若定义LinkedList L，L为单链表的头指针；若定义LNode *p，则p为指向单链表中某个结点的指针。</li>
        <li>单链表是由表头指针唯一确定的，因此单链表可以用头指针的名字来命名。</li>
    </ol>
</div>
<p><mark>注意</mark>：</p>
<div>
    区分指针变量和结点变量两个不同的概念:
    <ul>
        <li>指针变量：p，表示结点的地址</li>
        <li>结点变量：*p，表示该结点的名称</li>
    </ul>
</div>
<p>答案：<font color = "#aa">（1）代码说明1的第5点。（2）在单链表中，每个结点都只有一个指针域，且只指向后继结点。所以当我们要存取某个结点的信息时，只能从头指针开始。</font></p>
<h3 id="单链表基本操作的实现" tabindex="-1"><a class="header-anchor" href="#单链表基本操作的实现" aria-hidden="true">#</a> 单链表基本操作的实现</h3>
<h4 id="创建结点" tabindex="-1"><a class="header-anchor" href="#创建结点" aria-hidden="true">#</a> 创建结点</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>LNode <span class="token function">CreateNode</span><span class="token punctuation">(</span>ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>LNode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">//开辟空间生成结点</span>
    node<span class="token operator">-></span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>							<span class="token comment">//数据域赋值</span>
    node<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>							<span class="token comment">//指针域指向空</span>
    <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="单链表的初始化" tabindex="-1"><a class="header-anchor" href="#单链表的初始化" aria-hidden="true">#</a> 单链表的初始化</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//方法一，在初始化时头指针指向头结点</span>
<span class="token keyword">void</span> <span class="token function">Init</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    head <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//初始化2：头指针置为空</span>
<span class="token keyword">void</span> <span class="token function">Init</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token operator">*</span>head <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//或</span>
LNode<span class="token operator">*</span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>代码说明2</mark></p>
<div>
    <ol>
        <li>使用方法一初始化，我们在写其他函数时，可以不使用双重指针。</li>
        <li>使用方法二初始化，我们在写其他函数时，需要使用双重指针。</li>
    </ol>
</div>
<p>问题3：<font size = 2px, color = "#ff0f">能够阐述代码说明2的原因吗？</font></p>
<p>在回答问题3之前，我们先看一下下面这个例子</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//交换函数swap1</span>
<span class="token keyword">void</span> <span class="token function">swap1</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>a<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> tmp <span class="token operator">=</span> <span class="token operator">*</span>a<span class="token punctuation">;</span>
    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token operator">*</span>b<span class="token punctuation">;</span>
    <span class="token operator">*</span>b <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//交换函数swap2</span>
<span class="token keyword">void</span> <span class="token function">swap2</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>a<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token operator">*</span>tmp <span class="token operator">=</span> <span class="token operator">*</span>a<span class="token punctuation">;</span>
    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token operator">*</span>b<span class="token punctuation">;</span>
    <span class="token operator">*</span>b <span class="token operator">=</span> <span class="token operator">*</span>tmp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token function">swap1</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">swap2</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：调用swap1，改变的是指针变量的值，可以交换两个数的值；调用swap2，不能交换两个数的值，由于未给指针变量tmp赋值，所以指针变量的值是不可预见的。</p>
<p><mark>注意</mark>：因为在C语言中实参变量和形参变量之间的数据传递是单向的“值传递”方式。</p>
<p>答案：当我们使用<mark>方法二</mark>初始化时，头指针会被初始化为NULL，而当我们使用<code v-pre>L-&gt;next</code>时，我们并未初始化<code v-pre>L-&gt;next</code>，我们只是初始化了<code v-pre>L = NULL</code>，就如swap2中的tmp是一样的。同时，在函数内为一个空指针开辟开辟空间是无法带回函数外部的。使用<mark>方法一</mark>初始化时，<code v-pre>L-&gt;next = NULL</code>。</p>
<p>如果我们不想使用双重指针，用方法二初始化时，我们可以这样：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LinkedList head <span class="token operator">=</span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ElemType data<span class="token punctuation">;</span>
    <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">"%d"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    head <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然这样做与方法一无异。当我们只是想要一个空链表时，我们使用方法二初始化链表；当我们不在意初始化时链表有头结点，可以使用方法二初始化。</p>
<p><mark>说明</mark>：二重指针：传入一个指针的地址，此时是作为地址上的值让我们修改。</p>
<h4 id="单链表的头插法" tabindex="-1"><a class="header-anchor" href="#单链表的头插法" aria-hidden="true">#</a> 单链表的头插法</h4>
<blockquote>
<p>在头结点前插入节点</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// head != NULL;</span>
<span class="token keyword">void</span> <span class="token function">PushFront</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> head<span class="token punctuation">;</span>				<span class="token comment">//创建指针变量pn，赋初值为head的地址</span>
    node<span class="token operator">-></span>next <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>			<span class="token comment">//node指向pn的下一个结点</span>
    pn<span class="token operator">-></span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>				<span class="token comment">//pn指向node</span>
<span class="token punctuation">}</span>

<span class="token comment">//*head == NULL</span>
<span class="token keyword">void</span> <span class="token function">PushFront</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">,</span> ElemTypedata<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span><span class="token operator">*</span>ppn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    node<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token operator">*</span>ppn<span class="token punctuation">;</span>
    <span class="token operator">*</span>ppn <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>代码说明3</mark></p>
<ol>
<li>创建node结点时，node指向的是NULL，若pn直接指向node，会造成数据的丢失。</li>
<li>注释<code v-pre>head != NULL</code>与<code v-pre>*head == NULL</code>指的是链表的初始状态.(全文都是)</li>
</ol>
<h4 id="单链表的尾插法" tabindex="-1"><a class="header-anchor" href="#单链表的尾插法" aria-hidden="true">#</a> 单链表的尾插法</h4>
<blockquote>
<p>在链表尾部插入结点</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// head != NULL;</span>
<span class="token keyword">void</span> <span class="token function">PushBack</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token comment">//遍历链表,直至尾结点，即pn->next == NULL</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>				<span class="token comment">//pn指向下一个结点（即将pn下一个结点的地址赋给pn)</span>
    <span class="token punctuation">}</span>
    pn<span class="token operator">-></span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>				<span class="token comment">//pn指向node</span>
<span class="token punctuation">}</span>

<span class="token comment">//*head == NULL</span>
<span class="token keyword">void</span> <span class="token function">PushBack</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode<span class="token operator">*</span> node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span><span class="token operator">*</span>ppn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> <span class="token operator">*</span>head<span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ppn <span class="token operator">=</span> <span class="token operator">&amp;</span>pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">(</span><span class="token operator">*</span>ppn<span class="token punctuation">)</span><span class="token operator">-></span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在给定位置-插入结点" tabindex="-1"><a class="header-anchor" href="#在给定位置-插入结点" aria-hidden="true">#</a> 在给定位置，插入结点</h4>
<blockquote>
<p>遍历链表，在指定下标插入结点。</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// head != NULL;</span>
<span class="token keyword">void</span> <span class="token function">Insert</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>pos <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token comment">//遍历到要插入的位置</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next <span class="token operator">&amp;&amp;</span> pos<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pos<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>pn <span class="token operator">||</span> pos<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    node<span class="token operator">-></span>next <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
    pn<span class="token operator">-></span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// *head == NULL;</span>
<span class="token keyword">void</span> <span class="token function">Insert</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token operator">&amp;&amp;</span> pos <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span><span class="token operator">*</span>ppn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> <span class="token operator">*</span>head<span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>pos <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">PushFront</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next <span class="token operator">&amp;&amp;</span> <span class="token number">1</span> <span class="token operator">&lt;</span> pos<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ppn <span class="token operator">=</span> <span class="token operator">&amp;</span>pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pos<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>pn <span class="token operator">||</span> <span class="token number">1</span> <span class="token operator">&lt;</span> pos<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    node<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>ppn<span class="token punctuation">)</span><span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token operator">*</span>ppn<span class="token punctuation">)</span><span class="token operator">-></span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>代码说明4</mark></p>
<ol>
<li>
<p>两段代码中为什么while循环pos的终止条件不一致？</p>
<p>（1）当初始化链表后，向链表中插入两个结点时，对于代码段1，其实有3个结点（原因，头指针在创建，指向了一个结点）。对于代码段2，只有两个结点。</p>
<p>（2）对于代码段1，指针变量pn的pos为-1(原因：(1) 中已说明）， pos = 1，插入的位置为<code v-pre>pn-&gt;next-&gt;next</code>。</p>
<p>（3）对于代码段2，指针变量pn的pos为0，pos = 1，即插入的位置为<code v-pre>pn-&gt;next</code>。若终止条件为<code v-pre>pos = 0</code>；进入while循环后，插入的位置其实是<code v-pre>pn-&gt;next-&gt;next</code></p>
</li>
</ol>
<p>对于代码段2，也可以这样写：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">Insert</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token operator">&amp;&amp;</span> pos <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span><span class="token operator">*</span>ppn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> <span class="token operator">*</span>head<span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">CreateNode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next <span class="token operator">&amp;&amp;</span> pos<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ppn <span class="token operator">=</span> <span class="token operator">&amp;</span>pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pos<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>pn <span class="token operator">||</span> pos<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    node<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token operator">*</span>ppn<span class="token punctuation">;</span>
    <span class="token operator">*</span>ppn <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由代码说明4可知，pn的位置是我们要插入的位置，将结点插入pn前面即可。</p>
<h4 id="单链表的头删法" tabindex="-1"><a class="header-anchor" href="#单链表的头删法" aria-hidden="true">#</a> 单链表的头删法</h4>
<blockquote>
<p>删除头结点，头指针指向头结点的下一个结点。</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//head != NULL</span>
<span class="token keyword">void</span> <span class="token function">PopFront</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    head <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//*head == NULL</span>
<span class="token keyword">void</span> <span class="token function">PopFront</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assert</span><span class="token punctuation">(</span><span class="token operator">*</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> <span class="token operator">*</span>head<span class="token punctuation">;</span>
    <span class="token operator">*</span>head <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token function">free</span><span class="token punctuation">(</span>pn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//或。</span>
<span class="token keyword">void</span> <span class="token function">PopFront</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assert</span><span class="token punctuation">(</span><span class="token operator">*</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">*</span>head <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>head<span class="token punctuation">)</span><span class="token operator">-></span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>注意</mark>	对于代码段3并不推荐，因为会造成内存的泄露，我们只是丢失了头结点的地址，并没有释放这个结点，所以这个结点依然存在。如果追求短小精悍，可以使用。</p>
<h4 id="单链表的尾删法" tabindex="-1"><a class="header-anchor" href="#单链表的尾删法" aria-hidden="true">#</a> 单链表的尾删法</h4>
<blockquote>
<p>删去链表的最后一个结点</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//head != NULL</span>
<span class="token keyword">void</span> <span class="token function">PopBack</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>head<span class="token operator">-></span>next <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next<span class="token operator">-></span>next <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">free</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    pn<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//head == NULL</span>
<span class="token keyword">void</span> <span class="token function">PopBack</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assert</span><span class="token punctuation">(</span><span class="token operator">*</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>head<span class="token punctuation">)</span><span class="token operator">-></span>next <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">free</span><span class="token punctuation">(</span><span class="token operator">*</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token operator">*</span>head <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> <span class="token operator">*</span>head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next<span class="token operator">-></span>next <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">free</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    pn<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>代码说明6</mark></p>
<p>1.两个代码段的 if语句执行的内容不同，是由链表的初始化决定的（换句话说链表为空的条件），对于代码段一，链表初始化时不能为空，必须初始化一个头结点。对于代码段二，链表可以为空。</p>
<h4 id="删除指定位置的结点" tabindex="-1"><a class="header-anchor" href="#删除指定位置的结点" aria-hidden="true">#</a> 删除指定位置的结点</h4>
<blockquote>
<p>遍历至要被删除的结点，删除结点。</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//head != NULL</span>
<span class="token keyword">void</span> <span class="token function">Erase</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next <span class="token operator">&amp;&amp;</span> pos<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pos<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>pos <span class="token operator">||</span> <span class="token operator">!</span>pn<span class="token operator">-></span>next<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>tmp <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
    pn<span class="token operator">-></span>next <span class="token operator">=</span> tmp<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token function">free</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// *head == NULL</span>
<span class="token keyword">void</span> <span class="token function">Erase</span><span class="token punctuation">(</span>LinkedList <span class="token operator">*</span>head<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token operator">&amp;&amp;</span> pos <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span><span class="token operator">*</span>ppn <span class="token operator">=</span> head<span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>pn <span class="token operator">=</span> <span class="token operator">*</span>head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>pn<span class="token operator">-></span>next <span class="token operator">&amp;&amp;</span> pos<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ppn <span class="token operator">=</span> <span class="token operator">&amp;</span>pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pn <span class="token operator">=</span> pn<span class="token operator">-></span>next<span class="token punctuation">;</span>
        pos<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>pn <span class="token operator">||</span> pos<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    LNode <span class="token operator">*</span>tmp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>ppn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token operator">*</span>ppn<span class="token punctuation">)</span> <span class="token operator">=</span> tmp<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token function">free</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理解了<strong>在指定位置，插入结点</strong>后，应该不难理解。</p>
<h4 id="按值查找" tabindex="-1"><a class="header-anchor" href="#按值查找" aria-hidden="true">#</a> 按值查找</h4>
<blockquote>
<p>给定值，遍历链表，返回值对应的结点，没找到返回</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>LNode<span class="token operator">*</span> <span class="token function">Find</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> ElemType data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode<span class="token operator">*</span> tmp <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>tmp <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token operator">&amp;&amp;</span> tmp<span class="token operator">-></span>data <span class="token operator">!=</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        tmp <span class="token operator">=</span> tmp<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>tmp <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"查找的值不存在！！！\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> tmp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="给定下标-查找值" tabindex="-1"><a class="header-anchor" href="#给定下标-查找值" aria-hidden="true">#</a> 给定下标，查找值</h4>
<blockquote>
<p>遍历链表至给定下标，返回结点的值。不存在返回-1.</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>ElemType <span class="token function">indexOf</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">//tmp初始化为头结点的下一个结点，是因为当前头结点初始化时附带的，并非真正意义上的头结点。</span>
    LNode <span class="token operator">*</span>tmp <span class="token operator">=</span> head<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token comment">//若链表初始化为空, LinkedList tmp = head即可。</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>tmp <span class="token operator">&amp;&amp;</span> index<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        tmp <span class="token operator">=</span> tmp<span class="token operator">-></span>next<span class="token punctuation">;</span>
        index<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>tmp <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>index<span class="token punctuation">)</span> <span class="token keyword">return</span> tmp<span class="token operator">-></span>val<span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="遍历链表" tabindex="-1"><a class="header-anchor" href="#遍历链表" aria-hidden="true">#</a> 遍历链表</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//head != NULL</span>
<span class="token keyword">void</span> <span class="token function">TraverseList</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//tmp初始化为头结点的下一个结点，是因为当前头结点初始化时附带的，并非真正意义上的头结点。</span>
    LNode <span class="token operator">*</span>tmp <span class="token operator">=</span> head<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token comment">//若链表初始化为空, LinkedList tmp = head即可。</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>tmp<span class="token operator">-></span>next <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%d--->"</span><span class="token punctuation">,</span> tmp<span class="token operator">-></span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        tmp <span class="token operator">=</span> tmp<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> tmp<span class="token operator">-></span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="销毁链表" tabindex="-1"><a class="header-anchor" href="#销毁链表" aria-hidden="true">#</a> 销毁链表</h4>
<blockquote>
<p>释放链表每个结点的空间</p>
</blockquote>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">Destroy</span><span class="token punctuation">(</span>LinkedList head<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    LNode <span class="token operator">*</span>del <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        del <span class="token operator">=</span> head<span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token operator">-></span>next<span class="token punctuation">;</span>
        <span class="token function">free</span><span class="token punctuation">(</span>del<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习" aria-hidden="true">#</a> 练习</h2>
<ol>
<li>
<p><a href="https://leetcode-cn.com/problems/design-linked-list/" target="_blank">设计链表</a></p>
</li>
<li>
<p><a href="https://leetcode-cn.com/problems/merge-two-sorted-lists/" target="_blank">合并两个有序链表</a></p>
</li>
<li>
<p><a href="https://leetcode-cn.com/problems/reverse-linked-list/" target="_blank">反转链表</a></p>
</li>
</ol>
</div></template>


