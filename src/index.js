import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'

import { createWebSocketConnection } from './websocketConnection'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './store'
import App from './components/App'

ReactDOM.render(
  <RecoilRoot>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </RecoilRoot>,
  document.getElementById('root'),
)

createWebSocketConnection()
serviceWorkerRegistration.register()
