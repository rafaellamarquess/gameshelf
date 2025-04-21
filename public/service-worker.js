self.addEventListener('install', event => {
    console.log('[Service Worker] Instalado');
    event.waitUntil(
      caches.open('gameshelf-v1').then(cache => {
        return cache.addAll([
          '/',
          '/favicon.ico',
          '/icons/android/icon-192x192.png',
          '/icons/android/icon-512x512.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });  