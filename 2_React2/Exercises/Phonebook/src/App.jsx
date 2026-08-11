import { useState, useEffect } from "react";
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personServices.getAll().then(response => {
      setPersons(response)
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
    
    const personExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(personExists){
      const newPerson = {...personExists, number:newPhone}
      console.log(newPerson)
      if(window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)){
        personServices.update(newPerson).then(response => {
          setPersons(persons.map(person => person.id === response.id ? response : person))
        })
      }
      setNewName('')
      setNewPhone('')
      return 
    }
    const newPerson = {
      name: newName,
      number: newPhone,
    }

    personServices.create(newPerson).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewPhone('')
    })
  }

  const handleDelete = (person) => {
      if(window.confirm(`Delete ${person.name}`)){
        console.log('deleteting', person.id);
        personServices.Delete(person).then(response => {
          setPersons(persons.filter(person => person.id !== response.id))
        })
      }
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
      <Persons persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App