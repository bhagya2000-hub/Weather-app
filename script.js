const cityInput = document.getElementById('city-input');
        const searchBtn = document.getElementById('search-btn');
        const weatherInfo = document.getElementById('weather-info');
        const loadingIndicator = document.getElementById('loading');
        const errorMessage = document.getElementById('error-message');

        const elements = {
            cityName: document.getElementById('city-name'),
            temperature: document.getElementById('temperature'),
            description: document.getElementById('weather-description'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('wind-speed')
        };

        const API_KEY = '9f2497622a7e150d92f065dc247b0ba0'; // Replace with actual OpenWeatherMap API key

        searchBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) {
                    fetchWeather(city);
                }
            }
        });

        async function fetchWeather(city) {
            resetUI();
            loadingIndicator.style.display = 'block';

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
                const data = await response.json();

                if (data.cod === 200) {
                    updateWeatherInfo(data);
                } else {
                    showError('City not found');
                }
            } catch (error) {
                showError('Failed to fetch weather data');
            } finally {
                loadingIndicator.style.display = 'none';
            }
        }

        function updateWeatherInfo(data) {
            elements.cityName.textContent = data.name;
            elements.temperature.textContent = `${Math.round(data.main.temp)}°C`;
            elements.description.textContent = data.weather[0].description;
            elements.humidity.textContent = `${data.main.humidity}%`;
            elements.windSpeed.textContent = `${data.wind.speed} km/h`;

            weatherInfo.style.display = 'block';
        }

        function resetUI() {
            weatherInfo.style.display = 'none';
            errorMessage.style.display = 'none';
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }