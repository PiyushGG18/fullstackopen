import { useState, useEffect } from "react";
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personServices from './services/persons'
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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
      if(window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)){
        personServices.update(newPerson).then(response => {
          setPersons(persons.map(person => person.id === response.id ? response : person))
          setMessage(`Modified ${response.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          setError(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
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
      setMessage(`Added ${response.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewPhone('')
    })
  }

  const handleDelete = (person) => {
      if(window.confirm(`Delete ${person.name}`)){
        personServices.Delete(person).then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error error={error}/>
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