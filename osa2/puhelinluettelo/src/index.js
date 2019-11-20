import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [ refresh, setRefresh] = useState(0)
  const [ message, setMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

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
          setMessage(`${personToUpdate.name}'s telephone number was succesfully updated.`)
          setTimeout(()=> {
            setMessage(null)
          }, 5000)
       }
    }
    else {
        personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setMessage(`${returnedPerson.name} was succesfully added to contact list.`)
          setTimeout(()=> {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
         setErrorMessage(`New person could not be added.`)
          setTimeout(()=> {
           setErrorMessage(null)
           setRefresh(refresh+1)
        }, 5000)
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
    .catch(error => {
      setErrorMessage(`Updating was not succesful.`)
      setTimeout(()=> {
        setErrorMessage(null)
        setRefresh(refresh+1)
      }, 5000)
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
        setMessage(`${person.name} has been succesfully deleted from contact list.`)
        setTimeout(()=> {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from the server.`)
        setTimeout(()=> {
          setErrorMessage(null)
          setRefresh(refresh+1)
        }, 5000)
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={'success'} />
      <Notification message={errorMessage} className={'error'} />
      <Filter onChange={handleSearchChange}  />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} onChange={[handlePersonChange,handleNumberChange]} onSubmit={addPerson}/>
      <h2>Numbers </h2>
      <ShowPersons persons={persons} search={newSearch} deletePerson={deletePerson} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));


