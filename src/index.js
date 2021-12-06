import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { ErrorBoundary } from 'react-error-boundary'

import app from 'firebase-app'
import App from 'containers/App'
import 'service-worker-registration'
import 'normalize.css'
import 'styles/_globals.scss'

const auth = getAuth(app)
const rootElement = document.getElementById('root')
const jsx = (
  <BrowserRouter>
  <ErrorBoundary fallback={<div>An error occured, please reload the app.</div>} onError={() => signOut(auth)}>
    <App />
  </ErrorBoundary>
  </BrowserRouter>
)

if (rootElement.hasChildNodes()) hydrate(jsx, rootElement)
else render(jsx, rootElement)
