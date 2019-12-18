/* eslint-disable no-unused-vars */
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
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(false)
    const [showBlog, setShowBlog] = useState()

    
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

    const addBlog = async (event) => {
        event.preventDefault()

        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }

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
    
    const handleLogin =  async (event) => {
        event.preventDefault()
        try {
            const user = await blogService.login({username, password})

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
    
    const handleShow = () => {
        setShow(!show)
    }

    const handleShowBlog= () => {
        setShowBlog(!showBlog)
        console.log('clicked')
    }

    console.log(showBlog)

    if (user === null) {
        return (
          <div>
            <Notification message={message} errorMessage={errorMessage} className={['success', 'error']} />
            <h2>Log in to application</h2>
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
          {show === false && <button onClick={handleShow}>New note</button>}
          {show === true && <BlogForm title={newTitle} author={newAuthor} url={newUrl} addBlog={addBlog}
          setNewAuthor={setNewAuthor} setNewTitle={setNewTitle} setNewUrl={setNewUrl} handleShow={handleShow}/>}
          

        <Blog blogs={blogs} showBlog={showBlog} handleShowBlog={handleShowBlog} />

          <button onClick={handleLogout}>Log out</button>
        </div>
      )
    
}

ReactDOM.render(<App />, document.getElementById('root'))