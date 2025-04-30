import React from 'react'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
        {/* <div className='page-link'><NavLink to="/">Home</NavLink></div> */}
        <div className='page-link'><NavLink to="/calendar">Calendar</NavLink></div>
        <div className='page-link'><NavLink to="/flashcards">Flashcards</NavLink></div>
    </div>
  )
}

export default Navbar
