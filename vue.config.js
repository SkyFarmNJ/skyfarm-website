module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath : './',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Sky Farm'
                return args;
            })
    }
}
