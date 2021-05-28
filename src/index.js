import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'

import { App } from 'containers'

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <ErrorBoundary
        fallback={<div>An error occured, please reload the app.</div>}
        onError={() => localStorage.clear()}
      >
        <App />
      </ErrorBoundary>
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
)

const standalone = window.matchMedia('(display-mode: standalone)').matches

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(standalone ? 'stale-while-revalidate-sw.js' : 'network-first-sw.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
