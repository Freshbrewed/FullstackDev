import React from 'react'
//import PropTypes from 'prop-types'

const User = ({ users }) => {

  const padding = {
    paddingLeft: 10
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th></th>
          <th>
                Blogs created
          </th>
        </tr>
        {users.map(user =>
          <div key={user.id}>
            <tr>
              <td>{user.name}</td>
              <td style={padding}>{user.blogs.length}</td>
            </tr>
          </div>
        )}
      </table>
    </div>
  )
}

export default User