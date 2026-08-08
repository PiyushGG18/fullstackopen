import { useState, useEffect } from "react";
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if(personExists){
      alert(`${newName} is already added to Phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName} 
        newPhone={newPhone} 
        handleChange={handleChange} 
        handleNumChange={handleNumChange} 
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App