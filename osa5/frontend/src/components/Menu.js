import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ loggedUser, handleLogout }) => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {loggedUser.name} has logged in.
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Menu