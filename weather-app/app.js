const yargs = require("yargs");
const chalk = require("chalk");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

yargs.version("1.0.0");
yargs.command({
  command: "weather",
  describe: "Search current weather information of location",
  builder: {
    location: {
      describe: "Location to get the weather information",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => entryPoint(argv.location),
});

const entryPoint = (location) => {
  if (location === "") {
    console.log(chalk.red.bold("Please, provide an address"));
    return;
  }
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    weather(latitude, longitude, (error, weatherResponse) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }
      templateOutput(location, weatherResponse);
    });
  });
};

const templateOutput = (
  location,
  { temperature, feelsLikeTemperature, chanceOfRain }
) => {
  console.log(
    chalk.green.bold(
      `${location} => It's ${temperature} ºC and feels like ${feelsLikeTemperature} ºC. There is ${chanceOfRain}% chance of rain`
    )
  );
};

yargs.parse();
