const request = require("request");

const location = "Salvador";

request.get(
  "http://api.weatherstack.com/current",
  {
    useQuerystring: true,
    qs: {
      access_key: "63d1bd3ab2ebd9347c5978d097439e3f",
      query: location,
      units: "m",
    },
  },
  (error, response) => {
    const data = JSON.parse(response.body);
    if (error) {
      console.log("Unable to get weather information");
    } else if (data?.error?.code !== "undefined" && data?.error?.code === 601) {
      console.log("Unable to find weather information to specified location");
    } else {
      console.log(
        `It's currently ${
          data.current.temperature
        } degrees out there. It feels like ${
          data.current.feelslike
        } out, with ${data.current.precip * 100}% chance of rain`
      );
    }
  }
);

request.get(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
  {
    useQuerystring: true,
    qs: {
      access_token:
        "pk.eyJ1IjoiZW1lcnNvbjI5OTgiLCJhIjoiY2t0dXJkeW44MDB0ejJ2cWgyODB5dHRmZyJ9.jv3THhxMKqBCC4UUrwA7nA",
      limit: 1,
    },
  },
  (error, response) => {
    if (error) {
      console.log("Unable to get location");
    } else if (response?.body.includes("Not Found")) {
      console.log("Unable to find specified location");
    } else {
      const data = JSON.parse(response.body);
      const currentLocation = data.features.shift();
      const cord = currentLocation.geometry.coordinates;
      console.log(
        `${currentLocation.place_name} => Latitude: ${cord[1]} / Longitude: ${cord[0]}`
      );
    }
  }
);
