import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm.js'
import BlogForm from './components/BlogForm.js'
import Notification from './components/Notification.js'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const blogToAdd = await blogService.create(blogObject)
      setBlogs(blogs.concat(blogToAdd))
      setMessage(`A new blog ${blogToAdd.title} by ${blogToAdd.author} has been added.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(error) {
      setErrorMessage(`${error}. Make sure Title and Author are provided.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      console.log('Following blog has been removed from database.')
      console.log(blogObject)
      const updatedBlogs = blogs
        .filter(blogs => blogs.id !== blogObject.id)
      setBlogs(updatedBlogs)
      console.log('Updated current blog list.')
      setMessage(`${blogObject.title} by ${blogObject.author} has been deleted.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch(error) {
      setErrorMessage(`${error}.Unable to delete selected blog.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = (blogObject) => {
    console.log(blogObject)
    const blogsWithoutLikedBlog = blogs.filter(blog => blog.id !== blogObject.id)
    blogService
      .update(blogObject.id, blogObject)
      .then(returnedObject => {
        console.log(returnedObject)
        setBlogs(blogsWithoutLikedBlog.concat(returnedObject))
      })
    setMessage('The blog has been liked!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({ username, password })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      console.log('Token of logged user: ', user.token)
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`User ${user.name} has succesfully logged in.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      window.localStorage.removeItem('loggedAppUser')
      setMessage('Logged succesfully off.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUser(null)
    } else {
      setErrorMessage('You´re not logged in.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        <Notification message={message} errorMessage={errorMessage} className={['success', 'error']} />
        <LoginForm handleLogin={handleLogin} username={username}
          password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} errorMessage={errorMessage} className={['success', 'error']} />
      <p>{user.name} has logged in.</p>
      <BlogForm createBlog={addBlog}/>
      {blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
        .map((blog, index) =>
          <Blog blog={blog} likedBlog={addLike} deleteBlog={removeBlog} loggedUser={user} key={index} />
        )}
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))