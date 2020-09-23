  
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_AUTHOR = gql`
  mutation changeBornYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      id
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


const Authors = (props) => {
  const [ author, setAuthor ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ changeBornYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ 
      { query: ALL_AUTHORS },
    ]
  })

  if (!props.show) {
    return null
  }

  const authors = [ ...props.authors]

  const update = async (event) => {
    event.preventDefault()

    changeBornYear({ variables: { name: author, setBornTo: parseInt(born) } })
    setAuthor('')
    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
            <h3>Set birthyear</h3>
            <form onSubmit={update}>
              <div>
                Name
                <input value={author} onChange={({ target }) => setAuthor(target.value)}/>
              </div>
              <div>
                Born
                <input type="number" value={born} onChange={({ target }) => setBorn(target.value)}/>
              </div>
              <div>
                <button type="submit">Update author</button>
              </div>
            </form>
    </div>
  )
}

export default Authors
