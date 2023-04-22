module.exports = [
    { text: '首页', link: '/' },
    {
        text: '编程基础',
        ariaLabel: 'Programming',
        items: [
            { text: 'C 语言程序设计', link: '/program/c/' },
            { text: '数据结构', link: '/program/data-structure/' }
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
                link: '/embedded-system/ecp/'
            },
            {
                text: 'STM32 入门学习',
                ariaLabel: 'STM32 Learning Process.',
                link: '/embedded-system/stm32/stm32-learning-process'
            }
        ]
    },
    { text: '资源领取', link: '/resources' },
    { text: 'TI Resource Explorer', link: 'https://dev.ti.com/tirex/explore/node?node=AAliBv1MZ54NaV.m2AIT8w__krol.2c__LATEST' },
]