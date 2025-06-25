import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const username = localStorage.getItem("name");
  return (
    <>
      
      <nav className="custom-nav">
        <div className="nav-left">
          <a href="#" className="nav-brand">
            Hostel Complaint Portal
          </a>
        </div>
        
        <div className="nav-center">
          <span className="welcome-text">Welcome,</span>
          <span className="username">{username}</span>
        </div>
        <div className="nav-right">
            <Link to={'/signin'}   className="logout-btn" > Logout</Link>
        </div>
      </nav>
    </>
  )
}

export default Nav