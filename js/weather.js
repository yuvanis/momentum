const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
city.value = 'Minsk';

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=31751ec93505f194aac4d9ccca3b1fff&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  if (!data.weather) {
    weatherIcon.textContent = 'Incorrect city';
    weatherIcon.classList.add('city-error');
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    weatherIcon.textContent = '';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  }
}

getWeather();

city.addEventListener('change', getWeather);

function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}

window.addEventListener('beforeunload', setLocalStorageCity)

function getLocalStorageCity() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}

window.addEventListener('load', getLocalStorageCity)