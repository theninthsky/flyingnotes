import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'

import * as serviceWorkerRegistration from 'service-worker-registration'
import { App } from 'containers'

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <ErrorBoundary fallback={<div></div>} onError={() => localStorage.clear()}>
        <App />
      </ErrorBoundary>
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
)

serviceWorkerRegistration.register({
  onUpdate: registration => window.dispatchEvent(new CustomEvent('serviceworkerupdate', { detail: registration }))
})
