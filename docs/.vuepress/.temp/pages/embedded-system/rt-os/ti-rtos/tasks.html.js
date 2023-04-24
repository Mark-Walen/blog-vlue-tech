export const data = JSON.parse("{\"key\":\"v-593e2412\",\"path\":\"/embedded-system/rt-os/ti-rtos/tasks.html\",\"title\":\"任务\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"任务\",\"date\":\"2023-01-13T00:00:00.000Z\",\"description\":\"本文是对 ti rtos 官方文档的翻译\",\"autoSort\":-4,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mark-walen.github.io/embedded-system/rt-os/ti-rtos/tasks.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"蓝芒小栈\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"任务\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本文是对 ti rtos 官方文档的翻译\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mark Walen\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-01-13T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"任务\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-01-13T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mark Walen\\\",\\\"url\\\":\\\"https://mrhope.site\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"初始化任务\",\"slug\":\"初始化任务\",\"link\":\"#初始化任务\",\"children\":[]},{\"level\":2,\"title\":\"任务函数\",\"slug\":\"任务函数\",\"link\":\"#任务函数\",\"children\":[]}],\"readingTime\":{\"minutes\":4.03,\"words\":1209},\"filePathRelative\":\"embedded-system/rt-os/ti-rtos/tasks.md\",\"localizedDate\":\"2023年1月13日\",\"excerpt\":\"<p>TI-RTOS 任务在概念上等同于在单个 C 程序中并行执行函数的独立线程。实际上，将处理器从一项任务切换到另一项任务有助于实现并发。每个任务始终处于以下执行模式之一：</p>\\n<ul>\\n<li><strong>执行</strong>：任务当前正在运行</li>\\n<li><strong>就绪</strong>： 任务被安排执行</li>\\n<li><strong>阻塞</strong>：任务暂停执行</li>\\n<li><strong>停止</strong>：任务执行完成后，进入终止状态</li>\\n<li><strong>静止</strong>：任务在非活动列表中</li>\\n</ul>\\n<p>一个（并且只有一个）任务始终在运行，即使它只是空闲任务（参见<a href=\\\"/embedded-system/rt-os/ti-rtos/#figure-40\\\" target=\\\"blank\\\">图 40</a>）。当前运行的任务可以通过调用某些任务模块函数以及其他模块（如信号量）提供的函数来阻止执行。当前任务也可以自行终止。在任何一种情况下，处理器都会切换到准备运行的最高优先级任务。有关这些功能的更多信息，请参阅 <a href=\\\"https://dev.ti.com/tirex/explore/content/simplelink_cc2640r2_sdk_5_30_00_03/docs/tirtos/sysbios/docs/Bios_User_Guide.pdf\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">TI-RTOS 内核 (SYS/BIOS) 用户指南</a>的包 <code>ti.sysbios.knl</code> 部分中的任务模块。</p>\"}")

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
