import '../sass/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Calendar from './dashboard/calendar/Calendar'
import { AppProvider } from 'context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Calendar/>
    </AppProvider>
  </StrictMode>,
)
