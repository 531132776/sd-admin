module.exports = {
    devServer: {
        port: 8085, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://120.77.220.25:8080',
                // target:'http://120.77.220.25:9080',//预发布环境
                // target:'http://47.91.110.186:8080',//迪拜
                // target:'http://192.168.0.129:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}