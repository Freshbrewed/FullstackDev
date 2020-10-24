  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'


const Authors = (props) => {
  const [ born, setBorn ] = useState('')
  const [selectedOption, setSelectedOption] = useState("")

  const [ changeBornYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ 
      { query: ALL_AUTHORS },
    ],
    onError: (error) => {
      props.setErrorMessage(error.networkError.result.errors[0].message)
      setTimeout(() => {
      props.setErrorMessage(null)
     }, 5000)
     }
  })

  if (!props.show) {
    return null
  }

  const authors = [ ...props.authors]
  const options = authors.map(author => ({value: author.name, label: author.name}))


  const update = async (event) => {
    event.preventDefault()
    
    changeBornYear({ variables: { name: selectedOption.value, setBornTo: parseInt(born) } }) 
    setBorn("") 
  }

  if(!props.token) {
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
      </div>
    )
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
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
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
