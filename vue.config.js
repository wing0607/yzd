const path = require('path')
module.exports = {

  publicPath: './',
  indexPath: 'index.html',
  devServer: {
    proxy: {
      '/api': {
        // 目标 API 地址
        // target: 'http://dbstest.natapp4.cc',
        target: 'http://192.168.0.73:8080/',
        // 如果要代理 websockets
        //ws: false,
        // 将主机标头的原点更改为目标URL
        // changeOrigin: true,
        // pathRewrite: {
        //     '^/api': '',//重写,
        // }
      }
    }
  },
}