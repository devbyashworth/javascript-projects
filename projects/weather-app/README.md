<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="main-container">
        <div class="row">
            <div class="col-lg-6 col-sm-12 row-1">
                <div class="weather-container">
                    <div class="weather-gradient"></div> 
                    <div class="date-container">
                        <h2 id="day"></h2>
                        <span id="today-date"></span>
                        <i class="fa-solid fa-location-dot" data-feather="map-pin"></i><span id="location"></span>
                    </div>
                    <div class="weather">
                        <h1 id="city"></h1>
                        <div id="graphic" class="weather-icon"></div>
                        <div id="farenheit" class="temp-info"></div>
                        <div id="celsius" class="temp-info"></div>
                        <div id="description" class='weather-description'></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 row-2">
                <h2 class="title">Weather Conditions</h2>
                <div class="description-container">
                    <div class="block-1">
                        <div class="text">
                            <span>Max:</span>
                            <span id="max" class="important-info"> </span>
                        </div>
                        <div class="text">
                            <span>Min:</span>
                            <span id="min" class='important-info'> </span>
                        </div>
                    </div>
                    <div class="block-2">
                        <div id="longitude" class=" text important-info">Lon: </div>
                        <div id="latitude" class="text important-info">Lat: </div>
                    </div>
                </div>

                <div class="conditions">
                    <div class="span condition">
                        <img src="https://img.icons8.com/?size=38&id=KZ2F3AaT1ptd&format=png&color=fefefe" alt="">
                        <div id="humidity" class="text important-info">Humidity: </div>
                    </div>
                    <div class="span condition">
                        <img src="https://img.icons8.com/?size=38&id=19338&format=png&color=fefefe" alt="">
                        <div id="pressure" class="text important-info">Pressure </div>
                    </div>
                    <div class="span condition">
                        <img src="https://img.icons8.com/?size=38&id=31842&format=png&color=fefefe" alt="">
                        <div id="windSpeed" class="text important-info">Winds </div>
                    </div>
                    
                </div>

                <div class="container-button">
                    <div class="switch-button">
                        <span class="active"></span>
                        <button class="text switch-button-case left active-case">&deg;C</button>
                        <button class="text switch-button-case right">&deg;F</button>
                    </div>
                </div>

                <div class="forecast-container">
                    <h2>7-Day Forecast</h2>
                    <div id="forecast"></div>
                </div>
            </div> 
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/js/all.js"></script>
    <script src="script.js"></script>
</body>
</html>

@import url('https://fonts.googleapis.com/css?family=Space+Mono');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:200,400,600,700,800');

:root {
    --gradient: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} 

body {
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #151515;
}

h1 {
    color: #C95E67;
    font-size: 29px;
    font-family: 'Open Sans', Helvetica, sans-serif;
    display: none;
}

h2 {
    color: #C95E67;
    font-size: 20px;
    font-family: 'Open Sans', Helvetica, sans-serif;
}

.main-container {
    width: 625px;
	height: 415px;
	color: #ffffff;
    border-radius: 25px;
    padding: 0 4px;
	background-color: #222831;
	box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
}

.weather-container {
    background-image: url("https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
    position: relative;
    width: 100%;
	/* width: 300px; */
    height: 400px;
    padding-top: 100px;
	border-radius: 25px;
	transition: transform 300ms ease;
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
    transform: translateZ(0) scale(1.02) perspective(1000px);
}

.weather-container:hover { transform: scale(1.1) perspective(1500px) rotateY(10deg); }

.weather-gradient {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.8;
	border-radius: 25px;
	background-image: var(--gradient);
}

.date-container {
    position: absolute;
    top: 25px;
    left: 25px;
    font-size: 1.1rem;
}


#today-date { 
    display: block; 
}

#location { 
    display: inline-block;
}

.fa-location-dot {
    display: inline-block;
	width: auto;
	height: 0.8em;
	margin-right: 5px;
}

.weather {
    position: absolute;
	bottom: 25px;
	left: 25px;
    text-align: left;
    font-family: 'Open Sans', Helvetica, sans-serif;
}

.weather-icon {
    height: 60px;
    width: auto;
}

.temp-info {
	margin: 0;
	font-size: 5em;
	font-weight: 700;
}

.weather-description {
    margin: 0;
    font: 20px;
}

.row-1 { padding-top: 8px; }
.row-2 { padding: 6px; }

.description-container {
    display: grid;
    padding: 8px;
    margin: 0 auto;
    border-radius: 4px;
    grid-template-columns: 1fr 1fr;
}

.title {
    padding: 8px;
    text-align: center;
}

.conditions {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
    padding-top: 25px;
    margin: 0 auto;
    gap: 4px;
}

.conditions .condition {
    display: inline-block;
    width: 100%;
    min-height: 100px;
    text-align: center;
}

.container-button {
    display: grid;
    margin-top: 10px;
    grid-template-columns: 1fr;
}


.switch-button {
    position: relative;
    width: 100px;
    border: none;
    height: 40px;
    outline: none;
    margin: 0 auto;
    cursor: pointer;
    text-align: center;
    grid-column: 1 1 1;
    border-radius: 4px;
    will-change: transform;
    z-index: 197 !important;
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
}

.switch-button-case {
    position: relative;
    display: inline-block;
    background: none;
    width: 100%;
    height: 100%;
    color: #efefef;
    letter-spacing: 5px;
    padding-bottom: 1px;
    text-transform: uppercase;
    transition: .3s ease all;
}

.switch-button-case:hover {
    color: #151515;
    cursor: pointer;
}

.switch-button-case:focus {
    outline: none;
}

.active {
    position: absolute;
    color: #151515;
    background-color: #efefef;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: -1;
    transition: .3s ease-out all;
}

.switch-button .active-case {
    color: #151515;
}

.signature {
    position: fixed;
    font-family: sans-serif;
    font-weight: 100;
    bottom: 10px;
    left: 0;
    letter-spacing: 4px;
    font-size: 10px;
    width: 100vw;
    text-align: center;
    color: #efefef;
    text-transform: uppercase;
    text-decoration: none;
}

.forecast-container {
    margin-top: 20px;
    text-align: center;
}

.forecast-day {
    display: inline-block;
    width: 80px;
    margin: 10px;
    padding: 10px;
    background: #efefef;
    border-radius: 4px;
}

.forecast-day img {
    width: 40px;
    height: 40px;
}

.forecast-day .day {
    font-size: 16px;
    font-weight: 600;
}

.forecast-day .temp {
    font-size: 14px;
}

// Get user's geolocation
var lat,
lon,
tWeather,
icon,
celsius,
farenheit,
iconNumber,
minCelsius,
maxCelsius,
minF,
maxF;

// Fetch location data
fetch('https://ipapi.co/json/')
.then(response => response.json())
.then(data => { 
    console.log(data);

    // Finding the latitude and longitude, to be able to find the location
    lat = data.latitude;
    lon = data.longitude;

    document.getElementById("latitude").innerText = `Lat: ${lat}`;
    document.getElementById("longitude").innerText = `Lon: ${lon}`;

    // Fetch current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=059dcee9c15c93a942eb1f38b72876be`)
    .then(response => response.json())
    .then(weatherData => { 
        console.log(weatherData);

        // Fetch image and display weather and icon down below 
        tWeather = weatherData.main.temp;
        iconNumber = weatherData.weather[0].icon;

        icon = `http://openweathermap.org/img/w/${iconNumber}.png`;
        document.getElementById("graphic").innerHTML = `<img src="${icon}"/>`;

        document.getElementById('description').innerText = weatherData.weather[0].description;
        document.getElementById('city').innerText = weatherData.name;
        document.getElementById('location').innerText = weatherData.name;
        document.getElementById("windSpeed").innerText = `Winds: ${weatherData.wind.speed} km/h`;
        document.getElementById("pressure").innerText = `Pressure: ${weatherData.main.pressure} hPa`;
        document.getElementById("humidity").innerText = `Humidity: ${weatherData.main.humidity}%`;
        minF = Math.floor(weatherData.main.temp_min * 9/5 - 459.67);
        maxF = Math.floor(weatherData.main.temp_max * 9/5 - 459.67);

        // Translate Kelvin to Celsius
        celsius = Math.floor(weatherData.main.temp - 273.15);

        minCelsius = Math.floor(weatherData.main.temp_min - 273.15);
        maxCelsius = Math.floor(weatherData.main.temp_max - 273.15);

        // Translate Kelvin to Fahrenheit
        farenheit = Math.floor(weatherData.main.temp * 9 / 5 - 459.67);

        // Display Celsius by default 
        document.getElementById('celsius').innerText = `${celsius}ºC`;
        document.getElementById("min").innerText = `${minCelsius}ºC`;
        document.getElementById("max").innerText = `${maxCelsius}ºC`;
    });

    // Fetch 7-day forecast data
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=059dcee9c15c93a942eb1f38b72876be`)
    .then(response => response.json())
    .then(forecastData => {
        console.log(forecastData);
        
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = ''; // Clear previous forecast

        forecastData.daily.forEach((day, index) => {
            if (index > 0 && index < 8) { // Skip current day and limit to next 7 days
                const forecastDay = document.createElement('div');
                forecastDay.className = 'forecast-day';

                const date = new Date(day.dt * 1000);
                const options = { weekday: 'short' };
                const dayName = new Intl.DateTimeFormat('en-US', options).format(date);

                const iconSrc = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;

                forecastDay.innerHTML = `
                    <div class="day">${dayName}</div>
                    <img src="${iconSrc}" alt="Weather icon">
                    <div class="temp">${Math.floor(day.temp.day - 273.15)}ºC</div>
                `;

                forecastContainer.appendChild(forecastDay);
            }
        });
    });
});

var switchButton = document.querySelector('.switch-button');
var switchBtnRight = document.querySelector('.switch-button-case.right');
var switchBtnLeft = document.querySelector('.switch-button-case.left');
var activeSwitch = document.querySelector('.active');

function switchLeft() {
    switchBtnRight.classList.remove('active-case');
    switchBtnLeft.classList.add('active-case');
    activeSwitch.style.left = '0%';

    document.getElementById('farenheit').innerText = '';
    document.getElementById('min').innerText = '';
    document.getElementById('max').innerText = '';
    document.getElementById('celsius').innerText = `${celsius}ºC`;
    document.getElementById("min").innerText = `${minCelsius}ºC`;
    document.getElementById("max").innerText = `${maxCelsius}ºC`;
}

function switchRight() {
    switchBtnRight.classList.add('active-case');
    switchBtnLeft.classList.remove('active-case');
    activeSwitch.style.left = '50%';

    document.getElementById('celsius').innerText = '';
    document.getElementById('min').innerText = '';
    document.getElementById('max').innerText = '';
    document.getElementById('farenheit').innerText = `${farenheit}ºF`;
    document.getElementById('min').innerText = `${minF}ºF`;
    document.getElementById('max').innerText = `${maxF}ºF`;
}

switchBtnLeft.addEventListener('click', function() {
    switchLeft();
}, false);

switchBtnRight.addEventListener('click', function() {
    switchRight();
}, false);


const today = new Date();
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

document.getElementById('day').innerText = weekdays[today.getDay()];
document.getElementById('today-date').innerText =  `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;