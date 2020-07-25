import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [show, setShow] = useState(false)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setShow(!show)
  }

  const handleShow = () => {
    setShow(!show)
  }

  if (show === true)
    return (
      <form className="blogform" onSubmit={addBlog}>
        <h3>Create new blog</h3>
        <div>
                    Title:
          <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
                    Author:
          <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
                    URL:
          <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type="submit">Create</button>
        <div><button onClick={handleShow}>Cancel</button></div>
      </form>
    )
  return (
    <button onClick={handleShow}>New blog</button>
  )
}

export default BlogForm