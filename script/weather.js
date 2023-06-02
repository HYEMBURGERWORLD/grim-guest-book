const API_KEY = weatherKey;

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeatherCurrentLocation(lat, lon);
  });
};

const getWeatherCurrentLocation = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = data.weather[0].main;
      const temp = data.main.temp;
      const city = data.name;

      const span = document.getElementById('weather');
      span.innerText = `${city}, ${(temp - 273.15).toFixed(1)}°, ${weather}`;
    });
};

getCurrentLocation();
