import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import * as serviceWorkerRegistration from 'service-worker-registration'
import App from 'components/App'

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
)

serviceWorkerRegistration.register({
  onUpdate: registration => window.dispatchEvent(new CustomEvent('sw_update', { detail: registration }))
})

setTimeout(() => window.dispatchEvent(new CustomEvent('sw_update', { detail: { waiting: true } })), 2000)
