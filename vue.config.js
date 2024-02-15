const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Vue2_RWM_Demo/'
    : '/',
  devServer: {
    proxy: {
      'https://api.jsonbin.io/': {
        target: 'https://api.jsonbin.io/v3/b', // 目标主机
      }
    }
  }
})
