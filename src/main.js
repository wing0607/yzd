import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import { store } from './store/store'
import VueRouter from 'vue-router'
import Routes from './path/routes.js'
import './assets/css/css.css'
import axios from './axios/axios'
Vue.prototype.axios = axios;

Vue.use(VueRouter)
Vue.config.productionTip = false
// 创建路由
const router = new VueRouter({
  routes: Routes,
  mode: "history"
})
new Vue({
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')
