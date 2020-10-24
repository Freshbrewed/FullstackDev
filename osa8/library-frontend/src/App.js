
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'
import './App.css'




const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('')
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [userGenre, setUserGenre] = useState(null)


  useEffect(() => {
    if (authors.data) {
      setPage('authors')
    }
  }, [authors, books, token])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('library-user-token')
    if (loggedUser) setToken(loggedUser)
    const loggedUserGenre = window.localStorage.getItem('library-user-genre')
    if (loggedUserGenre) setUserGenre(loggedUserGenre)
  }, [])

  if (authors.loading || books.loading || page === '') return <div>Loading...</div>

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notification errorMessage={errorMessage} />

        <Authors
          show={page === 'authors'} authors={authors.data.allAuthors}
        />

        <Books
          show={page === 'books'} allBooks={books.data.allBooks}
        />

        <LoginForm
          show={page === 'login'} setToken={setToken} setErrorMessage={setErrorMessage} setUserGenre={setUserGenre}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors} token={token} setErrorMessage={setErrorMessage}
      />

      <Books
        show={page === 'books'} allBooks={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'} allBooks={books.data.allBooks} genre={userGenre}
      />

    </div>
  )
}

export default App