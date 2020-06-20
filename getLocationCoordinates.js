const fetch = require("node-fetch");
const config = require("./config.json");

const { rapidApiLocationHost, rapidApiKey } = config;

const getLocationCoordinatesApi = (address) =>
  `https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${address}`;

module.exports = {
  getLocationCoordinates: async (searchText = "New York, 10005") => {
    try {
      const locationFound = await fetch(getLocationCoordinatesApi(searchText), {
        method: "GET",
        headers: {
          "x-rapidapi-host": rapidApiLocationHost,
          "x-rapidapi-key": rapidApiKey,
        },
      });

      if (locationFound.statusText !== "OK")
        throw new Error("Unable to fetch data");

      const locationData = await locationFound.json();

      const lat = locationData.results[0].geometry.location.lat;
      const lng = locationData.results[0].geometry.location.lng;

      return { lat, lng };
    } catch (err) {
      throw Error(err);
    }
  },
};
