import { useState } from 'react'
import weatherService from '../services/weather'
import { useEffect } from 'react'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService.get(city).then(response => {
            setWeather(response)
        })
    }, [city])

    if(!weather){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Weather in {city}</h2>
            <div>Temperature {(weather.main.temp - 282).toFixed(2)} Celsius</div>
            <img src={'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png'} alt={weather.weather[0].description} />
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather