import React from 'react'
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
    const {user,logout}=useContext(AuthContext)
  return (
    <nav>
        <Link to="/">DevConnect</Link>
        {user ? (
            <>
            <span>Welcome, {user.name} </span>
            <button onClick={logout}>Logout</button>
            <Link to="/profile">Profile</Link>
            <Link to="/developers">Developers</Link>
            



            </>
        ):(
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
        )}
    </nav>
  )
}

export default Navbar
