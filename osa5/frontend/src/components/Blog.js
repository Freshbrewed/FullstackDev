import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'

const Blog = ({ blogs, likedBlog, deleteBlog, loggedUser }) => {
  const [clicked, setClicked] = useState(false)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

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
    setClicked(!clicked)
    if(window.confirm('Do you really want to delete selected blog?'))
      deleteBlog({
        id: blog.id,
        title: blog.title,
        author: blog.author
      })
  }

  if (clicked) return <Redirect to="/" />

  if (loggedUser.username === blog.user.username)
    return (
      <div className='owner'>
        <h2>
          {blog.title}
        </h2>
        <div><a href={blog.url}>{blog.url}</a> </div>
        <div className='likeCount'>Likes {blog.likes} <button onClick={addLike}>Like</button> </div>
        <div>Added by {blog.user.name}</div>
        <button id='deleteButton' onClick={removeBlog}>Delete</button>
      </div>
    )

  return (
    <div className='notOwner'>
      <h2>
        {blog.title}
      </h2>
      <div><a href={blog.url}>{blog.url}</a> </div>
      <div className='likeCount'>Likes {blog.likes} <button onClick={addLike}>Like</button> </div>
      <div>Added by {blog.user.name}</div>
    </div>
  )
}

export default Blog