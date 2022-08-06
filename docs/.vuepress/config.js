const {navbar} = require("./js/navbar");
const moment = require('moment');

module.exports = {
    title: 'Blue Monster',
    description: 'Just playing around',
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
                return moment(timestamp).fromNow('LLL')
            }
        }
    }
}