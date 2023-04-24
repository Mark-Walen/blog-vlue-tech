export const data = JSON.parse("{\"key\":\"v-4caeadb6\",\"path\":\"/post/embedded-system/ble5-stack/ti-rtos/thread_synchronization.html\",\"title\":\"线程同步\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"线程同步\",\"date\":\"2023-01-10T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"autoSort\":-2,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/post/embedded-system/ble5-stack/ti-rtos/thread_synchronization.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"线程同步\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-01-10T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"线程同步\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-01-10T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"信号量（Semaphores）\",\"slug\":\"信号量-semaphores\",\"link\":\"#信号量-semaphores\",\"children\":[{\"level\":3,\"title\":\"初始化信号量\",\"slug\":\"初始化信号量\",\"link\":\"#初始化信号量\",\"children\":[]},{\"level\":3,\"title\":\"获取信号量\",\"slug\":\"获取信号量\",\"link\":\"#获取信号量\",\"children\":[]},{\"level\":3,\"title\":\"释放信号量\",\"slug\":\"释放信号量\",\"link\":\"#释放信号量\",\"children\":[]}]},{\"level\":2,\"title\":\"事件（Event）\",\"slug\":\"事件-event\",\"link\":\"#事件-event\",\"children\":[{\"level\":3,\"title\":\"初始化事件\",\"slug\":\"初始化事件\",\"link\":\"#初始化事件\",\"children\":[]},{\"level\":3,\"title\":\"监听事件\",\"slug\":\"监听事件\",\"link\":\"#监听事件\",\"children\":[]},{\"level\":3,\"title\":\"响应事件\",\"slug\":\"响应事件\",\"link\":\"#响应事件\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.93,\"words\":1478},\"filePathRelative\":\"post/embedded-system/ble5-stack/ti-rtos/thread_synchronization.md\",\"localizedDate\":\"2023年1月10日\",\"excerpt\":\"<p>TI-RTOS 内核提供了几个用于同步任务的模块，例如信号量、事件和队列。以下部分讨论这些常见的 TI-RTOS 原语。</p>\\n<h2> 信号量（Semaphores）</h2>\\n<p>信号量通常用于整个 TI-RTOS 应用程序中的任务同步和互斥。图 42 展示了信号量功能。信号量可以是计数信号量或二进制信号量。计数信号量使用 <code>Semaphore_post()</code> 跟踪信号量发布的次数。当任务之间共享一组资源时，此功能很有用。此类任务可能会调用 Semaphore_pend() 以在使用资源之前查看资源是否可用。二进制信号量只能有两种状态：可用（count = 1）和不可用（count = 0）。二进制信号量可用于在任务之间共享单个资源，或用于信号量可多次发布的基本信号机制。二进制信号量不跟踪计数；他们只跟踪信号量是否已发布。</p>\"}")

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
