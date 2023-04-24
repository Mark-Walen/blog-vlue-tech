export const data = JSON.parse("{\"key\":\"v-46ccf4bf\",\"path\":\"/post/embedded-system/ble5-stack/ti-rtos/queues.html\",\"title\":\"队列\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"队列\",\"date\":\"2023-01-12T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"autoSort\":-3,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/post/embedded-system/ble5-stack/ti-rtos/queues.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"队列\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-01-12T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"队列\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-01-12T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"功能示例\",\"slug\":\"功能示例\",\"link\":\"#功能示例\",\"children\":[]}],\"readingTime\":{\"minutes\":3.44,\"words\":1032},\"filePathRelative\":\"post/embedded-system/ble5-stack/ti-rtos/queues.md\",\"localizedDate\":\"2023年1月12日\",\"excerpt\":\"<p>TI-RTOS 队列模块提供了一个线程安全的单向消息传递模块，以先进先出 (FIFO) 的方式运行。队列通常用于允许高优先级线程将消息传递给低优先级任务以进行延迟处理；因此允许低优先级任务阻塞直到需要运行。</p>\\n<p>在图 43 中，队列配置为从任务 A 到任务 B 的单向通信。任务 A 将消息“放入”队列，任务 B 从队列中“获取”消息。</p>\\n\\n<p>在 BLE5-Stack 中，TI-RTOS 队列函数已被抽象为 <code>util.c</code> 中的函数，请参阅 <a href=\\\"https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">TI-RTOS 内核 (SYS/BIOS) 用户指南</a>中的队列模块文档。<code>util.c</code> 中的函数将 Queue 模块中的队列与 Event 模块中的事件组合在一起，以在线程之间传递消息。</p>\"}")

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
