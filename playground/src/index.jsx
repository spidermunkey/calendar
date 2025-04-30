import NotFoundPage from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import CalendarPage from './pages/Calendar.jsx'
import Flashcards from './pages/Flashcards.jsx'

import { createBrowserRouter } from 'react-router'


export const router = createBrowserRouter([
  {
    path:"/", 
    element: <Home/>
  },
  {
    path: "/calendar",
    element: <CalendarPage/>
  },
  {
    path:"/flashcards", 
    element: <Flashcards/>
  },
  { 
    path: '*',
    element: <NotFoundPage/>
  }
])
