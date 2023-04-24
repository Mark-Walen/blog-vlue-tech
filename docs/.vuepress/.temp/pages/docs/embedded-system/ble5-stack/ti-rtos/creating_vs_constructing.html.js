export const data = JSON.parse("{\"key\":\"v-84639882\",\"path\":\"/docs/embedded-system/ble5-stack/ti-rtos/creating_vs_constructing.html\",\"title\":\"创建 vs 构造\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"创建 vs 构造\",\"date\":\"2023-01-10T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"autoSort\":-1,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/docs/embedded-system/ble5-stack/ti-rtos/creating_vs_constructing.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"创建 vs 构造\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-01-10T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"创建 vs 构造\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-01-10T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"创建 vs 构造\",\"slug\":\"创建-vs-构造\",\"link\":\"#创建-vs-构造\",\"children\":[]}],\"readingTime\":{\"minutes\":0.92,\"words\":277},\"filePathRelative\":\"docs/embedded-system/ble5-stack/ti-rtos/creating_vs_constructing.md\",\"localizedDate\":\"2023年1月10日\",\"excerpt\":\"<h2> 创建 vs 构造</h2>\\n<p>大多数 TI-RTOS 模块通常具有 <code>_create()</code> 和 <code>_construct()</code> API 来初始化原始实例。两个 API 之间运行时的主要差异是内存分配和错误处理。</p>\\n<p><strong>Create</strong> API 在初始化之前从默认 TI-RTOS 堆执行内存分配。因此，应用程序必须在继续之前检查有效 <u>句​​柄</u>（handle）的返回值。</p>\\n\\n<div class=\\\"language-c line-numbers-mode\\\" data-ext=\\\"c\\\"><pre class=\\\"language-c\\\"><code>Semaphore_Handle sem<span class=\\\"token punctuation\\\">;</span>\\nSemaphore_Params semParams<span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token function\\\">Semaphore_Params_init</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token operator\\\">&amp;</span>semParams<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\nsem <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">Semaphore_create</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">,</span> <span class=\\\"token operator\\\">&amp;</span>semParams<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token constant\\\">NULL</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">/* Memory allocated in here */</span>\\n\\n<span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>sem <span class=\\\"token operator\\\">==</span> <span class=\\\"token constant\\\">NULL</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token comment\\\">/* Check if the handle is valid */</span>\\n<span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token function\\\">System_abort</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"Semaphore could not be created\\\"</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
