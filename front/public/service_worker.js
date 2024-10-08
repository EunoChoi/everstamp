// public/sw.js
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = ['/offline',
  'img/emotion/emotion0.png',
  'img/emotion/emotion1.png',
  'img/emotion/emotion2.png',
  'img/emotion/emotion3.png',
  'img/emotion/emotion4.png',
]; // 캐싱할 페이지나 리소스

const OFFLINE_URL = '/offline';

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
  const requestUrl = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response; // 네트워크 응답 반환
        })
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              return cache.match(OFFLINE_URL);
            });
        })
    );
  }
  else if (requestUrl.pathname.startsWith('/_next/image')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // console.log('cache match', requestUrl);
        if (response) {
          return response;
        }

        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
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