'use client'
import React, { useEffect, useState, useCallback } from "react";
// import './global.css'

// todo: 
// Add animation to changing location
// add error handling



const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<{
    condition: string | null;
    temperature: number | null;
    humidity: number | null;
    wind: number | null;
    windDeg: number | null;
  }>({
    condition: null,
    temperature: null,
    humidity: null,
    wind: null,
    windDeg: null,
  });

  const APIkey = "8013eb15ab60740a740ecf08e74ba7c0";
  const [error, setError] = useState<boolean>(false);
  const fetchWeather = useCallback(async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
      );
      const data = await response.json();
      if (data.cod === '404') {
        setError(true);
        return;
      }

      setError(false);
      setWeather({
        condition: data.weather[0].description,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        windDeg: data.wind.deg,
      });

      const cuaca = data.weather[0].main.toLowerCase();
      const image = document.getElementById('weatherImage') as HTMLImageElement;

      image.src = `images/${cuaca}.png`;
    } catch (e) {
      console.error(e);
    }
  }, [city]);

  return (
    <div className="mx-auto container p-4 flex justify-center items-center flex-col min-h-screen">
      <div id="main" className="bg-slate-700 p-4 rounded-md block">
        <div className="flex items-center justify-center mb-4 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm2.312-4.897c0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4-4 1.794-4 4zm10 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z" /></svg>
          <input
            spellCheck="false"
            type="text"
            id="location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="input input-bordered w-full max-w-xs"
          />
          <svg
            id="search"
            className="cursor-pointer"
            onClick={fetchWeather}
            width="42"
            height="42"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 24 24"
          >
            <path d="M14.757 20.171c-.791.523-1.738.829-2.757.829-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.019-.306 1.966-.829 2.757l2.829 2.829-1.414 1.414-2.829-2.829zm-9.082-1.171c-3.438 0-5.675-2.629-5.675-5.5 0-2.702 1.951-4.945 4.521-5.408.212-3.951 3.473-7.092 7.479-7.092s7.267 3.141 7.479 7.092c2.57.463 4.521 2.706 4.521 5.408 0 2.855-2.218 5.5-5.675 5.5.3-.63.508-1.31.608-2.026 1.726-.214 3.067-1.691 3.067-3.474 0-2.969-2.688-3.766-4.432-3.72.323-3.983-2.115-6.78-5.568-6.78-3.359 0-5.734 2.562-5.567 6.78-1.954-.113-4.433.923-4.433 3.72 0 1.783 1.341 3.26 3.068 3.474.099.716.307 1.396.607 2.026m6.325-6c1.655 0 3 1.345 3 3s-1.345 3-3 3c-1.656 0-3-1.345-3-3s1.344-3 3-3" fill="" />
          </svg>
        </div>
        {error ? (
            <div className="flex flex-col justify-center items-center">
              <img className="w-64 " id="error" src="images/404.png" alt="error" />
              <p className="text-2xl" id="error">oops the location isnt found.</p>
              <p className="text-2xl">Try another location</p>
            </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img className="w-64" src="images/clouds.png" id="weatherImage" alt="weather" />
            <div className=" mt-4">
              <h2 className="text-4xl text-center">{weather.temperature ?? "--"} &deg;C</h2>
              <p id="condition" className="text-xl">{weather.condition ?? "--"}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div>
            <p>Humidity</p>
            <p className="text-center" id="humidity">{weather.humidity ?? "--"}%</p>
          </div>
          <div>
            <p>Wind Speed</p>
            <p className="text-center" id="windSpeed">{weather.wind ?? "--"} Km/h</p>
            <p className="text-center" id="windDeg">{weather.windDeg ?? "--"} &deg;</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherApp;

