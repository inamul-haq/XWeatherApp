import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=b5f63519b6bf45b3a4555530232808&q=${city}`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch weather data')
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='App'>
        <input type='text' onChange={(e) => setCity(e.target.value)} className='inputField'  placeholder='Enter city name' />
        <button onClick={handleClick} className='searchButton'>Search</button>
      </div>
      <div className='ResultContainer'>
        {loading ? <p>Loading data...</p> : weatherData && (
          <div className='weather-cards'>
          <div className='weather-card'>
            <h1>Temperature</h1>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className='weather-card'>
            <h1>Humidity</h1>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className='weather-card'>
            <h1>Condition</h1>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <h1>Wind Speed</h1>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
