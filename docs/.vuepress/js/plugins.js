const moment = require('moment');
const party = require('../vuepress-plugin-party');

module.exports = [
    ["vuepress-plugin-auto-sidebar", {
        title: {
            mode: "titlecase",
            map: {
                "/program/data-structure/": "数据结构基础",
                "/embedded-system/ble5-stack/ti-rtos/": "TI-RTOS"
            }
        },
        sidebarDepth: 4,
    }],
    ['@vuepress/last-updated', {
        transformer: (timestamp, lang) => {
            moment.locale(lang)
            return moment(timestamp).format('LLL')
        }
    }],
    ['@vuepress/pwa', {
        ServiceWorker: true,
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
        }
    }],
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang', {
        theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
    }],
    ["vuepress-plugin-nuggets-style-copy", {
        copyText: "复制代码",
        tip: {
            content: "复制成功",
        },
    }],
    ['@vuepress-reco/vuepress-plugin-bgm-player', {
        audios: [
            {
                //名字
                name: "Last Time",
                //作者
                artist: "Anson Seabra",
                //地址
                url: "/assets/music/Anson Seabra - Last Time.mp3",
                //封面图片
                cover: "/assets/img/cover/last-time.jpg",
            },
            {
                name: '晚风',
                artist: '陈婧霏',
                url: '/assets/music/陈婧霏 - 晚风.mp3',
                cover: '/assets/img/cover/晚风.webp'
            },
            {
                name: 'Show Me',
                artist: 'Audrey Assad',
                url: '/assets/music/Audrey Assad - Show Me.mp3',
                cover: '/assets/img/cover/show me.webp'
            },
            {
                name: 'Restless',
                artist: 'Audrey Assad',
                url: '/assets/music/Audrey Assad - Restless.mp3',
                cover: '/assets/img/cover/show me.webp'
            }
        ],
        autoShrink: true,
        shrinkMode: "float",
        floatStyle: {bottom: "30px", "z-index": "999999"},
    }],
    ['@vuepress/back-to-top'],
    ['@vuepress/nprogress'],
    [require('../vuepress-plugin-party', {
        shapes: ['circle', 'roundedSquare', 'star'],
        zIndex: '-1'
    })]
]