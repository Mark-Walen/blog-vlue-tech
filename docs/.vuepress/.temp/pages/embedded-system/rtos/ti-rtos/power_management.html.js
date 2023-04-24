export const data = JSON.parse("{\"key\":\"v-21ca8b50\",\"path\":\"/embedded-system/rtos/ti-rtos/power_management.html\",\"title\":\"功耗管理\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"功耗管理\",\"date\":\"2023-02-20T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"autoSort\":-6,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/embedded-system/rtos/ti-rtos/power_management.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"功耗管理\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-02-20T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"功耗管理\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-02-20T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.81,\"words\":242},\"filePathRelative\":\"embedded-system/rtos/ti-rtos/power_management.md\",\"localizedDate\":\"2023年2月20日\",\"excerpt\":\"<p>所有功耗管理功能均由 TI-RTOS 电源驱动程序处理，并由外围驱动程序（例如 UART、SPI、I2C 等）使用。应用程序可以选择通过设置功率限制来阻止 CC2640R2 进入低功耗模式。</p>\\n<p>有关功耗管理功能的更多信息，请参阅<a href=\\\"https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/drivers/Power_Management.pdf\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">电源管理用户指南</a>。只有在使用自定义驱动程序时才需要这些 API。</p>\"}")

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
