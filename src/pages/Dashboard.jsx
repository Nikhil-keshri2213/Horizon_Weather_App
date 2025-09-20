import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";
import WindStatus from "../components/WindStatus";
import UVIndex from "../components/UVIndex";
import SunriseSunset from "../components/SunriseSunset";
import Humidity from "../components/Humidity";
import Visibility from "../components/Visibility";
import FeelsLike from "../components/FeelsLike";
import ThreeDaysForecast from "../components/ThreeDaysForecast";
import HourlyForecast from "../components/HourlyForecast";
import WeatherMap from "../components/WeatherMap";
import { useWeatherService } from "../services/weatherAPI";
import "../styles/DashboardStyle.css";
import { TitleBar } from "../components/TitleBar";

function Dashboard() {
  const { weatherData, fetchData, getCurrentLocation, error } =
    useWeatherService();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSearch = (query) => fetchData(query);
  const handleLocationRequest = () => getCurrentLocation();

  const formatDate = (dateString) => {
    if (!dateString)
      return new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <div className="animated-gradient bg-gradient-to-br from-blue-950 via-black to-purple-950 min-h-screen flex items-center justify-center text-white px-4">
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center max-w-md w-full">
          <p className="text-red-300 font-semibold text-lg">{error}</p>
          <p className="text-red-300 mt-2">Please check your internet connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animated-gradient bg-gradient-to-br from-blue-950 via-black  to-purple-950 min-h-screen text-white w-full md:w-min-[720px]">

      <TitleBar/>

      {/* Sidebar for desktop only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-0 md:ml-20 p-4 sm:p-6">
        {/* ================= Desktop Layout (unchanged) ================= */}
        <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-min">
          <div className="row-span-2">
            <WeatherCard
              temp={
                weatherData?.current?.temp_c
                  ? `${weatherData.current.temp_c}℃`
                  : "--℃"
              }
              cond={weatherData?.current?.condition?.text || "Loading..."}
              city={weatherData?.location?.name || "Unknown"}
              country={weatherData?.location?.country || "Location"}
              date={formatDate(weatherData?.location?.localtime)}
              icon={weatherData?.current?.condition?.icon || ""}
              onSearch={handleSearch}
              onLocationRequest={handleLocationRequest}
            />
          </div>

          <WindStatus
            speed={weatherData?.current?.wind_kph?.toString() || "0"}
            unit={"km/h"}
            time={
              weatherData?.location?.localtime
                ? new Date(weatherData.location.localtime).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "2-digit", hour12: true }
                  )
                : "-- --"
            }
          />

          <UVIndex
            num={weatherData?.current?.uv?.toString() || "0"}
            cond={(() => {
              const uv = weatherData?.current?.uv || 0;
              if (uv <= 2) return "Low";
              if (uv <= 5) return "Moderate";
              if (uv <= 7) return "High";
              if (uv <= 10) return "Very High";
              return "Extreme";
            })()}
          />

          <SunriseSunset
            sunrise={
              weatherData?.forecast?.forecastday?.[0]?.astro?.sunrise || "-- --"
            }
            sunset={
              weatherData?.forecast?.forecastday?.[0]?.astro?.sunset || "-- --"
            }
          />

          <Humidity
            num={weatherData?.current?.humidity || 0}
            cond={(() => {
              const humidity = weatherData?.current?.humidity || 0;
              if (humidity < 30) return "Low";
              if (humidity <= 60) return "Normal";
              return "High";
            })()}
          />

          <Visibility
            dist={weatherData?.current?.vis_km || 0}
            unit={"Km"}
            cond={(() => {
              const visibility = weatherData?.current?.vis_km || 0;
              if (visibility >= 10) return "Excellent";
              if (visibility >= 5) return "Good";
              if (visibility >= 2) return "Moderate";
              return "Poor";
            })()}
          />

          <FeelsLike
            temp={weatherData?.current?.feelslike_c?.toString() || "0"}
            cond={(() => {
              const feelsLike = weatherData?.current?.feelslike_c || 0;
              const actual = weatherData?.current?.temp_c || 0;
              if (feelsLike > actual + 3) return "Warmer";
              if (feelsLike < actual - 3) return "Cooler";
              return "Similar";
            })()}
          />
        </div>

        <div className="hidden md:grid grid-cols-4 gap-4 mt-5">
          <ThreeDaysForecast
            forecastData={weatherData?.forecast?.forecastday || []}
          />
          <div className="col-span-3 h-80">
            <HourlyForecast
              hourlyData={weatherData?.forecast?.forecastday?.[0]?.hour || []}
            />
          </div>
        </div>

        {/* ================= Mobile Layout ================= */}
        <div className="flex flex-col gap-6 md:hidden">
          {/* 1. WeatherCard */}
          <WeatherCard
            temp={
              weatherData?.current?.temp_c
                ? `${weatherData.current.temp_c}℃`
                : "--℃"
            }
            cond={weatherData?.current?.condition?.text || "Loading..."}
            city={weatherData?.location?.name || "Unknown"}
            country={weatherData?.location?.country || "Location"}
            date={formatDate(weatherData?.location?.localtime)}
            icon={weatherData?.current?.condition?.icon || ""}
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
          />

          {/* 2. Six small cards in 2x3 grid */}
          <div className="grid grid-cols-2 gap-4">
            <WindStatus
              speed={weatherData?.current?.wind_kph?.toString() || "0"}
              unit={"km/h"}
              time={
                weatherData?.location?.localtime
                  ? new Date(weatherData.location.localtime).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "2-digit", hour12: true }
                    )
                  : "-- --"
              }
            />
            <UVIndex
              num={weatherData?.current?.uv?.toString() || "0"}
              cond={(() => {
                const uv = weatherData?.current?.uv || 0;
                if (uv <= 2) return "Low";
                if (uv <= 5) return "Moderate";
                if (uv <= 7) return "High";
                if (uv <= 10) return "Very High";
                return "Extreme";
              })()}
            />
            <SunriseSunset
              sunrise={
                weatherData?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                "-- --"
              }
              sunset={
                weatherData?.forecast?.forecastday?.[0]?.astro?.sunset ||
                "-- --"
              }
            />
            <Humidity
              num={weatherData?.current?.humidity || 0}
              cond={(() => {
                const humidity = weatherData?.current?.humidity || 0;
                if (humidity < 30) return "Low";
                if (humidity <= 60) return "Normal";
                return "High";
              })()}
            />
            <Visibility
              dist={weatherData?.current?.vis_km || 0}
              unit={"Km"}
              cond={(() => {
                const visibility = weatherData?.current?.vis_km || 0;
                if (visibility >= 10) return "Excellent";
                if (visibility >= 5) return "Good";
                if (visibility >= 2) return "Moderate";
                return "Poor";
              })()}
            />
            <FeelsLike
              temp={weatherData?.current?.feelslike_c?.toString() || "0"}
              cond={(() => {
                const feelsLike = weatherData?.current?.feelslike_c || 0;
                const actual = weatherData?.current?.temp_c || 0;
                if (feelsLike > actual + 3) return "Warmer";
                if (feelsLike < actual - 3) return "Cooler";
                return "Similar";
              })()}
            />
          </div>

          {/* 3. Three-day forecast */}
          <ThreeDaysForecast
            forecastData={weatherData?.forecast?.forecastday || []}
          />

          {/* 4. Hourly forecast */}
          <HourlyForecast
            hourlyData={weatherData?.forecast?.forecastday?.[0]?.hour || []}
          />
        </div>
        <div className="mt-6">
          <WeatherMap
            longitude={weatherData?.location?.lon}
            latitude={weatherData?.location?.lat}
            city={weatherData?.location?.name}
            onLocationRequest={handleLocationRequest}
          />
        </div>
          <a href="https://nikhil-keshri2213.github.io/MyPortfolio/" target="_blank">
            <p className="text-center mt-2">@Developed By Nikhil Keshri</p> 
          </a>
      </div>
    </div>
  );
}

export default Dashboard;
