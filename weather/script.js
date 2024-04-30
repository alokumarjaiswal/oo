document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your API key
    const apiUrl = 'https://ipapi.co/json/';
    const searchInput = document.getElementById('location');
    const locationButton = document.getElementById('locate');
    const suggestionsContainer = document.getElementById('suggestions');
    const temperatureElement = document.getElementById('temperature');
    const weatherDescriptionElement = document.getElementById('weather-description');
    const weatherIconElement = document.getElementById('weather-icon');
    const precipitationElement = document.getElementById('precipitation');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');
    const visibilityElement = document.getElementById('visibility');
    const pressureElement = document.getElementById('pressure');
    const minTempElement = document.getElementById('min-temp');
    const maxTempElement = document.getElementById('max-temp');
    const feelsLikeElement = document.getElementById('feels-like');
    const celsiusButton = document.getElementById('celsius');
    const fahrenheitButton = document.getElementById('fahrenheit');

    let isCelsius = true; // Default to Celsius

    function capitalizeFirstLetter(string) {
        return string.replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }

    // Fetch user's location based on IP address
    function fetchUserLocation() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const latitude = data.latitude;
                const longitude = data.longitude;
                fetchWeatherByCoordinates(latitude, longitude);
            })
            .catch(error => console.log('Error fetching user location:', error));
    }

    // Function to fetch weather data based on latitude and longitude
    function fetchWeatherByCoordinates(latitude, longitude) {
        const unit = isCelsius ? 'metric' : 'imperial';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const weatherIconCode = data.weather[0].icon;
                const precipitation = data.weather[0].main;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const sunriseTimestamp = data.sys.sunrise; // Sunrise timestamp
                const sunsetTimestamp = data.sys.sunset; // Sunset timestamp
                const visibility = data.visibility; // Visibility in meters
                const pressure = data.main.pressure; // Atmospheric pressure in hPa
                const minTemp = data.main.temp_min; // Minimum temperature
                const maxTemp = data.main.temp_max; // Maximum temperature
                const feelsLike = data.main.feels_like; // Feels like temperature
                const lastUpdatedTimestamp = data.dt; // Timestamp provided by the API

                temperatureElement.textContent = `${temperature} °C`;
                weatherDescriptionElement.textContent = capitalizeFirstLetter(weatherDescription);
                weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
                precipitationElement.textContent = precipitation;
                humidityElement.textContent = `${humidity}%`;
                windElement.textContent = `${windSpeed} m/s`;
                sunriseElement.textContent = new Date(sunriseTimestamp * 1000).toLocaleTimeString();
                sunsetElement.textContent = new Date(sunsetTimestamp * 1000).toLocaleTimeString();
                visibilityElement.textContent = `${visibility / 1000} km`; // Convert meters to kilometers
                pressureElement.textContent = `${pressure} hPa`;
                minTempElement.textContent = `${minTemp} °C`;
                maxTempElement.textContent = `${maxTemp} °C`;
                feelsLikeElement.textContent = `${feelsLike} °C`;


                // Display refreshed information
                const lastUpdatedDate = new Date(lastUpdatedTimestamp * 1000);
                lastUpdatedDate.setMinutes(0, 0, 0); // Round minutes to nearest hour
                const refreshTime = lastUpdatedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: "numeric", hour12: true });
                const refreshDay = lastUpdatedDate.toLocaleDateString('en-US', { weekday: 'long' });
                document.getElementById('refresh-time').textContent = `${refreshDay}, ${refreshTime}`;
                document.getElementById('weather-description').textContent = weatherDescription;
            })
            .catch(error => console.log('Error fetching weather data:', error));
    }

    // Function to fetch weather data based on user's input location
    function fetchWeather(location) {
        const unit = isCelsius ? 'metric' : 'imperial';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const weatherIconCode = data.weather[0].icon;
                const precipitation = data.weather[0].main;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const sunriseTimestamp = data.sys.sunrise; // Sunrise timestamp
                const sunsetTimestamp = data.sys.sunset; // Sunset timestamp
                const visibility = data.visibility; // Visibility in meters
                const pressure = data.main.pressure; // Atmospheric pressure in hPa
                const minTemp = data.main.temp_min; // Minimum temperature
                const maxTemp = data.main.temp_max; // Maximum temperature
                const feelsLike = data.main.feels_like; // Feels like temperature
                const lastUpdateTimestamp = data.dt;

                temperatureElement.textContent = `${temperature} ${isCelsius ? '°C' : '°F'}`;
                weatherDescriptionElement.textContent = capitalizeFirstLetter(weatherDescription);
                weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
                precipitationElement.textContent = precipitation;
                humidityElement.textContent = `${humidity}%`;
                windElement.textContent = `${windSpeed} m/s`;

                // Display refreshed information
                const lastUpdateDate = new Date(lastUpdateTimestamp * 1000);
                lastUpdateDate.setMinutes(0, 0, 0); // Round minutes to nearest hour
                const refreshTime = lastUpdateDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: "numeric", hour12: true });
                const refreshDay = lastUpdateDate.toLocaleDateString('en-US', { weekday: 'long' });
                document.getElementById('refresh-time').textContent = `${refreshDay}, ${refreshTime}`;
                document.getElementById('weather-description').textContent = weatherDescription;
            })
            .catch(error => console.log('Error fetching weather data:', error));
    }

    // Function to handle location input
    function handleLocationInput() {
        const location = searchInput.value.trim();
        if (location) {
            fetchWeather(location);
            suggestionsContainer.innerHTML = ''; // Clear suggestions
            searchInput.value = ''; // Clear input field after search
        } else {
            alert('Please enter a valid location.');
        }
    }

    // Event listener for Celsius button
    celsiusButton.addEventListener('click', function () {
        if (!isCelsius) {
            isCelsius = true;
            fetchWeather(searchInput.value.trim());
        }
    });

    // Event listener for Fahrenheit button
    fahrenheitButton.addEventListener('click', function () {
        if (isCelsius) {
            isCelsius = false;
            fetchWeather(searchInput.value.trim());
        }
    });

    // Event listener for location input
    searchInput.addEventListener('input', function () {
        const inputValue = searchInput.value.trim();
        if (inputValue) {
            fetchAutocompleteSuggestions(inputValue);
        } else {
            suggestionsContainer.innerHTML = '';
        }
    });

    // Event listener for clicking outside the suggestions container to close it
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.location-container')) {
            suggestionsContainer.innerHTML = '';
        }
    });

    // Event listener for pressing Enter key in the search input field
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleLocationInput();
            suggestionsContainer.innerHTML = ''; // Clear suggestions
        }
    });

    // Event listener for clicking the location button
    locationButton.addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeatherByCoordinates(latitude, longitude);
            }, error => {
                console.log('Error getting location:', error);
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });

    // Function to fetch autocomplete suggestions from OpenWeatherMap API
    function fetchAutocompleteSuggestions(inputValue) {
        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const suggestions = data.map(item => item.name);
                displaySuggestions(suggestions);
            })
            .catch(error => console.log('Error fetching autocomplete suggestions:', error));
    }

    // Function to display autocomplete suggestions
    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('suggestion');
            suggestionElement.textContent = suggestion;
            suggestionElement.addEventListener('click', function () {
                searchInput.value = suggestion;
                suggestionsContainer.innerHTML = '';
                fetchWeather(suggestion);
            });
            suggestionsContainer.appendChild(suggestionElement);
        });
    }

    fetchUserLocation();
});
