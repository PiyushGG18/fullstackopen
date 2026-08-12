import axios from "axios";
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = import.meta.env.VITE_SOME_KEY

const get = ( city ) => {
    const request = axios.get(`${baseUrl + city + '&appid=' + API_KEY}`)
    return request.then(response => response.data)
}

export default { get, }