import { useState, useRef } from "react";
import axios from "axios";

export const useWeatherService = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const typingTimer = useRef(null);

  // API Config
  //const api_key = import.meta.env.VITE_API_KEY;
  const api_key = "f70e9878ba844b8584a124142251705";

  const api = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    timeout: 5000, // fail fast if API is too slow
  });

  // Fetch weather data
  const fetchData = async (query) => {
    if (!query) return;

    const cacheKey = `weather-${query}`;
    const cached = localStorage.getItem(cacheKey);

    // Show cached data instantly if available
    if (cached) {
      setWeatherData(JSON.parse(cached));
    }

    setLoading(true);
    try {
      const { data } = await api.get("/forecast.json", {
        params: {
          key: api_key,
          q: query,
          days: 7,
          aqi: "yes",
          alerts: "yes",
        },
      });

      setWeatherData(data);
      localStorage.setItem(cacheKey, JSON.stringify(data)); // cache response
      setError("");
    } catch (err) {
      setError("City not found or something went wrong.");
      if (!cached) setWeatherData(null); // clear only if no cached data
    } finally {
      setLoading(false);
    }
  };

  // Handle enter key press with debounce
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        fetchData(city);
      }, 400); // debounce 400ms
    }
  };

  // Get current location (fast + fallback)
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const query = `${latitude},${longitude}`;
          fetchData(query);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: false, // faster
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported");
    }
  };

  return {
    weatherData,
    city,
    setCity,
    error,
    loading,
    fetchData,
    getCurrentLocation,
    handleKeyPress,
  };
};

// Alternative standalone function
export const fetchWeatherData = async (query, apiKey) => {
  const api = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    timeout: 5000,
  });

  try {
    const { data } = await api.get("/forecast.json", {
      params: { key: apiKey, q: query, days: 7, aqi: "yes", alerts: "yes" },
    });
    return { data, error: null };
  } catch (err) {
    return { data: null, error: "City not found or something went wrong." };
  }
};
