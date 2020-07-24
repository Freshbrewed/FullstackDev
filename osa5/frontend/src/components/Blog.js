import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likedBlog, deleteBlog, loggedUser }) => {
  const [show, setShow] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likedBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired,
  }

  const addLike = (event) => {
    event.preventDefault()
    likedBlog({
      likes : blog.blog.likes + 1,
      id : blog.blog.id
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if(window.confirm('Do you really want to delete selected blog?'))
      deleteBlog({
        id: blog.blog.id,
        title: blog.blog.title,
        author: blog.blog.author
      })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    setShow(!show)
  }

  if(show === true && loggedUser.username === blog.blog.user.username)
    return (
      <div style={blogStyle}>
        <div>
          {blog.blog.title? blog.blog.title: 'testi'}<button onClick={handleShow}>Hide</button>
        </div>
        <div>{blog.blog.url} </div>
        <div>Likes {blog.blog.likes} <button onClick={addLike}>Like</button> </div>
        <div>{blog.blog.user.name}</div>
        <button onClick={removeBlog}>Delete</button>
      </div>
    )
  if(show === true && loggedUser.username !== blog.blog.user.username)
    return (
      <div style={blogStyle}>
        <div>
          {blog.blog.title} <button onClick={handleShow}>Hide</button>
        </div>
        <div>{blog.blog.url} </div>
        <div>Likes {blog.blog.likes} <button onClick={addLike}>Like</button> </div>
        <div>{blog.blog.user.name}</div>
      </div>
    )
  return (
    <div style={blogStyle}>
      {blog.blog.title} {blog.blog.author} <button onClick={handleShow}>View</button>
    </div>
  )
}

export default Blog