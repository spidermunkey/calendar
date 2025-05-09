import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='navbar'>
        {/* <div className='page-link'><NavLink to="/">Home</NavLink></div> */}
        <div className='page-link'><NavLink to="/calendar">Calendar</NavLink></div>
        <div className='page-link'><NavLink to="/flashcards">Flashcards</NavLink></div>
        <div className="page-link">
        </div>
    </div>
  )
}

export default Navbar
