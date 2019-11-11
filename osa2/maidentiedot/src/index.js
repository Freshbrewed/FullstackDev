import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Filter from './components/Filter'

const Button = ({onClick}) => {
    return (
        <button onClick={onClick}>show</button>
    )
}

const ShowCountry = ({countries}) => {
    return (
        <div>{countries.map(country =>
            <div key={country.alpha3Code}>
              <h1>{country.name}</h1> 
              <p>Capital {country.capital}</p>
              <p>Population {country.population}</p>
              <h3>Languages</h3>
              <ul>
                  {countries.map(country => 
                    <div key={country.name}>  
                        {country.languages.map((language, index) => 
                             <li key={index}>
                                 {language.name}
                             </li>)}
                    </div>)}
             </ul>
            <img src={country.flag} style={{width:20 + '%'}} alt={'flag'}></img>
            </div>)}
       </div>
    )
}

const ShowCountries = ({countries, onClick}) => {
    
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter.</div>
        )
    }

    if (countries.length === 1) {
        return (
            <ShowCountry countries={countries}/> 
        )
    }
    return (
        <div>{countries.map((country, index) =>
             <div key={index}> {country.name} <Button onClick={onClick}/> </div>)}</div>
    )
}

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ newSearch, setNewSearch] = useState('')
    const filteredBySearch = countries.filter(country => country.name.toLocaleLowerCase().includes(newSearch))

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {setCountries(response.data)})
      }, [])
    console.log('render', countries.length, 'countries')


    const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
     }

     const handleButtonClick = () => {
         console.log('clicked')
     }


    return (
        <div>
        <Filter onChange={handleSearchChange} />
        <ShowCountries countries={filteredBySearch} onClick={handleButtonClick}/>
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));

