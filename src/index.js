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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
