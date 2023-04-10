const resolve = require('path').resolve
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    outputDir: 'docs',
    publicPath: './',
    configureWebpack: {
        plugins: [new StatsPlugin('stats.json', {
            chunkModules: true,
            chunks: true,
            assets: false,
            modules: true,
            children: true,
            chunksSort: true,
            assetsSort: true
        })]
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('plugin', resolve(__dirname, './src/plugins'))
            .set('component', resolve(__dirname, './src/components'))
    },
    devServer: {
        proxy: {
            '/api/auth/me': {
                target: 'https://screeps.com/api/auth/me', // 这里写要请求的接口地址
                changeOrigin: true,
                ws: false
            },
            '/api/auth/signin': {
                target: 'https://screeps.com/api/auth/signin', // 这里写要请求的接口地址
                changeOrigin: true,
                ws: false
            }
        }
    }
}
