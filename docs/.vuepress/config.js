const {navbar} = require("./js/navbar");
const moment = require('moment');

module.exports = {
    title: 'Blue Monster',
    description: '在此小栈喝盏茶，小憩片刻，汲取知识。',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['meta', { name: 'author', content: 'Mark Walen' }],
        ['meta', { name: 'keywords', content: '蓝芒小栈, Blue Monster, 嵌入式软件, STM32, C 语言, 数据结构' }],
        ['meta', { name: 'theme-color', content: '#1e2d51' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#1e2d51' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        nav: navbar,
        sidebar: 'auto',
        searchMaxSuggestions: 6,
        lastUpdated: '上次更新：',
        nextLinks: true,
        prevLinks: true,
    },
    markdown: {
        toc: {
            includeLevel: [1, 2, 3, 4, 5]
        },
        lineNumber: true
    },
    plugins: {
        "vuepress-plugin-auto-sidebar": {
            title: {
                mode: "titlecase",
                map: {
                    "/program/data-structure/": "数据结构基础"
                }
            },
            sidebarDepth: 4,
        },
        '@vuepress/last-updated': {
            transformer: (timestamp, lang) => {
                moment.locale(lang)
                return moment(timestamp).format('LLL')
            }
        },
        '@vuepress/pwa': {
            ServiceWorker: true,
            updatePopup: {
                message: "发现心内容可用",
                buttonText: "刷新"
            }
        }
    }
}