import React, { useState } from 'react'
import { useEffect } from 'react';


const CardWeather = ({weather,  geolocation, objRandom}) => {

    const [change, setChange] = useState(true)
    const [bgImage, setBgImage] = useState('')
    
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = `${day}/${month}/${year}`;


    const changeTemp = () => {
      setChange(!change)  
    }  
   
    
    const arrayRandom = [
      'random1',
      'random2', 
      'random3', 
      'random4', 
      'random5', 
      'random6', 
      'random7', 
      'random8', 
      'random9',
      'random10',
      'random11',
      'random12',
      'random13',
      'random14',
      'random15',
      'random16',
      'random17',
      'random18',
      'random19',
      'random20',
      'random21',
    ]

    useEffect(() => {

        if(weather){
          const i = arrayRandom[Math.floor(Math.random() * arrayRandom.length)]
          setBgImage(i)
        }
    }, [weather])
    

  return (
    <div className='container'>
                
                { objRandom &&
                    <button className='btn-location' onClick={geolocation}><i className="fa-solid fa-location-dot icon-location"></i></button>
                }

                  <div className='card-position'>
                    <h2>{weather?.name}, {weather?.sys.country}</h2>
                    <h3> {date} </h3>
                  </div>

                    <div className={objRandom ? `card-right ${bgImage}`: 'card-right'}>
              
                    <span>
                      {
                      change ? (
                          `${(weather?.main.temp - 273.15).toFixed(1)} ºC`
                        ): (
                          `${(((weather?.main.temp - 273.15)* 1.8)+32).toFixed(1)} ºF`
                        )
                      }
                    </span>

                    <button className='card-right_btn_change' onClick={changeTemp} >Degrees {change ? 'ºF': 'ºC'}  </button>
                  </div>
                  
                  <div className='card-left'>
                    <div className='icon'>
                      <img src={`http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`} alt="icon" />
                      <p>{weather?.weather[0].description}</p>
                    </div>
                
                    <p><i className="fa-solid fa-wind"></i> <span>Wind speed: </span>{weather?.wind.speed} m/s</p>
                    <p><i className="fa-solid fa-cloud"></i> <span>Clouds: </span>{weather?.clouds.all} %</p>
                
                    <p><i className="fas fa-temperature-up"></i> <span>Temp max: : </span>{(weather?.main.temp_max - 273.15).toFixed(1)} ºC</p>
                    <p><i className="fas fa-temperature-down"></i> <span>Temp min: : </span>{(weather?.main.temp_min - 273.15).toFixed(1)} ºC</p>
                    <p> <span>Humidity: </span>{weather?.main.humidity} %</p>
                  </div>
                </div>
  )
}

export default CardWeather