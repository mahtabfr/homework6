let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let minutes = now.getMinutes();
let hour = now.getHours();
let currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = `${today}`;

let nowTime = document.querySelector("#currentTime");
nowTime.innerHTML = `${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "fea62963ba7fda05e495e6e5467f555d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${temperature}°c`;
  let description = document.querySelector("#temperature_desc");
  description.innerHTML = response.data.weather[0].description;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let apiKey = "fea62963ba7fda05e495e6e5467f555d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);
