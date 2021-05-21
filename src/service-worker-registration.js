const { hostname } = window.location

const localhost = Boolean(
  hostname === 'localhost' ||
    hostname === '[::1]' ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
)

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicURL = new URL(process.env.PUBLIC_URL, window.location.href)

    if (publicURL.origin !== window.location.origin) return

    window.addEventListener('load', () => {
      const swURL = `${process.env.PUBLIC_URL}/service-worker.js`

      if (!localhost) return registerValidSW(swURL, config)

      checkValidServiceWorker(swURL, config)
      navigator.serviceWorker.ready.then(() => {
        console.log(
          'This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA'
        )
      })
    })
  }
}

function registerValidSW(swURL, config) {
  navigator.serviceWorker
    .register(swURL)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing

        if (installingWorker == null) return

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://cra.link/PWA.'
              )

              if (config) config.onUpdate?.(registration)
            } else {
              console.log('Content is cached for offline use.')

              if (config) config.onSuccess?.(registration)
            }
          }
        }
      }
    })
    .catch(error => console.error('Error during service worker registration:', error))
}

function checkValidServiceWorker(swURL, config) {
  fetch(swURL, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      const contentType = response.headers.get('content-type')

      if (response.status !== 404 && contentType && contentType.includes('javascript')) {
        return registerValidSW(swURL, config)
      }

      navigator.serviceWorker.ready.then(registration => {
        registration.unregister().then(() => window.location.reload())
      })
    })
    .catch(() => console.log('No internet connection found. App is running in offline mode.'))
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => registration.unregister())
      .catch(error => console.error(error.message))
  }
}
