import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)
  if (!user) {
    return null
  }
  const blogs = user.blogs
  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {blogs.map(blog =>
        <ul key={blog.id}>
          <li>
            {blog.title}
          </li>
        </ul>
      )}

    </div>
  )
}

export default User