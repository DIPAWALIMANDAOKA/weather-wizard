import axios from 'axios';

const API_KEY = '45d807429edb36b6af8bee717fefee59';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (city) => {
  return axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
};

const getForecastData = (city) => {
  return axios.get(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`);
};

const getWeatherByCoordinates = (lat, lon) => {
  return axios.get(`${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
};

export { getWeatherData, getForecastData, getWeatherByCoordinates };
