const path = require('path')
const webSiteTitle = 'Vue2+TSX'
function resolve(dir) {
    return path.join(__dirname, dir)
}
console.log(
    'proxy url',
    process.env.VUE_APP_PROXY_TARGET,
    process.env.VUE_APP_MODE,
)

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
        port: 8077,
        proxy: {
            '/api': {
                // target: process.env.VUE_APP_PROXY_TARGET,
                // target: "http://",
                target: "http://",
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': '/',
                // },
            },

        },
    },
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    filenameHashing: true, //文件hash
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = webSiteTitle
            return args
        })
        config.resolve.alias
            // key,value自行定义，比如.set('@assets', resolve('src/assets'))
            .set('@assets', resolve('./src/assets'))
            // .set('@components', resolve('src/components'))
            .set('@', resolve('./src'))
            .set('api', resolve('./src/http'))
    },
    configureWebpack: {
        devtool: 'source-map',
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                resolve('./src/assets/styles/reset.less'),
                resolve('./src/assets/styles/common.less'),
            ],
        },
    },
    css: {
        loaderOptions: {
          less: {
            modifyVars: {
              'primary-color': '#3F68F1',
              'link-color': '#3F68F1'
            },
            javascriptEnabled: true
          }
        }
      }
}
