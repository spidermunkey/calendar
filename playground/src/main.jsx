import '../sass/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {router} from '.'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router'


import Navbar from './exercises/Navbar'
import Home from './pages/Home'
import CalendarPage from './pages/Calendar'
import Flashcards from './pages/Flashcards'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/calendar' element={<CalendarPage/>}/>
        <Route path='/flashcards' element={<Flashcards/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
