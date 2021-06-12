import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import VueLazyload from 'vue-lazyload'
const loadimage = require('./assets/loading.gif')
const errorimage = require('./assets/err.gif')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 3
})

Vue.use(VueLazyload)
Vue.config.productionTip = false
Vue.use(Vuesax, {
  colors: {
    primary:'#1e2023',
    success:'rgb(23, 201, 100)',
    danger:'rgba(255,45,45,0.55)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(30,32,35)',
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
