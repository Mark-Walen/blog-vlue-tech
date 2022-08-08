const navbar = require("./js/navbar");
const head = require('./js/head');
const plugins = require('./js/plugins');

module.exports = {
    title: 'Blue Monster',
    description: '在此小栈喝盏茶，小憩片刻，汲取知识。',
    head: head,
    themeConfig: {
        nav: navbar,
        sidebar: 'auto',
        searchMaxSuggestions: 6,
        lastUpdated: '上次更新',
        nextLinks: true,
        prevLinks: true,
    },
    markdown: {
        toc: {
            includeLevel: [1, 2, 3, 4, 5]
        },
        lineNumber: true
    },
    plugins: plugins,
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Blue Monster',
            description: '在此小栈喝盏茶，小憩片刻，汲取知识。',
        }
    }
}