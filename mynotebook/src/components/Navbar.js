import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Navbar = () => {
  let navigate = useNavigate()
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    navigate('/login')
  }
  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">myNotebook</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="/contact">Contact</Link>
          </li>
        </ul>
        {!localStorage.getItem('auth-token') ? <form className="form-inline my-2 my-lg-0">
          <Link class="btn btn-primary mx-4" to="/login" role="button">Login</Link>
          <Link class="btn btn-primary" to="/signup" role="button">Signup</Link>
        </form> : <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  )
}

export default Navbar
