import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "蓝芒小栈",
      description: "小怪兽和他可爱的小伙伴们。",
    },
    "/en/": {
      lang: "en-US",
      title: "Blue Monster",
      description: "Blue Monster Personal Blog.",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
