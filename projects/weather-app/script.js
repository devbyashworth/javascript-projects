const apiKey = '059dcee9c15c93a942eb1f38b72876be';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const celsiusButton = document.querySelector('.left');
const fahrenheitButton = document.querySelector('.right');
const activeSwitch = document.querySelector('.active');

const dateContainer = document.querySelector('.date-container');
const dayElement = document.querySelector('#day');
const todayDateElement = document.querySelector('#today-date');
const locationElement = document.querySelector('#location');
const cityElement = document.querySelector('#city');
const graphicElement = document.querySelector('#graphic');
const tempFElement = document.querySelector('#farenheit');
const tempCElement = document.querySelector('#celsius');
const descriptionElement = document.querySelector('#description');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');
const windSpeedElement = document.querySelector('#windSpeed');
const maxTempElement = document.querySelector('#max');
const minTempElement = document.querySelector('#min');
const latitudeElement = document.querySelector('#latitude');
const longitudeElement = document.querySelector('#longitude');
const forecastContainer = document.querySelector('#forecast');

const locationInput = document.querySelector('#location-input');
const locationButton = document.querySelector('#location-button');

let currentTempC, currentTempF, maxTempC, maxTempF, minTempC, minTempF;

function fetchWeatherData(city) {
    const url = `${weatherURL}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchForecastData(city) {
    const url = `${forecastURL}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecastData(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayWeatherData(data) {
    const { name, sys, main, weather, wind, coord } = data;
    const { country } = sys;
    const { temp, temp_min, temp_max, humidity, pressure } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;
    const { lat, lon } = coord;

    currentTempC = temp;
    currentTempF = (temp * 9/5) + 32;
    maxTempC = temp_max;
    maxTempF = (temp_max * 9/5) + 32;
    minTempC = temp_min;
    minTempF = (temp_min * 9/5) + 32;

    cityElement.textContent = `${name}, ${country}`;
    tempCElement.textContent = `${Math.round(currentTempC)}°C`;
    tempFElement.textContent = `${Math.round(currentTempF)}°F`;
    descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    humidityElement.textContent = `Humidity: ${humidity}%`;
    pressureElement.textContent = `Pressure: ${pressure} hPa`;
    windSpeedElement.textContent = `Wind: ${speed} m/s`;
    maxTempElement.textContent = `Max: ${Math.round(maxTempC)}°C`;
    minTempElement.textContent = `Min: ${Math.round(minTempC)}°C`;
    latitudeElement.textContent = `Lat: ${lat}`;
    longitudeElement.textContent = `Lon: ${lon}`;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('#graphic').style.backgroundImage = `url(${iconUrl})`;
}

function displayForecastData(data) {
    forecastContainer.innerHTML = '';
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyData.forEach(dayData => {
        const date = new Date(dayData.dt * 1000);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const icon = dayData.weather[0].icon;
        const temp = Math.round(dayData.main.temp);

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <div>${dayOfWeek}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${dayData.weather[0].description}">
            <div>${temp}°C</div>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

function updateDateAndTime() {
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    dayElement.textContent = dayOfWeek;
    todayDateElement.textContent = `${month} ${day}, ${year}`;
}

function toggleTemperatureUnits(event) {
    const isCelsius = event.target.classList.contains('left');

    celsiusButton.classList.toggle('active-case', isCelsius);
    fahrenheitButton.classList.toggle('active-case', !isCelsius);
    tempCElement.style.display = isCelsius ? 'block' : 'none';
    tempFElement.style.display = isCelsius ? 'none' : 'block';
    activeSwitch.style.left = isCelsius ? '0' : '50%';

    if (isCelsius) {
        maxTempElement.textContent = `Max: ${Math.round(maxTempC)}°C`;
        minTempElement.textContent = `Min: ${Math.round(minTempC)}°C`;
    } else {
        maxTempElement.textContent = `Max: ${Math.round(maxTempF)}°F`;
        minTempElement.textContent = `Min: ${Math.round(minTempF)}°F`;
    }
}

function changeLocation() {
    const newLocation = locationInput.value.trim();
    if (newLocation) {
        fetchWeatherData(newLocation);
        fetchForecastData(newLocation);
    }
}

celsiusButton.addEventListener('click', toggleTemperatureUnits);
fahrenheitButton.addEventListener('click', toggleTemperatureUnits);
locationButton.addEventListener('click', changeLocation);

updateDateAndTime();
fetchWeatherData('New York');
fetchForecastData('New York');
