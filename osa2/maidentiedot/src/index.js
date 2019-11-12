import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Filter from './components/Filter'



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

const ShowCountries = ({countries, handleButton}) => {
    
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
             <div key={index}> {country.name} <button onClick={() => handleButton(country)}>show</button> </div>)}</div>
    )
}

const App = () => {
    const [ weather, setWeather] = useState([])
    const [ countries, setCountries] = useState([])
    const [ newSearch, setNewSearch] = useState('')
    const filteredBySearch = countries.filter(country => country.name.toLocaleLowerCase().includes(newSearch))
    const params = {
        access_key: '73b61c2eaade5c31bfbeab9a452cc8a7',
        query: 'Helsinki'
    }

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {setCountries(response.data)})
      }, [])
    console.log('render', countries.length, 'countries')


    useEffect(() => {
        axios.get('https://api.weatherstack.com/current', {params}).then(response => {setWeather(response.data)})
      }, [])
    console.log('render', weather, 'weather')



    const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
     }

     const handleButtonClick = ({country}) => {
         console.log(country)
         setCountries([country])
     }


    return (
        <div>
        <Filter onChange={handleSearchChange} />
        <ShowCountries countries={filteredBySearch} handleButton={handleButtonClick}/>
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));

