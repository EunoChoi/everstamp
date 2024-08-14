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
    caches.match(event.request)
      .then(response => {
        // 캐시된 응답이 있으면 반환하고, 그렇지 않으면 네트워크 요청
        return response || fetch(event.request);
      }).catch(() => {
        // 네트워크가 불가능할 때 오프라인 페이지 제공
        return caches.match('/offline');
      })
  );
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