/* eslint-disable no-console */
import { register } from 'register-service-worker'
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
          'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    // eslint-disable-next-line no-unused-vars
    registered(registration) {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    // eslint-disable-next-line no-unused-vars
    updatefound(registration) {
      console.log('New content is downloading.')
    },
    // eslint-disable-next-line no-unused-vars
    updated(registration) {
      console.log('New content is available; please refresh.')
      alert('updating app in 1 minute. please save any unsaved work')
      setTimeout(() => {
        registration.waiting.postMessage({action: "skipWaiting"})
      }, 60000)
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  });
  // eslint-disable-next-line no-unused-vars
  var refreshing;
  try {
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      window.location.reload();
      refreshing = true;
    })
  }
  catch (e) {
    console.log(e)
  }
}
