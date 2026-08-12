import Country from "./Country"

const Countries = ({countries, search, setSearch}) => {
    if(countries.length === 0){
        return null
    }
    const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    
    if(filterCountries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(filterCountries.length === 1) {
        const country = filterCountries[0]
        return (
            <Country country={country} />
        )
    }

    return (
        filterCountries.map((country) => {            
            return (
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => setSearch(country.name.common)}>Show</button>
                </div>
            )
        }) 
    )
}

export default Countries