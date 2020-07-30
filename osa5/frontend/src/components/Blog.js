import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likedBlog, deleteBlog, loggedUser }) => {
  const [show, setShow] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  }

  const addLike = (event) => {
    event.preventDefault()
    likedBlog({
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if(window.confirm('Do you really want to delete selected blog?'))
      deleteBlog({
        id: blog.id,
        title: blog.title,
        author: blog.author
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

  if(show === true && loggedUser.username === blog.user.username)
    return (
      <div style={blogStyle} className='owner'>
        <div>
          {blog.title}<button onClick={handleShow}>Hide</button>
        </div>
        <div>{blog.url} </div>
        <div className='likeCount'>Likes {blog.likes} <button onClick={addLike}>Like</button> </div>
        <div>{blog.user.name}</div>
        <button id='deleteButton' onClick={removeBlog}>Delete</button>
      </div>
    )
  if(show === true && loggedUser.username !== blog.user.username)
    return (
      <div style={blogStyle} className='notOwner'>
        <div>
          {blog.title} <button onClick={handleShow}>Hide</button>
        </div>
        <div>{blog.url} </div>
        <div className='likeCount'>Likes {blog.likes} <button onClick={addLike}>Like</button> </div>
        <div>{blog.user.name}</div>
      </div>
    )
  return (
    <div style={blogStyle} className='toggleView'>
      {blog.title} {blog.author} <button id='viewButton' onClick={handleShow}>View</button>
    </div>
  )
}

export default Blog