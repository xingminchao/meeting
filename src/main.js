import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import api from './request/api'
import * as utils from '@/utils'


Vue.use(ElementUI)

Vue.prototype.$api = api;
Vue.prototype.replaceRouter = utils.replaceRouter



Vue.config.productionTip = false



new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
