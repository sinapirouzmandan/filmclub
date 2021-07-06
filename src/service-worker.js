/* eslint-disable no-console */

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
// eslint-disable-next-line no-undef
workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // eslint-disable-next-line no-undef
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            // eslint-disable-next-line no-undef
            new workbox.expiration.Plugin({
                maxEntries: 40,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

self.addEventListener('fetch', function (event) {
    if (event.request.method === 'GET' && event.request.url.indexOf('cdn.inspectlet.com') !== -1) {
        event.respondWith(fetch(event.request));
        console.log('fetch from inspectlet only online')
        }
    else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            }),
        );
        console.log('Cache, falling back to network')
    }
});
self.addEventListener("message", msg=>{
    if (msg.data.action == 'skipWaiting'){
        self.skipWaiting()
    }
})
