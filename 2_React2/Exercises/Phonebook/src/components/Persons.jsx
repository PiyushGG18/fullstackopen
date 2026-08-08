const Persons = ({persons, search}) => {
    return (
      persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.phone}
          </div>
        )
      })
    )
}

export default Persons