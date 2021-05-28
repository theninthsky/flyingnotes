import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})
