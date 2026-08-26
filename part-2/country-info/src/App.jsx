import { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
      console.log(response.data[0].flag)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = filter === ''
  ? []
  : countries.filter(
      country => country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    
  return (
    <div>
      find countries <input type="search" value={filter} onChange={handleFilterChange}/>  
      {countriesToShow.length > 10 && countriesToShow.length > 1
       ? <p>Too many matches, specify another filter</p>
       : countriesToShow.map(country => (
          <p key={country.flag}>
            {country.name.common}
          </p>
        ))}    
    </div>
  )
}

export default App
