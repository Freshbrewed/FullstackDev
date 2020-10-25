import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_GENRES, SELECTED_GENRE } from '../queries'

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
  const genres = useQuery(ALL_GENRES)
  const [getFilteredBooks, result] = useLazyQuery(SELECTED_GENRE)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const allGenres = genres.data.allBooks.map(e => e.genres)
  const uniques = [...new Set(allGenres.flat())]
  //let uniques = flatten(genres)
  /*let hh = genres.reduce((a, c) => {
     return a.concat(c)
   }, [])*/

  const filter = async (clickedGenre) => {
    getFilteredBooks({ variables: { genre: clickedGenre } })
    //  console.log(result.data)
    //if (result && result.data) {
    // const chosen = allBooks.filter(book => book.genres.includes(clickedGenre))
    // setBooks(result.data.allBooks)
    //} 
  }

  console.log(books);
  
  if (result.loading) return <div>Loading...</div>

  if (result.data)
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
        <button onClick={() => setBooks(allBooks)}>RESET</button>
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
    </div>
  )
}

export default Books