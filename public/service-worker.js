/** On installation of the PWA */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('napolitano-photos-cache').then(function (cache) {
      return cache.addAll([
        // CSS
        '/css/chunk-vendors.d9bcfab8.css',
        '/css/app.24395733.css',
        // JS
        '/js/app.8757e6fa.js',
        '/js/chunk-vendors.26e5c343.js',
        // FONTS
        '/fonts/primeicons.943c3597.woff',
        '/fonts/primeicons.b29a888f.ttf',
        '/fonts/primeicons.e01fd413.eot',
        '/fonts/Raleway-Regular.75b4247f.ttf',
        '/fonts/RockSalt-Regular.1af0b153.ttf',
        // IMAGES
        '/img/404.b0f1c8c0.jpg',
        '/img/bars.svg',
        '/img/color.c7a33805.png',
        '/img/navbar-logo.3435f592.svg',
        '/img/primeicons.64b5d470.svg',
        '/img/wheel.svg',
        '/favicon.ico'
      ])
    })
  )
})
/** While fetching the PWA */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
