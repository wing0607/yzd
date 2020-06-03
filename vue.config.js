const path = require('path')
module.exports = {

  publicPath: './',
  indexPath: 'index.html',
  devServer: {
    proxy: {
      '/api': {
        //target: 'http://192.168.0.68:8992',   
        target: 'http://192.168.0.113:8992',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',//重写,
        }
      }
    }
  },
}
