import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { ErrorBoundary } from 'react-error-boundary'

import { auth } from 'firebase-app'
import App from 'containers/App'
import 'service-worker-registration'
import 'normalize.css'
import 'styles/_globals.scss'

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary fallback={<div>An error occured, please reload the app.</div>} onError={() => signOut(auth)}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
)
