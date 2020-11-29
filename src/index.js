import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import App from 'components/App'

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
