const path = require('path')
module.exports = {

  publicPath: './',
  indexPath: 'index.html',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.68:8081',    // 目标 API 地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',//重写,
        }
      }
    }
  },
}