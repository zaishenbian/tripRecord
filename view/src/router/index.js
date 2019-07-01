import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入所有路由配置
const requireContext = require.context('./modules', true, /\.js$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)

let routes = []
requireAll(requireContext).forEach(item => {
  routes = routes.concat(item.default)
})

export default new Router({
  mode: 'history',
  routes
})
