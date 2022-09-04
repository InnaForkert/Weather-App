const now = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = document.querySelector("#date");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes > 9) {
  date.innerHTML = `${day} ${hours}:${minutes}`;
} else {
  date.innerHTML = `${day} ${hours}:0${minutes}`;
}

function showTemp(response) {
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  descr.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
}

function showTempLoc(response) {
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  city.innerHTML = response.data.name;
  descr.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
}

const key = "6d7419b80173a006c3181ed3637d4936";

const temp = document.querySelector(".temp");
const C = document.querySelector(".C");
const city = document.querySelector(".city");
const descr = document.querySelector(".descr");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let niceInput = `${input.value[0].toUpperCase()}${input.value.slice(1)}`;
  city.innerHTML = niceInput;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${niceInput}&appid=${key}&&units=metric`;
  axios.get(url).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showLoc(position) {
  let urlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&&units=metric`;
  axios.get(urlLoc).then(showTempLoc);
}

function getLoc() {
  navigator.geolocation.getCurrentPosition(showLoc);
}

const locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getLoc);
