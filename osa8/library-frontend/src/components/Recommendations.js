import React from 'react'


const Recommendations = ({ show, allBooks, genre }) => {
  if (!show) {
    return null
  }

  console.log(genre)
  const filtered = allBooks.filter(book => book.genres.includes(genre))



  return (
    <div>
      <h2>Recommendations</h2>
        <div>books in your favorite genre <b>{genre}</b></div>
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
          {filtered.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations