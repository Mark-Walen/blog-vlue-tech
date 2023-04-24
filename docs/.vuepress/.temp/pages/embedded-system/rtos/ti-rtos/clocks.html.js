export const data = JSON.parse("{\"key\":\"v-714cb020\",\"path\":\"/embedded-system/rtos/ti-rtos/clocks.html\",\"title\":\"时钟\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"时钟\",\"date\":\"2023-02-20T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"autoSort\":-5,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/embedded-system/rtos/ti-rtos/clocks.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"时钟\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-02-20T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"时钟\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-02-20T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"功能示例\",\"slug\":\"功能示例\",\"link\":\"#功能示例\",\"children\":[]}],\"readingTime\":{\"minutes\":2.74,\"words\":823},\"filePathRelative\":\"embedded-system/rtos/ti-rtos/clocks.md\",\"localizedDate\":\"2023年2月20日\",\"excerpt\":\"<p>时钟实例是可以安排在一定数量的系统滴答后运行的函数。时钟实例是一次性的或周期性的。这些实例在创建后立即启动，配置为在延迟后启动，并且可以随时停止。所有时钟实例在 <a href=\\\"https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/ble-stack-5.x-guide/reference-cc2640.html#term-swi\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">Swi</a> 上下文中过期时执行。以下示例显示最小分辨率是 TI-RTOS 配置文件 (<code>.cfg</code>) 中设置的 TI-RTOS 时钟节拍周期。</p>\"}")

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
