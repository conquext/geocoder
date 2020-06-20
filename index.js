const config = require("./config.json");
const { getLocationCoordinates } = require("./getLocationCoordinates");
const { getLocationTime } = require("./getLocationTime");
const { getLocationWeather } = require("./getLocationWeather");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Given an array of inputs (location name, postal code), log the current time and weather for those locations.
// Example: "./weather , Tokyo, São Paulo, Pluto"

let textInput;

const getPlaceInfo = (place) => {
  console.info("processing...");
  getLocationCoordinates(place).then(async (locationCoordinates) => {
    const locationTime = await getLocationTime(locationCoordinates);
    const locationWeather = await getLocationWeather(locationCoordinates);

    console.table({
      Place: place,
      Time: locationTime,
      Weather: locationWeather,
    });

    if (textInput !== "Exit") getInputAndRun();
  });
};

function getInputAndRun() {
  readline.question(
    `Enter a place to lookup its timezone and weather: `,
    (inputs) => {
      if (inputs) {
        if (typeof inputs === "string") {
          if (inputs.toLowerCase().trim() === "exit") textInput = "Exit";
          else getPlaceInfo([inputs]);
        }
      }
      readline.close();
    }
  );
}

getInputAndRun();
