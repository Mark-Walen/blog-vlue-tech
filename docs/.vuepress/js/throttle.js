export default function throttle(fn, time) {
    let timer = null
    time = time || 100
    return function(...args) {
        if (timer) {
            return
        }
        const _this = this
        timer = setTimeout(() => {
            timer = null
        }, time)
        fn.apply(_this, args)
    }
}