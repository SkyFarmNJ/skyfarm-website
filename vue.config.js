module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath : './',
    chainWebpack: config => {
        if (process.env.NODE_ENV == 'development') {
            config.devServer.set('disableHostCheck', true)
        }
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Sky Farm'
                return args;
            })
    }
}
