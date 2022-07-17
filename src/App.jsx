import axios, { Axios } from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'
import Spinner from './components/Spinner'



function App() {


  
  const [obj, setObj] = useState()
  const [weather, setWeather] = useState()
  const [searchCountry, setSearchCountry] = useState()
  const [objRandom, setObjRandom] = useState(false)
  const [errorSearch, setErrorSearch] = useState(false)


  useEffect(() => {
      const success = pos  => {
        let lat = pos.coords.latitude
        let lon = pos.coords.longitude
        setObj({lat,lon}) 
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  
  const API_KEY = '2ffc88acab695e027a4cb6b72c69b69d'

  useEffect(() => {
    if (obj) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_KEY}`)
    .then(res => setWeather(res.data))
    }
  }, [obj] )


  const searchForCountry = (e) => {
    e.preventDefault()
    const search = e.target.children[0].value
    console.log(e.target.children[0].value)
    Form.reset()
      
          if(search.length > 1 ){

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
          .then(res => {setSearchCountry(res.data),
            setObjRandom(true)
            setErrorSearch(false)
          })
          .catch(err => (console.log(err),
          setErrorSearch(true),
          setTimeout(() => {
                                
            setErrorSearch(false)
            
        }, 2300)
          ))        
          }   
    
  }
  

  const toGoGeolocation = () => {
    setErrorSearch(false)
    setSearchCountry(null)  
  }



  return (

    <div className="App">

          {
            !weather ? 
              <Spinner />
             : 
              <>
                <h1>Weather App</h1>


                <form className='Form' id='Form' onSubmit={searchForCountry}>
                  <input className='form_input' placeholder='Search By Country....' type="text" />
                  <button className='form_btn'>Search</button>
                  { errorSearch &&
                    <div className='card-error_country'>
                    <p className='text-error_country'>your country was not found</p>
                  </div>}
                </form>

                {
                  searchCountry ?
                  <CardWeather 
                    weather={searchCountry}
                    geolocation={toGoGeolocation}
                    objRandom={objRandom}
                  />
                  :
                  <CardWeather 
                    weather={weather}               
                  />
                }
              </> 
          }      
    </div>
  )
}

export default App
