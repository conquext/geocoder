const fetch = require("node-fetch");
const config = require("./config.json");

const { rapidApiWeatherHost, rapidApiKey } = config;

const KELVINSCALE = 273.15;

const getLocationWeatherApi = (lat, lng) =>
  `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${lng}`;

module.exports = {
  getLocationWeather: async ({ lat, lng }) => {
    try {
      if (!lat || !lng) throw new Error("Latitude and longitude is required!");
      const weather = await fetch(getLocationWeatherApi(lat, lng), {
        method: "GET",
        headers: {
          "x-rapidapi-host": rapidApiWeatherHost,
          "x-rapidapi-key": rapidApiKey,
          useQueryString: true,
        },
      });

      const weatherData = await weather.json();

      if (weatherData.cod !== 200) throw new Error("Unable to get weather");
      return {
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        temperature: `${(weatherData.main.temp - KELVINSCALE).toFixed(2)}°C`,
      };
    } catch (err) {
      throw Error(err);
    }
  },
};
