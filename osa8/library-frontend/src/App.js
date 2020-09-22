
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks  {
      title 
      author
      published 
      genres
    }
  }
`

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`
const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('')

  useEffect(() => {
    if (authors.data) {
      setPage('authors')
    }
  }, [authors, books])

  if (authors.loading || page === '') return <div>Loading...</div>


  //console.log(books)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App