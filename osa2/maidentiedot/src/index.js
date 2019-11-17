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

const ShowClicked = ({clickedCountry, weather}) => {
    console.log(clickedCountry)
    return (
        <div>{clickedCountry.map(country =>
            <div key={country.alpha3Code}>
              <h1>{country.name}</h1> 
              <p>Capital {country.capital}</p>
              <p>Population {country.population}</p>
              <h3>Languages</h3>
              <ul>
                  {clickedCountry.map(country => 
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

const ShowWeather = ({weather}) => {
    console.log(weather)
    if (weather.success === false) {
        return (
            <div></div>
        )
    }
    else return (
        <div>{weather.map((navigation, index) => 
            <div key={index}>
                {navigation.location.map(country => 
                <h3>Weather in {country.name}</h3>)}
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
            <ShowCountry countries={countries} /> 
        )
    }
    return (
        <div>{countries.map((country, index) =>
             <div key={index}> {country.name} <button onClick={() => handleButton(country)}>show</button> </div>)}</div>
    )
}

const App = () => {
    const [ query, setQuery] = useState('')
    const [ weather, setWeather] = useState([])
    const [ countries, setCountries] = useState([])
    const [ clickedCountry, setCountry] = useState([])
    const [ newSearch, setNewSearch] = useState('')
    const filteredBySearch = countries.filter(country => country.name.toLocaleLowerCase().includes(newSearch))
    const capitals = countries.map(country => country.capital)
    const params = {
        access_key: '73b61c2eaade5c31bfbeab9a452cc8a7',
        query: query[0]
      }
    
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {setCountries(response.data)})
      }, [])

    useEffect(() => {
        axios.get('http://api.weatherstack.com/current', {params}).then(response => {setWeather(response.data)})
      }, [query])




    const handleSearchChange = (event) => {
      setCountry([])
      setNewSearch(event.target.value.toLocaleLowerCase())
     }

     const handleButtonClick = (country) => {
         setQuery(capitals.filter(capital => capital === country.capital))
         setCountry([country])  
     }

    return (
        <div>
        <Filter onChange={handleSearchChange} />
        <ShowCountries countries={filteredBySearch} handleButton={handleButtonClick} weather={weather}/>
        <ShowClicked clickedCountry={clickedCountry} weather={weather} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

