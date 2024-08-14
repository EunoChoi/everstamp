// public/sw.js
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = ['/offline',
  'img/emotion/emotion0.png',
  'img/emotion/emotion1.png',
  'img/emotion/emotion2.png',
  'img/emotion/emotion3.png',
  'img/emotion/emotion4.png',
]; // 캐싱할 페이지나 리소스

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        const { request } = event;

        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        const networkResponse = await fetch(request);

        return networkResponse;
      } catch (error) {
        return handleOffline();
      }
    })()
  );
});

async function handleOffline() {
  try {
    const offlineResponse = await caches.match('/offline');
    if (offlineResponse) {
      return offlineResponse;
    }
    return new Response('<h1>Offline</h1><p>Please check your network connection.</p>', {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return new Response('<h1>Offline.</h1><p>Please check your network connection.</p>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});