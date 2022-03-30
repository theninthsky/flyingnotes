const networkFirst = async event => {
  try {
    const res = await fetch(event.request)
    const cache = await caches.open('flying-notes')

    event.waitUntil(cache.put(event.request, res.clone()))

    return res
  } catch (err) {
    return caches.match(event.request)
  }
}

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(caches.open('flying-notes').then(cache => cache.add('./')))
})

self.addEventListener('fetch', event => {
  if (event.request.url === self.registration.scope) event.respondWith(networkFirst(event))
})
