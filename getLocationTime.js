const fetch = require("node-fetch");
const config = require("./config.json");

const { rapidApiTimezoneHost, rapidApiKey } = config;

const targetDate = new Date(); // Current date/time of user computer
const timestamp =
  targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC

const getLocationTimeApi = (timestamp, lat, lng) =>
  `https://google-maps-time-zone.p.rapidapi.com/timezone/json?timestamp=${timestamp}&location=${lat}%2C${lng}`;

module.exports = {
  getLocationTime: async ({ lat, lng }) => {
    try {
      if (!lat || !lng) throw new Error("Latitude and longitude is required!");
      const timezone = await fetch(getLocationTimeApi(timestamp, lat, lng), {
        method: "GET",
        headers: {
          "x-rapidapi-host": rapidApiTimezoneHost,
          "x-rapidapi-key": rapidApiKey,
          useQueryString: true,
        },
      });

      const timezoneData = await timezone.json();

      if (timezoneData.status !== "OK")
        throw new Error("Unable to get timezone");

      return new Date().toLocaleString("en-US", {
        timeZone: timezoneData.timeZoneId,
      });
    } catch (err) {
      throw Error(err);
    }
  },
};
