import React from "react";
import axios from "axios";

import "./App.css";

function App() {
  //date
  function formatDate(now) {
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = now.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[dayIndex];
    return `${day}, <br/> ${hours}:${minutes}`;
  }

  let dateElement = document.querySelector("#time");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);

  //Forecast prediction (coordinates)
  function getForecast(coordinates) {
    console.log(coordinates);
    let key = "cb286bad3607984b41ed10c8de5cf00e";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
    axios.get(url).then(displayForecast);
  }

  //city, icon, temperature
  function weather(response) {
    document.querySelector("#city").innerHTML = response.data.name;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = response.data.main.temp;

    document.querySelector("#temperature").innerHTML = `${Math.round(
      (celsiusTemperature = response.data.main.temp)
    )}`;
    getForecast(response.data.coord);
  }
  //search city
  function search(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
    searchCity(city);
  }

  function searchCity(city) {
    let key = "cb286bad3607984b41ed10c8de5cf00e";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(weather);
  }
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", search);
  searchCity("kyiv");
  //unit
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  let celsiusTemperature = null;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

  //Format day
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  //Column repeat
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 7) {
        forecastHTML =
          forecastHTML +
          `<div class="border + col">
          <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt=""
          width="42" />
           <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temperature">${Math.round(
             forecastDay.temp.day
           )}°</span>
           </div>
        </div>`;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  return (
    <div className="App">
      <header className="App-header">
        <body>
          <div class="container + border">
            <h1 id class="border2">
              The forecast for the next 7 days
            </h1>
            <div class="container text-center">
              <div class="row align-items-start">
                <div class="col">
                  <h2 id="city">Kyiv</h2>
                </div>
                <div class="col">
                  <div class="iconTop">
                    <img
                      src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                      alt="Cloudy"
                      id="icon"
                      class="float-left"
                      width="80"
                    />
                  </div>
                  <div class="col">
                    <h2 id="time">-</h2>
                    <span class="temperature" id="temperature">
                      19
                    </span>
                    <span class="unit">
                      <a
                        href="https://github.com/MoonLightVillas/weather-react"
                        id="celsius-link"
                      >
                        °C
                      </a>{" "}
                      |{" "}
                      <a
                        href="https://github.com/MoonLightVillas/weather-react"
                        id="fahrenheit-link"
                      >
                        °F
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col">
                <form id="search-form">
                  <div class="col-6">
                    <input
                      type="search"
                      placeholder="Type a city for the forecast..."
                      autofocus="on"
                      autocomplete="off"
                      id="city-input"
                      class="form-control shadow-sm"
                    />
                  </div>
                  <div class="col-3">
                    <input
                      type="submit"
                      value="Search"
                      class="form-control btn btn-primary shadow-sm w-100"
                    />
                  </div>
                  <div class="days" id="forecast"></div>
                  <div class="coded">
                    <a
                      href="https://github.com/MoonLightVillas/weather-react"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open-source code
                    </a>{" "}
                    by{" "}
                    <a
                      href="https://www.linkedin.com/in/mariela-campos-9b4a791b/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Mariela Campos
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <script src="index.js"></script>
        </body>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;