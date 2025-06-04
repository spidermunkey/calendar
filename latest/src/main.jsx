import '../sass/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { Dashboard } from './dashboard/Dashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App>
      <Dashboard></Dashboard>
    </App>
  </StrictMode>,
)
