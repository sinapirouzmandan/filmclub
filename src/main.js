import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import axios from "axios";
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuesax, {
  colors: {
    primary:'#1e2023',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
