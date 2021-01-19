import Vue from 'vue'
import App from './App.vue'
import './veeValidate' // 直接引入所在文件夹引入表单验证插件
import { Button } from 'mint-ui' // 按需引入mint-ui组件

import router from './router'
import 'lib-flexible'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import * as API from '@/api' // 将API对象挂载到Vue的原型对象上步骤一

// 将API对象挂载到Vue的原型对象上步骤二
Vue.prototype.$API = API

Vue.config.productionTip = false
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name, Button)

new Vue({
  render: h => h(App),
  router, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
  store // 所有组件都能看到: $store
}).$mount('#app')
