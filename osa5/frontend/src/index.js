import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import blogService from './services/blogs'
import userService from './services/users'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm.js'
import BlogForm from './components/BlogForm.js'
import Notification from './components/Notification.js'
import Users from './components/Users.js'
import User from './components/User.js'
import Blogs from './components/Blogs.js'
import Menu from './components/Menu.js'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
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
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
  }, [blogs])

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
      let blogToAdd = await blogService.create(blogObject)
      blogToAdd.user = {
        id: blogToAdd.user,
        name: user.name,
        username: user.username
      }
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
    const blogsWithoutLikedBlog = blogs.filter(blog => blog.id !== blogObject.id)
    blogService
      .update(blogObject.id, blogObject)
      .then(returnedObject => {
        returnedObject.user = {
          id: returnedObject.user,
          name: blogObject.user.name,
          username: blogObject.user.username
        }
        returnedObject.comments = blogObject.comments
        setBlogs(blogsWithoutLikedBlog.concat(returnedObject))
      })
    setMessage('The blog has been liked!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addComment = async (comment) => {
    console.log(comment)
    const blogToComment = blogs.find(blog => blog.id === comment.id)
    let comments = blogToComment.comments
    const blogsWithoutCommented = blogs.filter(blog => blog.id !== comment.id)
    try{
      const response = await blogService.comment(comment)
      comments = comments.concat(response)
      blogToComment.comments = comments
      setBlogs(blogsWithoutCommented.concat(blogToComment))
      setMessage('The blog has been commented!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(error) {
      setErrorMessage('Could not comment on the blog.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }

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
    <Router>
      <div>
        <Menu loggedUser={user} handleLogout={handleLogout} />
        <h2>Blog App</h2>
        <Notification message={message} errorMessage={errorMessage} className={['success', 'error']} />
        <Switch>
          <Route path="/users/:id">
            <User users={users}/>
          </Route>
          <Route path="/users">
            <Users users={users}/>
          </Route>
          <Route path="/create">
            <BlogForm createBlog={addBlog}/>
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} likedBlog={addLike} deleteBlog={removeBlog} handleComment={addComment} loggedUser={user}/>
          </Route>
          <Route path="/">
            <Blogs blogs={blogs}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))