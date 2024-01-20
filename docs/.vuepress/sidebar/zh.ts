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
    {
      text: "电子通信协议",
      icon: "api",
      prefix: "ecp/",
      link: "ecp/",
    },
    {
      text: "STM32",
      icon: "cpu",
      prefix: "stm32/",
      link: "stm32/",
    }
  ],
  "/embedded-system/ble5-stack/": [
    {
      text: "蓝牙协议栈",
      children: [
        {
          text: "简介",
          prefix: "ble5-stack/",
          link: "/embedded-system/ble5-stack/",
          children: "structure"
        },
        {
          text: "物理层",
          prefix: "phy",
          link: "phy_layer"
        },
        {
          text: "链路层",
          prefix: "ll",
          link: "link_layer"
        },
      ]
    }
  ],
  "/embedded-system/rtos/": [
    {
      text: "实时操作系统",
      children: [
        {
          text: "简介",
          prefix: "rtos/",
          link: "/embedded-system/rtos/",
          children: "structure"
        },
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
  "/embedded-system/ecp/": [
    {
      text: "电子通信协议",
      children: [
        {
          text: "简介",
          prefix: "ecp/",
          link: "/embedded-system/ecp/"
        },
        {
          text: "串行外设接口 (SPI)",
          prefix: "spi/",
          link: "spi/"
        },
        {
          text: "I2C 总线",
          prefix: "iic/",
          link: "iic/"
        },
      ]
    }
  ],
  "/program/": [
    "",
    "c/"
  ],
  "/cas/": [
    {
      text: "数据结构基础",
      prefix: "data-structure/",
      link: "data-structure/",
      children: "structure"
    },
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
