import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'

const Blog = ({ blogs, likedBlog, handleComment, deleteBlog, loggedUser }) => {
  const [clicked, setClicked] = useState(false)
  const [newComment, setNewComment] = useState('')
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
      id: blog.id,
      comments: blog.comments
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

  const addComment = (event) => {
    event.preventDefault()
    handleComment({
      comment: newComment,
      id: blog.id
    })
    setNewComment('')
  }

  if (clicked) return <Redirect to="/" />
  if (!blog) return null
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
        <h3>Comments</h3>
        <input value={newComment} onChange={({ target }) => setNewComment(target.value)}></input>
        <button onClick={addComment}>Add comment</button>
        {blog.comments.map(e =>
          <ul key={e.id}>
            <li>{e.comment}</li>
          </ul>
        )}
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
      <h3>Comments</h3>
      <input value={newComment} onChange={({ target }) => setNewComment(target.value)}></input>
      <button onClick={addComment}>Add comment</button>
      {blog.comments.map(e =>
        <ul key={e.id}>
          <li>{e.comment}</li>
        </ul>
      )}
    </div>
  )
}

export default Blog