export const data = JSON.parse("{\"key\":\"v-b742b196\",\"path\":\"/embedded-system/ble5-stack/ti-rtos/\",\"title\":\"线程模块\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"线程模块\",\"date\":\"2022-04-18T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/embedded-system/ble5-stack/ti-rtos/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"线程模块\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-04-18T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"线程模块\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-04-18T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"硬件中断（Hwi）\",\"slug\":\"硬件中断-hwi\",\"link\":\"#硬件中断-hwi\",\"children\":[]},{\"level\":2,\"title\":\"软件中断（Swi）\",\"slug\":\"软件中断-swi\",\"link\":\"#软件中断-swi\",\"children\":[]},{\"level\":2,\"title\":\"任务\",\"slug\":\"任务\",\"link\":\"#任务\",\"children\":[]},{\"level\":2,\"title\":\"空闲任务（Idle Task）\",\"slug\":\"空闲任务-idle-task\",\"link\":\"#空闲任务-idle-task\",\"children\":[]}],\"readingTime\":{\"minutes\":3.98,\"words\":1195},\"filePathRelative\":\"embedded-system/ble5-stack/ti-rtos/README.md\",\"localizedDate\":\"2022年4月18日\",\"excerpt\":\"<p>TI-RTOS 内核管理四种不同线程执行的上下文级别。线程模块按优先级降序显示如下：</p>\\n<ul>\\n<li>硬件中断</li>\\n<li>软件中断</li>\\n<li>任务</li>\\n<li>后台空闲函数的空闲任务</li>\\n</ul>\\n<div class=\\\"figure align-center\\\" id=\\\"figure-40\\\">\\n    <span id=\\\"fig-tirtos-threads\\\"></span>\\n    <img class=\\\"medium-zoom-image\\\" alt=\\\"TI-RTOS Execution Threads\\\" src=\\\"https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/ble5stack/ble_user_guide/html/_images/fig-tirtos-threads.jpg\\\">\\n    <p class=\\\"caption\\\">\\n        <span class=\\\"caption-number\\\">Figure 40. </span>\\n        <span class=\\\"caption-text\\\">图 40. TI-RTOS 执行线程</span>\\n    </p>\\n</div>\"}")

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
