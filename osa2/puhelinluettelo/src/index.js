import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)})
  }, [])
  console.log('Rendered', persons.length, 'persons')




  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
    }

    if (persons.filter(person => personObject.name === person.name).length > 0) {
        window.alert(`${personObject.name} is already added to phonebook.`)
    }
    else {
        personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }



  const handlePersonChange = (event) => {
      setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
  }

  const handleDelete = () => {

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange}  />
      <h3>Add a new</h3>
      <PersonForm value={[newName, newNumber]} onChange={[handlePersonChange,handleNumberChange]} onSubmit={addPerson}/>
      <h2>Numbers </h2>
      <ShowPersons persons={persons} search={newSearch} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));


