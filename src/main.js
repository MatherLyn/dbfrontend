import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

axios.defaults.baseURL='https://127.0.0.1:8080/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
