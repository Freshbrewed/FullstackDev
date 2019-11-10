import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {setPersons(response.data)})
  }, [])
  console.log('render', persons.length, 'persons')

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
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        
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


