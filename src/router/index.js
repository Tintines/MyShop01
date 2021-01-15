/**
 * 向外暴露路由对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 声明使用vue插件
Vue.use(VueRouter)

// 暴露一个使用default 暴露一个路由器实例
export default new VueRouter({
  mode: 'history', // 路径没有#
  routes // 路由数组
})
