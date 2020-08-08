import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ users }) => {

  const padding = {
    paddingLeft: 10
  }
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th>
                Blogs created
            </th>
          </tr>
        </tbody>
        {users.map(user =>
          <tbody key={user.id}>
            <tr>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td style={padding}>{user.blogs.length}</td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  )
}

export default User