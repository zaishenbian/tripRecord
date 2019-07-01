import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.stylus'
// 请求封装
import http from './request/http'
// 全局组件注册
import mandMobile from 'mand-mobile'

Vue.config.productionTip = false

Vue.use(http)
Vue.use(mandMobile)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
