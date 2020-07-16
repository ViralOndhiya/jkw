// var CACHE_NAME = 'cscipis-cache-v1';
// var urlsToCache = [
//     './?v3',
//     'service-worker.js?v3',
//     'manifest.json?v3',
//     //'style.css?v3',
//     // 'script.js?v3',  
//     //'icon-48x48.png?v3',
//    // 'icon-72x72.png?v3',
//     //'icon-144x144.png?v3',
//     'https://fonts.googleapis.com/css?family=Special+Elite'
// ];
// console.log('loading service-worker');

// self.addEventListener('install', function(event) {
//     // Perform install steps
//     console.log('installing sw');
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function(cache) {
//                 console.log('Opened cache');
//                 var x = cache.addAll(urlsToCache);
//                 console.log('cache added');
//                 return x;
//             })
//     );
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                     // Cache hit - return response
//                     if (response) {
//                         return response;
//                     }
//                     return fetch(event.request);
//                 }
//             )
//     );
// });




// var PRECACHE = 'precache-v1';
// var RUNTIME = 'runtime';

// // list the files you want cached by the service worker
// PRECACHE_URLS = [
//   'index.html',
//   './'
 
// ];


// // the rest below handles the installing and caching
// self.addEventListener('install', event => {
//   event.waitUntil(
//      caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
//   );
// });

// self.addEventListener('activate', event => {
//   const currentCaches = [PRECACHE, RUNTIME];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
//     }).then(cachesToDelete => {
//       return Promise.all(cachesToDelete.map(cacheToDelete => {
//         return caches.delete(cacheToDelete);
//       }));
//     }).then(() => self.clients.claim())
//   );
// });

// self.addEventListener('fetch', event => {
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(RUNTIME).then(cache => {
//           return fetch(event.request).then(response => {
//             // Put a copy of the response in the runtime cache.
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });

// var cached_urls = [
//    '/index.html', 
//   '/style.css',
//   '/icon-48x48.png',
//   '/icon-72x72.png',
//   '/icon-144x144.png'

// ];

self.addEventListener('fetch', function(event){
});