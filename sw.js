---
layout: null
---
const CACHE_NAME = 'buildtest-{{ site.pwa.cache_version }}';
const SITE_URL = '{{ site.url }}';
const BASE_URL = '{{ site.baseurl }}';
const urlsToCache = [
  BASE_URL + '/',
  '{{ site.logo | relative_url }}',
  '{{ site.pwa.icon_192 | relative_url }}',
  '{{ site.pwa.icon_512 | relative_url }}'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match(BASE_URL + '/');
        }
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});