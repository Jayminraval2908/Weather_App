const input = document.getElementById('city-input'); 
const button = document.getElementById('b1');
const temperatureDisplay = document.getElementById('temperature');
const cityDisplay = document.getElementById('city');
const descDisplay = document.querySelector('.desc');
const weatherIcon = document.querySelector('img[alt="weather icon"]');


async function getWeather(city) {
    const apiKey = 'b10e2166c446e43cce77dd335f0dee88'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
    }
}


function updateUI(data) {
    const temperature = Math.round(data.main.temp);
    const city = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherCondition = data.weather[0].main.toLowerCase();

    temperatureDisplay.textContent = `${temperature}°C`;
    cityDisplay.textContent = city;


    descDisplay.innerHTML = `
        <span><img src="humidity.png" alt="humidity" width="35px" height="30px"> Humidity: ${humidity}%</span>
        <span><img src="wind.png" alt="wind" width="35px"> Wind Speed: ${windSpeed} km/h</span>
    `;

    updateWeatherIcon(weatherCondition);
}

function updateWeatherIcon(condition) {
    const iconMap = {
        'clear': 'clear-sky.png',
        'clouds': 'cloud.png', 
        'rain': 'rain.png', 
        'snow': 'snow.png', 
        'thunderstorm': 'thunderstorm.png', 
        'fog': 'fog.png'
    };

    const iconSrc = iconMap[condition] || 'mist.png'; 
    weatherIcon.src = iconSrc;
}

button.addEventListener('click', () => {
    const city = input.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        button.click();
    }
});