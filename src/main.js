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

// truncate
Vue.filter('truncate', function (text, length, suffix) {
    if (text.length > length) {
        return text.substring(0, length) + suffix;
    } else {
        return text;
    }
});
Vue.filter('sanitize', function (text) {
    return text.replaceAll('nbsp', ' ').replaceAll('& ;', '')
});
Vue.directive('longpress', {
    bind: function (el, binding, vNode) {
        if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}' ` }

            console.warn(warn)
        }
        let pressTimer = null
        let start = (e) => {

            if (e.type === 'click' && e.button !== 0) {
                return;
            }

            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler()
                }, 1000)
            }
        }

        // Cancel Timeout
        let cancel = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        const handler = (e) => {
            binding.value(e)
        }
        el.addEventListener("mousedown", start);
        el.addEventListener("touchstart", start);
        el.addEventListener("click", cancel);
        el.addEventListener("mouseout", cancel);
        el.addEventListener("touchend", cancel);
        el.addEventListener("touchcancel", cancel);
    }
})

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
        primary: '#1e2023',
        success: 'rgb(23, 201, 100)',
        danger: 'rgba(255,45,45,0.55)',
        warning: 'rgb(255, 130, 0)',
        dark: 'rgb(30,32,35)',
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
