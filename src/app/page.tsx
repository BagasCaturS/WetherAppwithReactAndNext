'use client'
import React, { useState } from "react";
import { img } from "../../public/images";

// import ReactDOM from "react-dom";

const WeatherApp = () => {
  const [city, setCity] = useState<string>();
  const [condition, setCondition] = useState<string | null>();
  const [temperature, setTemperature] = useState<number | null | string>(null);
  const APIkey = "8013eb15ab60740a740ecf08e74ba7c0";
  const image = document.getElementById('weatherImage');
  const cuaca = '';
  const [wind, setWind] = useState<number | null>(); 
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windDeg, setWindDeg] = useState<number | null>();

  const fetchWeather = async () => {
    if (city === "") return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
      );
      const data = await response.json();
      setTemperature(`${parseInt(data.main.temp)}`);
      setCondition(data.weather[0].description);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setWindDeg(data.wind.deg);
      // console.log(data);
      const cuaca = data.weather[0].main;

      switch (cuaca) {
        case cuaca:
          image.src = `images/${cuaca}.png`
          break;

        default:
          image.src = 'images/clouds.png';
          break;
      }
    } catch (e) {
      console.log(e);
    }


  };

  return (
    <div className=" mx-auto container p-4 flex justify-center items-center flex-col min-h-screen ">
      <div className=" bg-slate-700 p-4 rounded-md">
        <div className="flex items-center justify-center mb-4 gap-2">
          <input
            type="text"
            id="location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <svg id="search" className="cursor-pointer" onClick={fetchWeather} width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.757 20.171c-.791.523-1.738.829-2.757.829-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.019-.306 1.966-.829 2.757l2.829 2.829-1.414 1.414-2.829-2.829zm-9.082-1.171c-3.438 0-5.675-2.629-5.675-5.5 0-2.702 1.951-4.945 4.521-5.408.212-3.951 3.473-7.092 7.479-7.092s7.267 3.141 7.479 7.092c2.57.463 4.521 2.706 4.521 5.408 0 2.855-2.218 5.5-5.675 5.5.3-.63.508-1.31.608-2.026 1.726-.214 3.067-1.691 3.067-3.474 0-2.969-2.688-3.766-4.432-3.72.323-3.983-2.115-6.78-5.568-6.78-3.359 0-5.734 2.562-5.567 6.78-1.954-.113-4.433.923-4.433 3.72 0 1.783 1.341 3.26 3.068 3.474.099.716.307 1.396.607 2.026m6.325-6c1.655 0 3 1.345 3 3s-1.345 3-3 3c-1.656 0-3-1.345-3-3s1.344-3 3-3" /></svg>
          {/* <button className=" p-2 " id="search" onClick={fetchWeather}>Search</button> */}
        </div>
        <div>
          <img className="w-64" src={`images/clouds.png`} alt={cuaca} id="weatherImage" />
          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-2xl">{temperature} 30 &deg;C</h2>
            <p className="" id="condition">{condition} Overcast clouds</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">
            <p>Humidity</p>
            <p className="text-center" id="humidity">{humidity}%</p>
          </div>
          <div>
            <p>Wind Speed</p>
            <p className="text-center" id="windSpeed">{wind} Km/h</p>
            <p className="text-center" id="windDeg">{windDeg} &deg;</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
// ReactDOM.render(<WeatherApp />, document.getElementById("root"));