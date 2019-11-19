import React from 'react'

const ShowPersons = ({persons, search, deletePerson}) => {
    console.log('PERSONS', persons)
    const filtered = persons.filter(person => 
      (person.name.toLocaleLowerCase().includes(search) && person.name.toLocaleLowerCase().indexOf(search) < 1))
      console.log("Filtered", filtered)
      //
    return (
      <div>{filtered.map(person =>
         <div key={person.id}>
         {person.name} {person.number} &nbsp;
          <button onClick={() => deletePerson(person.id)}> Delete</button>
         </div>)}
      </div>
    )
  }

  export default ShowPersons
  