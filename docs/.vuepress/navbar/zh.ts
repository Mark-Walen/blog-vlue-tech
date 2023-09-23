import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "嵌入式系统",
    icon: "process",
    prefix: "/embedded-system/",
    children: [
      {
        text: "RTOS",
        children: [
          { text: "TI-RTOS", icon: "OS", link: "rtos/ti-rtos/" },
          { text: "Free-RTOS", icon: "OS", link: "rtos/freertos/" },
        ],
      },
      {
        text: "蓝牙协议栈",
        children: [
          { text: "TI-RTOS", icon: "OS", link: "rtos/ti-rtos/" },
          { text: "BLE5-Stack", icon: "bluetooth", link: "ble5-stack/" },
        ],
      }
    ],
  },
  {
    text: "编程基础",
    icon: "shell",
    prefix: "/program/",
    children: [
      { text: "C 语言", icon: "c", link: "C/" },
      { text: "数据结构", icon: "structure", link: "data-structure/" },
    ],
  },
  {
    text: "计算机专业课",
    icon: "computer",
    prefix: "/cas/",
    children: [
      { text: "操作系统导论", icon: "OS", link: "ostep/" },
    ],
  }
]);
