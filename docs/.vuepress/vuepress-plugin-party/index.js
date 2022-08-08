const path = require('path')

module.exports = (options = {}, ctx) => ({
    define() {
        const { count = {
            min: 10,
            max: 30
        }, size = {
            min: 0.2,
            max: 1
        }, shapes = ['circle'] } = options

        return {
            MIN_COUNT: count.min,
            MAX_COUNT: count.max,
            MIN_SIZE: size.min,
            MAX_SIZE: size.max,
            SHAPES: shapes
        }
    },
    async ready() {
        console.log("Blue is Having Party!")
    },
    enhanceAppFiles: path.resolve(__dirname, './lib/enhanceAppFile.js'),
    globalUIComponents: 'PartyCursorEffects',
})