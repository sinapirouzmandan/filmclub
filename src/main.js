import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import VueLazyload from 'vue-lazyload'
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
import VueMatomo from 'vue-matomo';
import replaceAllInserter from 'string.prototype.replaceall';
import VueMeta from 'vue-meta'
Vue.use(VueMeta)
replaceAllInserter.shim();
function generateGuestId(){
    if (localStorage.getItem("guestID") === null) {
        const id = 'guest-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        localStorage.setItem('guestID', id)
        return id
    }
    else {
        return localStorage.getItem('guestID')
    }
}
const userId = ()=>{
    if (localStorage.getItem("token") === null) {
        return generateGuestId()
    }
    else {
        try {
            return JSON.parse(atob(localStorage.getItem('token').split('.')[1]))['username']
        }
        catch {
            return generateGuestId()
        }
    }

}
Vue.use(VueMatomo, {
    host: "https://analytics.filmclub.top/",
    siteId: 1,
    trackerFileName: 'matomo',
    router: router,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    disableCookies: false,
    enableHeartBeatTimer: this,
    heartBeatTimerInterval: 30,
    debug: false,
    userId: userId(),
    cookieDomain: '*.filmclub.top',
    domains: '*.filmclub.top',
    preInitActions: []
});
import linkify from 'vue-linkify'
Vue.directive('linkified', linkify)
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
    return text.replaceAll('nbsp', ' ').replaceAll('& ;', '').replaceAll('<br>', '\n').
        replaceAll('script', '').replaceAll('alert', '').replaceAll('&amp;', '&')
});
Vue.filter('dateToString', function (text) {
    const now = new Date()
    let postDate = new Date(text)
    let Difference_In_Time = Math.floor((now.getTime() - postDate.getTime()));
    if (Math.floor(Difference_In_Time / 1000 / 60 / 60 / 24) > 0) {
        Difference_In_Time = Math.floor(Difference_In_Time / 1000 / 60 / 60 / 24)
        if (Difference_In_Time > 1) {
            Difference_In_Time += ' days ago'
        }
        else {
            Difference_In_Time += ' day ago'
        }
    }
    else if(Math.floor(Difference_In_Time / 1000 / 60 / 60) > 0) {
        Difference_In_Time = Math.floor(Difference_In_Time / 1000 / 60 / 60)
        if (Difference_In_Time > 1) {
            Difference_In_Time += ' hours ago'
        }
        else {
            Difference_In_Time += ' hour ago'
        }
    }
    else {
        Difference_In_Time = Math.floor(Difference_In_Time / 1000 / 60 )
        if(Difference_In_Time > 0) {
            if (Difference_In_Time > 1) {
                Difference_In_Time += ' minutes ago'
            }
            else {
                Difference_In_Time += 'minute ago'
            }
        }
            else {
            Difference_In_Time = ' Just now'
        }
    }
        return Difference_In_Time
});
Vue.use(VueLazyload, {
    preLoad: 2,
    error: errorimage,
    loading: loadimage,
    attempt: 2
})
Vue.use(VueLazyload)
Vue.use(Croppa)
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
