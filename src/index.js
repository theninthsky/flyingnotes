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

const appIsInstalled = window.matchMedia('(display-mode: standalone)').matches

if (appIsInstalled) serviceWorkerRegistration.register()
else serviceWorkerRegistration.unregister()
