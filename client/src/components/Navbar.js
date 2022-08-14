import React, { useContext } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import './Navbar.css'

export const Navbar = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <div>
      <div className='nav'>
      <p>Save useful links and make your to-do list!</p>
        <ul className='nav_links'>
          <li className='nav_li'><Link to="/create">Create</Link></li>
          <li className='nav_li'><Link to="/links">Links</Link></li>
          <li className='nav_li'><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}
