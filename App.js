import React, { useState } from 'react';

import { getWeatherData, getForecastData } from './WeatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const weatherResponse = await getWeatherData(city);
      const forecastResponse = await getForecastData(city);
      setWeather(weatherResponse.data);
      setForecast(filterForecast(forecastResponse.data.list));
      setError(null);
    } catch (err) {
      setError('City not found');
      setWeather(null);
      setForecast([]);
    }
  };

  const filterForecast = (forecastList) => {
    const uniqueDays = [];
    const filteredForecast = [];

    for (let item of forecastList) {
      const date = new Date(item.dt * 1000);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')} ${date.getFullYear()}`;

      if (!uniqueDays.includes(formattedDate)) {
        uniqueDays.push(formattedDate);
        filteredForecast.push({ ...item, formattedDate });
      }

      if (uniqueDays.length === 7) break;
    }

    return filteredForecast;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Wizard</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p>{error}</p>}
        {weather && (
          <div>
            <h2>Current Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
        {forecast.length > 0 && (
          <div>
            <h2>7-Day Forecast</h2>
            <ul>
              {forecast.map((day, index) => (
                <li key={index}>
                  <p>Date: {day.formattedDate}</p>
                  <p>Temperature: {day.main.temp}°C</p>
                  <p>Weather: {day.weather[0].description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
