import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { ErrorBoundary } from 'react-error-boundary'

import app from 'firebase-app'
import App from 'containers/App'
import 'service-worker-registration'
import 'normalize.css'
import 'styles/_globals.scss'

const auth = getAuth(app)

render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<div>An error occured, please reload the app.</div>} onError={() => signOut(auth)}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
