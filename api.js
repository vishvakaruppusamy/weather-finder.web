const userInputBox = document.getElementsByClassName('input')[0];
const searchButton = document.getElementsByClassName('button')[0];
const weatherDisplay = document.getElementById('weather-display');

const getinput = () => {
  const userinput = userInputBox.value;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userinput}&appid=d7730b2e0f0ba90a3e84f67e9abb8d5d`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const weatherUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d7730b2e0f0ba90a3e84f67e9abb8d5d`;
      
      return fetch(weatherUrl2);
    })
    .then(response => response.json())
    .then(weatherData => {
        console.log(weatherData)
      // Create HTML elements to display the weather information
      const cityName = document.createElement('h2');
      cityName.textContent = weatherData.name;

      const weatherDescription = document.createElement('p');
      weatherDescription.textContent = weatherData.weather[0].description;

      const temperatureKelvin = weatherData.main.temp;
      const temperatureCelsius = temperatureKelvin - 273.15;    

      const temperature = document.createElement('p');
      temperature.textContent = `Temperature: ${temperatureCelsius.toFixed(1)} °C`;


      const humidity = document.createElement('p');
      humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

      // Clear previous weather information
    weatherDisplay.innerHTML = '';

   
      weatherDisplay.append(cityName,weatherDescription,temperature,humidity)
    })
    .catch(error => console.log(error));
}

searchButton.addEventListener('click', getinput);
