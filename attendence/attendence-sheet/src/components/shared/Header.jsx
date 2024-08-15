import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Navbar</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/teacher">Teacher</NavLink>
                <NavLink className="nav-link" to="#">Pricing</NavLink>
                <NavLink className="nav-link disabled">Disabled</NavLink>
            </div>
            </div>
        </div>
        </nav>
    </>
  )
}

export default Header