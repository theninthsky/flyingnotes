import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { axios } from 'frontend-essentials'

import App from 'containers/App'
import 'service-worker-registration'
import 'normalize.css'
import 'styles/_globals.scss'

axios.defaults.baseURL = process.env.SERVER_URL
axios.defaults.withCredentials = true

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <ErrorBoundary
        fallback={<div>An error occured, please reload the app.</div>}
        onError={() => localStorage.clear()}
      >
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
)
