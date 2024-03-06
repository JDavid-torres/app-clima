import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import Weather from './components/Weather'
import Loading from './components/Loading'

function App() {

const [coords, setCoords] = useState()
const [weater, setWheater] = useState()
const [temp, settemp] = useState()
const [isLoading, setIsLoading] = useState(true)
const [error, seterr] = useState(false)
  const succes = info => {
setCoords({
 lat: info.coords.latitude,
 lon: info.coords.longitude
})
  }
  const err = () => {
setIsLoading(false)
  }
useEffect(() => {
  navigator.geolocation.getCurrentPosition(succes, err)
}, [])
 
 useEffect(() => {
  if (coords) {
    const APIKEY =`e4f6d05e675804a2e76c13fc6beb83cb`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
  
    axios.get(url)
.then(res => {setWheater(res.data)
const celsius = (res.data.main.temp - 273.15).toFixed(1)
const fahrenheit = ((9/5 * celsius) + 32).toFixed(1)
settemp({
celsius, fahrenheit
})
  })
.catch(err => console.log(err))
.finally(() => setIsLoading(false))
  }
 }, [coords])

  return (
<div className='app'>
{
  isLoading 
  ? <Loading/>
  : (
   <Weather
    weather={weater}
    temp={temp}/>
  ) 
  }
  
</div>
)
}

export default App
