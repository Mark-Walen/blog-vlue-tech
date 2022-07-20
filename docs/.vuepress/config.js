module.exports = {
    title: 'Blue Monster',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '使用手册', link: '/guide/' },
            {
                text: '编程语言学习',
                ariaLabel: 'Programming',
                items: [
                    {text: 'C 语言程序设计', items: [
                            {text: 'if 语句', link: '/program/c/'}
                        ]}
                ]
            },
            {
                text: '嵌入式系统',
                ariaLabel: 'Embedded System',
                items: [
                    {
                        text: 'BLE5 Stack',
                        ariaLabel: 'BLE5 Stack',
                        link: '/embedded-system/ble5-stack/'
                    },
                    {
                        text: '电子通信协议',
                        ariaLabel: 'Electronic Communication Protocol',
                        link: '/embedded-system/electronic-communication-protocol/'
                    }
                ]
            },
            {text: '资源领取', link: '/resources'},
            { text: 'TI Resource Explorer', link: 'https://dev.ti.com/tirex/explore/node?node=AAliBv1MZ54NaV.m2AIT8w__krol.2c__LATEST' },
        ],
        sidebar: 'auto'
    },
    markdown: {
        toc: {
            includeLevel: [1, 2, 3]
        }
    },
    searchMaxSuggestions: 6,
    lastUpdated: '上次更新：'
}