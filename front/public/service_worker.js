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

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Next.js의 페이지 요청인 경우에만 네트워크 우선 전략 적용
  if (requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/')) {
    event.respondWith(
      (async () => {
        try {
          // 네트워크 요청 시도
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // 네트워크 요청이 실패한 경우
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // 캐시에도 없는 경우 오프라인 페이지 제공
          return caches.match('/offline');
        }
      })()
    );
  } else {
    // 일반적인 요청 처리 (예: API 요청 등)
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
        .catch(() => caches.match('/offline'))
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