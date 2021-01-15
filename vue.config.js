const path = require('path')
const px2rem = require('postcss-px2rem') // px适配

module.exports = { // 只能写Vue封装的配置
  lintOnSave: false, // 关闭EsLint的规则

  css: {
    loaderOptions: {
      postcss: { // 添加postcss配置
        plugins: [
          px2rem({
            remUnit: 37.5 // 设计稿等分后的人值  375/10
          })
        ]
      }
    }
  },

  configureWebpack: { // 内部写webpack原生配置
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: { // 路径别名(简写方式)
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    }
  },

  devServer: {
    proxy: {
      // 处理以/api开头路径的请求
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true // 支持跨域, 如果协议/主机也不相同, 必须加上
      }
    }
  }
}
