import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { axios } from 'frontend-essentials'

import App from 'containers/App'
import 'service-worker-registration'
import 'normalize.css'
import 'styles/_globals.scss'

const { SERVER_URL } = process.env

axios.defaults.baseURL = SERVER_URL
axios.defaults.withCredentials = true

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
