import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ loggedUser, handleLogout }) => {

  const padding = {
    paddingRight: 5
  }
  const paddingUser = {
    paddingTop: 8,
    paddingRight: 5,
    color: 'green'

  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <div style={paddingUser}>
            {loggedUser.name} has logged in.
          </div>
          <button onClick={handleLogout}>Logout</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu