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
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match('/offline');
          });
      })
    );
  }
});


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