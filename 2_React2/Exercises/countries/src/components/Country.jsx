import Weather from "./Weather"

const Country = ({country}) => {
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languages = country.languages
    const flagUrl = country.flags.png
    const flagAlt = country.flags.alt

    return (
        <div>
            <h1>{name}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <div>
                <h3>Languages</h3>
                <ul>
                    {Object.values(languages).map(language => {
                        return (
                            <li key={language}>{language}</li>
                        )
                    })}
                </ul>
                <img src={flagUrl} alt={flagAlt} />
            </div>
            <Weather city={capital} />
        </div>
    )
}

export default Country