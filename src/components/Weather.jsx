import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import "./Weather.css";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const iconMap = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "🌥",
    "04n": "🌥",
    "09d": "🌧",
    "09n": "🌧",
    "10d": "🌦",
    "10n": "🌦",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫",
    "50n": "🌫",
  };

  const Search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const weatherIconCode =
        data.weather && data.weather[0] && data.weather[0].icon;
      const iconEmoji = iconMap[weatherIconCode] || "❓";

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Number(data.main.temp.toFixed(1)),
        location: data.name,
        icon: iconEmoji,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    Search("Cairo, Egypt");
  }, []);

  return (
    <div className="weather-container">
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="weather">
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Search city..." />
          <div
            className="search-icon"
            onClick={() => Search(inputRef.current.value)}
          >
            <FiSearch size={24} color="#333" />
          </div>
        </div>

        {weatherData && (
          <>
            <div className="weather-icon">{weatherData.icon}</div>
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>

            <div className="weather-data">
              <div className="col">
                <WiHumidity size={40} color="#fff" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className="col">
                <FaWind size={30} color="#fff" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
