import React from 'react'
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <div> 
      <h1>404 Not Found</h1>
      <Link to={"/"}>
        <button>home</button>
      </Link>
    </div>
  )
}

export default NotFoundPage
