const CACHE_NAME = 'show-your-debugging-v1';
const SHELL = ['/', '/demo', '/privacy', '/terms', '/favicon.svg', '/apple-touch-icon.png', '/assets/debug-trail-hero.webp'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(SHELL);
    const page = await fetch('/');
    const html = await page.text();
    const assetPaths = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((path) => path.startsWith('/') && !path.startsWith('//'));
    await cache.addAll([...new Set(assetPaths)]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(request, { ignoreVary: true });
    if (cached) return cached;
    if (request.mode === 'navigate') return caches.match('/', { ignoreVary: true });
    return new Response('This file is not available offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }));
});
