import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
  }


  return (
    <form className="blogform" onSubmit={addBlog}>
      <h3>Create new blog</h3>
      <div>
                    Title:
        <input id='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
                    Author:
        <input id='author' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
                    URL:
        <input id='url' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <button id='submit' type="submit">Create</button>
    </form>
  )

}

export default BlogForm