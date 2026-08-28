const CACHE_NAME = 'show-your-debugging-v2';
const SHELL = ['/', '/demo', '/privacy', '/terms', '/favicon.svg', '/apple-touch-icon.png', '/assets/debug-trail-hero-640.webp', '/assets/debug-trail-hero.webp'];

async function precache(cache, paths) {
  await Promise.allSettled(paths.map(async (path) => {
    const response = await fetch(path, { cache: 'reload' });
    if (response.ok) await cache.put(path, response);
  }));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await precache(cache, SHELL);
    try {
      const page = await fetch('/', { cache: 'reload' });
      const html = await page.text();
      const assetPaths = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
        .map((match) => match[1])
        .filter((path) => path.startsWith('/assets/') && !path.startsWith('//'));
      await precache(cache, [...new Set(assetPaths)]);
    } catch {
      // The core shell is already cached above. Optional discovery must not
      // prevent activation when a downloadable artifact is unavailable.
    }
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
