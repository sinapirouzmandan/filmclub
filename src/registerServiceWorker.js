/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { swal } from 'sweetalert'

const notifyUserAboutUpdate = worker => {
  swal({
    title: "New update arrived",
    text: "Do you want to accept update now?",
    icon: "success",
    buttons: true,
  })
      .then((willUpdate) => {
        if (willUpdate) {
          worker.postMessage( {action: "skipWaiting"} )
        } else {
          setTimeout(() => {}, 60000)
        }
      });
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
          'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    // eslint-disable-next-line no-unused-vars
    registered (registration) {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    // eslint-disable-next-line no-unused-vars
    updatefound (registration) {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      notifyUserAboutUpdate(registration.waiting)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  });
  // eslint-disable-next-line no-unused-vars
  var refreshing;
  navigator.serviceWorker.addEventListener("controllerchange", function() {
    window.location.reload();
    refreshing = true;
  })
}
