import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      userGenre
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation changeBornYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      id
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      author {
        name
        id
        born
      }
      title 
      published 
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`
export const SELECTED_GENRE = gql`
query allBooksGenre($genre: String!) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!, $author: String!, $published: Int!, $genres: [String!]
    ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`