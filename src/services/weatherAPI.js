import { useState } from 'react';
import axios from 'axios';

export const useWeatherService = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const api_key = "f70e9878ba844b8584a124142251705";
  const api_url = "https://api.weatherapi.com/v1/forecast.json";

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      fetchData(city);
    }
  }

  const fetchData = async(query) => {
    try{
      const response = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=7&aqi=yes&alerts=yes`);
      console.log(response.data);
      setWeatherData(response.data);
      setError('');
    }
    catch(err){
      setError("City not found or something went wrong.");
      setWeatherData(null);
    }
  }

  const getCurrentLocation = () => {
    if(navigator.geolocation){
      console.log("GeoLocation is supported");
      navigator.geolocation.getCurrentPosition((pos) => {
        const {latitude, longitude} = pos.coords;
        const query = `${latitude},${longitude}`;
        fetchData(query);
      }, (err) => {
        setError(err.message);
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      });
    } else {
      setError("GeoLocation is not supported");
    }
  }

  return {
    weatherData,
    city,
    setCity,
    error,
    fetchData,
    getCurrentLocation,
    handleKeyPress
  };
};

// Alternative: You can also export individual functions if needed
export const fetchWeatherData = async (query, apiKey) => {
  const api_url = "https://api.weatherapi.com/v1/forecast.json";
  try {
    const response = await axios.get(`${api_url}?key=${apiKey}&q=${query}&days=7&aqi=yes&alerts=yes`);
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: "City not found or something went wrong." };
  }
};