function displayDate() {
  let currentDate = new Date();
  let day = currentDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thi", "Fri", "Sat"];
  day = days[day];

  let month = currentDate.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = months[month];

  let dateOfMonth = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let finalDate = `${day}, ${hours}:${minutes}, ${month} ${dateOfMonth}`;
  return finalDate;
}

let date = document.querySelector("#date-display");
date.innerHTML = displayDate();

function displayWeather(response) {
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description-display");
  descriptionElement.innerHTML = description;

  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#degree-number");
  tempElement.innerHTML = `+${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-number");
  humidityElement.innerHTML = humidity;

  let wind = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed-number");
  windSpeedElement.innerHTML = Math.round(wind * 3.6);
}

let apiKey = "8161b4309ee03faae957729ba7104797";
let cityName = document.querySelector("#current-city-name").textContent;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city-name");
  let cityRequest = document.querySelector("#city-search-input");
  city.innerHTML = cityRequest.value;

  let apiKey = "8161b4309ee03faae957729ba7104797";
  let cityName = cityRequest.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  changeToCelcium();
}

let searchButton = document.querySelector("#input-form");
searchButton.addEventListener("submit", searchCity);

function displayCurrent(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#current-city-name");
  cityElement.innerHTML = city;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description-display");
  descriptionElement.innerHTML = description;

  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#degree-number");
  tempElement.innerHTML = `+${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-number");
  humidityElement.innerHTML = humidity;

  let wind = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed-number");
  windSpeedElement.innerHTML = Math.round(wind * 3.6);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrent);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", showCurrentWeather);

function displayTemerature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentDegree = document.querySelector("#degree-number");
  currentDegree.innerHTML = `+${temperature}`;
}

function changeToFarenheit() {
  let currentDegree = document.querySelector("#degree-number");
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let cityName = document.querySelector("#current-city-name").textContent;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemerature);

  let celcium = document.querySelector("#celcium");
  celcium.classList.remove("degree-link-selected");
  celcium.classList.add("degree-link");

  let farenheit = document.querySelector("#farenheit");
  farenheit.classList.remove("degree-link");
  farenheit.classList.add("degree-link-selected");
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", changeToFarenheit);

function changeToCelcium() {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let cityName = document.querySelector("#current-city-name").textContent;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemerature);

  let currentDegree = document.querySelector("#degree-number");
  currentDegree.innerHTML = "+14";

  let celcium = document.querySelector("#celcium");
  celcium.classList.remove("degree-link");
  celcium.classList.add("degree-link-selected");

  let farenheit = document.querySelector("#farenheit");
  farenheit.classList.remove("degree-link-selected");
  farenheit.classList.add("degree-link");
}

let celciumLink = document.querySelector("#celcium");
celciumLink.addEventListener("click", changeToCelcium);
