import React from 'react'

const ShowPersons = ({persons, search}) => {
    const filtered = persons.filter(person => 
      (person.name.toLocaleLowerCase().includes(search) && person.name.toLocaleLowerCase().indexOf(search) < 1))
      console.log("Filtered", filtered)
    return (
      <div>{filtered.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
    )
  }

  export default ShowPersons
  