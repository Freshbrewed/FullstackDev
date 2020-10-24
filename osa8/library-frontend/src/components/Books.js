import React, { useState } from 'react'
import { ALL_GENRES } from '../queries'

/*function flatten(arr){
  let flattened = [];
  for(let i = 0; i < arr.length; i++){
    flattened = flattened.concat(arr[i]);
  }

  let uniques = [];
  for(let i = 0; i < flattened.length; i++){
    if(uniques.includes(flattened[i])) continue;
    else uniques.push(flattened[i])
  }

  return uniques
}*/

const Books = ({ show, allBooks }) => {
  const [books, setBooks] = useState(allBooks)
  const [isFiltered, setFiltered] = useState(null)


  if (!show) {
    return null
  }
  const genres = allBooks.map(e => e.genres)
  let uniques = [...new Set(genres.flat())]
  //let uniques = flatten(genres)
  /*let hh = genres.reduce((a, c) => {
     return a.concat(c)
   }, [])*/

  const filter = (clickedGenre) => {
    setFiltered(clickedGenre)
    const chosen = allBooks.filter(book => book.genres.includes(clickedGenre))
    setBooks(chosen)
  }

  if (isFiltered) 
  return (
    <div>
      <h2>books</h2>
        <div>in genre <b>{isFiltered}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="oneLine">
        {uniques.map(e =>
          <button onClick={() => filter(e)} key={e} label={e}>{e}</button>
        )}
      </div>
      <button onClick={() => setFiltered(null)}>RESET</button>
    </div>
  )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="oneLine">
        {uniques.map(e =>
          <button onClick={() => filter(e)} key={e} label={e}>{e}</button>
        )}
      </div>
      <button onClick={() => setFiltered(null)}>RESET</button>
    </div>
  )
}

export default Books