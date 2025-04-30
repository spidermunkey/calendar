import '../sass/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router'


import Navbar from './exercises/Navbar'
import Home from './pages/Home'
import Calendar from './exercises/calendar/_Page'
import Flashcards from './exercises/flashcards/_Page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
        <Route path='/flashcards' element={<Flashcards/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
