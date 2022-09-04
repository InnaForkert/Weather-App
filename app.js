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
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  tempInCelc = response.data.main.temp;
  descr.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} m/s`;
  document
    .getElementById("icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .getElementById("icon")
    .setAttribute("alt", response.data.weather[0].description);
  city.innerHTML = response.data.name;
  C.classList.remove("active");
  F.classList.add("active");
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=a43564c91a6c605aeb564c9ed02e3858&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

const key = "6d7419b80173a006c3181ed3637d4936";
const temp = document.querySelector(".temp");
const C = document.querySelector("#C");
const F = document.querySelector("#F");
const city = document.querySelector(".city");
const descr = document.querySelector(".descr");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

defaultSearch();
function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let niceInput = `${input.value[0].toUpperCase()}${input.value.slice(1)}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${niceInput}&appid=${key}&&units=metric`;
  axios.get(url).then(showTemp);
}

function defaultSearch() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${key}&&units=metric`;
  axios.get(url).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showLoc(position) {
  let urlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&&units=metric`;
  axios.get(urlLoc).then(showTemp);
}

function getLoc() {
  navigator.geolocation.getCurrentPosition(showLoc);
}

const locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLoc);

let tempInCelc;

function convertToF(event) {
  event.preventDefault();
  tempInFahr = (tempInCelc * 9) / 5 + 32;
  document.getElementById("temp").innerHTML = Math.round(tempInFahr);
  F.classList.remove("active");
  C.classList.add("active");
  let maxs = document.getElementsByClassName("max");
  for (let a = 0; a < maxs.length; a += 1) {
    maxs[a].innerHTML = `${Math.round(
      (parseInt(maxs[a].innerHTML) * 9) / 5 + 32
    )}° `;
  }
  let mins = document.getElementsByClassName("min");
  for (let a = 0; a < mins.length; a += 1) {
    mins[a].innerHTML = `${Math.round(
      (parseInt(mins[a].innerHTML) * 9) / 5 + 32
    )}° `;
  }
  F.removeEventListener("click", convertToF);
  C.addEventListener("click", convertToC);
}

function convertToC(event) {
  event.preventDefault();
  document.getElementById("temp").innerHTML = Math.round(tempInCelc);
  C.classList.remove("active");
  F.classList.add("active");
  let maxs = document.getElementsByClassName("max");
  for (let a = 0; a < maxs.length; a += 1) {
    maxs[a].innerHTML = `${Math.round(
      ((parseInt(maxs[a].innerHTML) - 32) * 5) / 9
    )}° `;
  }
  let mins = document.getElementsByClassName("min");
  for (let a = 0; a < mins.length; a += 1) {
    mins[a].innerHTML = `${Math.round(
      ((parseInt(mins[a].innerHTML) - 32) * 5) / 9
    )}° `;
  }
  C.removeEventListener("click", convertToC);
  F.addEventListener("click", convertToF);
}

F.addEventListener("click", convertToF);
C.addEventListener("click", convertToC);

function formatDay(timestamp) {
  let dateForecast = new Date(timestamp * 1000);
  let day = days[dateForecast.getDay()].slice(0, 3);
  return day;
}

function displayForecast(response) {
  const forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);
  const forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.slice(0, -2).forEach(function (forecastDay) {
    forecastHTML += `<div class="col-2 shadow-hov">
          <div class="day-forecast">${formatDay(forecastDay.dt)}</div>
          <div class="icon-forecast-div">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              class="icon-forecast"
              alt=""
            />
          </div>
          <div class="temp-forecast">
            <span class="max">${Math.round(
              forecastDay.temp.max
            )}° </span><span class="min">${Math.round(
      forecastDay.temp.min
    )}°</span>
          </div>
        </div>`;
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
