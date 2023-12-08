import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/embedded-system/": [
    "",
    {
      icon: "bluetooth",
      text: "蓝牙协议栈",
      prefix: "ble5-stack/",
      link: "ble5-stack/"
    },
    {
      text: "实时操作系统",
      icon: "OS",
      prefix: "rtos/",
      link: "rtos/"
    },
    {
      text: "ARM Cortex-M3",
      prefix: "arm-v7/",
      link: "arm-v7/",
      children: "structure"
    },
  ],
  "/embedded-system/rtos/": [
    {
      text: "实时操作系统",
      children: [
        {
          text: "TI-RTOS 实时操作系统",
          prefix: "ti-rtos/",
          link: "ti-rtos/",
          children: "structure"
        },
        {
          text: "Free RTOS 实时操作系统",
          prefix: "freertos/",
          link: "freertos/",
          children: "structure"
        },
      ]
    }
  ],
  "/program/": [
    "",
    "c/",
    {
      text: "数据结构基础",
      prefix: "data-structure/",
      link: "data-structure/"
    }
  ],
  "/program/data-structure/": [
    {
      text: "数据结构基础",
      children: "structure"
    },
  ],
  "/cas/": [
    {
      text: "操作系统导论",
      prefix: "ostep/",
      link: "ostep/",
      children: [
        {
          text: "虚拟化",
          prefix: "virtualization/",
          children: "structure"
        }
      ]
    }
  ]
});
