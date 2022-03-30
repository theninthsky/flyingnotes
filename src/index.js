import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { ErrorBoundary } from 'react-error-boundary'

import app from 'firebase-app'
import App from 'containers/App'
import 'service-worker-registration'
import 'normalize.css'
import 'styles/_globals.scss'

const auth = getAuth(app)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<div>An error occured, please reload the app.</div>} onError={() => signOut(auth)}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
)
