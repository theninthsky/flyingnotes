const standalone = window.matchMedia('(display-mode: standalone)').matches

const register = () => {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(standalone ? 'stale-while-revalidate-sw.js' : 'network-first-sw.js')
      .then(() => console.log('Service worker registered!'))
      .catch(error => console.log(`Service worker registration failed: ${error}`))
  })
}

const unregister = () => {
  navigator.serviceWorker.ready
    .then(registration => registration.unregister())
    .then(() => console.log('Service worker unregistered!'))
    .catch(error => console.error(error.message))
}

if ('serviceWorker' in navigator) {
  process.env.NODE_ENV === 'development' ? unregister() : register()
}
