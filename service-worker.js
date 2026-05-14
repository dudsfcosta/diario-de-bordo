const CACHE_NAME = 'diario-cache-v1';

const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// install - primeira vez que o sw é instalado
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
  );
});

// activate - ativado após a instalação (limpar caches antigos)
self.addEventListener('activate', event => {
    console.log('Service worker activated');
  event.waitUntil(
    caches.keys().then((keys) => {
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    })
  );
});

// fetch - intercepta as requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then((res) => res || fetch(event.request))
    )
});
