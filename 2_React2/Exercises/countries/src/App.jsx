import { useEffect } from "react"
import { useState } from "react"
import countriesServices from './services/countries'
import Countries from "./components/Countries"

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])


  useEffect(() => {
    countriesServices
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input onChange={handleSearch} value={search} />
      <Countries countries={countries} search={search} setSearch={setSearch}/>
    </div>
  )
}

export default App