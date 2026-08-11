import personServices from '../services/persons'

const Persons = ({persons, search, handleDelete}) => {
    return (
      persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        )
      })
    )
}

export default Persons