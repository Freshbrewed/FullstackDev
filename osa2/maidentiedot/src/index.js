import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Filter from './components/Filter'


const ShowCountries = ({countries, search}) => {
    const filteredBySearch = countries.filter(country => country.name.toLocaleLowerCase().includes(search))
    console.log("Debug", countries[0])

    if (filteredBySearch.length > 10) {
        return (
            <div>Too many matches, specify another filter.</div>
        )
    }

    if (filteredBySearch.length === 1) {
        return (
            <div>{filteredBySearch.map(country =>
                <div key={country.alpha3Code}>
                  <h1>{country.name}</h1> 
                  <p>Capital {country.capital}</p>
                  <p>Population {country.population}</p>
                  <h3>Languages</h3>
                  <ul>
                      {filteredBySearch.map(country => 
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
    return (
        <div>{filteredBySearch.map(country => <div key={country.alpha3Code}> {country.name} </div>)}</div>
    )
}

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {setCountries(response.data)})
      }, [])
    console.log('render', countries.length, 'countries')


    const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
     }



    return (
        <div>
        <Filter onChange={handleSearchChange} />
        <ShowCountries countries={countries} search={newSearch} />
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));

