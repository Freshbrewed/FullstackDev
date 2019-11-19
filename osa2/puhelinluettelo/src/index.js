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
  const [ refresh, setRefresh] = useState(0)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)})
  }, [refresh])



  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
        name: newName,
        number: newNumber,
        id: Date.now()
    }

    if (persons.find(person => personObject.name.toLowerCase() === person.name.toLowerCase())) {
       if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
         const personToUpdate = persons.find(person => personObject.name.toLowerCase() === person.name.toLowerCase())
         console.log(personToUpdate)
          updatePerson(personToUpdate)
       }
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

  const updatePerson = (personToUpdate) => {
    const changedPerson = { ...personToUpdate, number: newNumber}

    personService
    .update(changedPerson.id, changedPerson)
    .then(updatedPerson => {
      setPersons(persons.map(person => person.id !== personToUpdate ? person : updatedPerson))
      setRefresh(refresh+1)
    })
  }


  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(id)
      .then(response => {
        console.log('RESPONSE', response)
        setRefresh(refresh+1)
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

  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange}  />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} onChange={[handlePersonChange,handleNumberChange]} onSubmit={addPerson}/>
      <h2>Numbers </h2>
      <ShowPersons persons={persons} search={newSearch} deletePerson={deletePerson} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));


