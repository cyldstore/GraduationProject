import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/utils/http'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http // 全局注册 $http，后面组件中可以通过 this.$http 来使用

new Vue({
  el: '#app',
  router,
  store,
  http,
  render: h => h(App)
}).$mount('#app')
