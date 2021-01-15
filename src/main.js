import Vue from 'vue'
import App from './App.vue'

import router from './router'
import 'lib-flexible'
import Header from './components/Header/Header.vue'
import store from './vuex/store'

Vue.config.productionTip = false
// 注册全局组件
Vue.component('Header', Header)
new Vue({
  render: h => h(App),
  router, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
  store // 所有组件都能看到: $store
}).$mount('#app')
