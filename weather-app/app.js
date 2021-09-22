const request = require('request');

const location = "Salvador"

request.get("http://api.weatherstack.com/current", {
  useQuerystring: true,
  qs: {
    access_key: "63d1bd3ab2ebd9347c5978d097439e3f",
    query: "Salvador",
    units: "m"
  }
}, (error, response) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    const data = JSON.parse(response.body);
    debugger;
    console.log(`It's currently ${data.current.temperature} degrees out there. It feels like ${data.current.feelslike} out, with ${data.current.precip * 100}% chance of rain`);
  }
})

request.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`, {
  useQuerystring: true,
  qs: {
    "access_token": "pk.eyJ1IjoiZW1lcnNvbjI5OTgiLCJhIjoiY2t0dXJkeW44MDB0ejJ2cWgyODB5dHRmZyJ9.jv3THhxMKqBCC4UUrwA7nA"
  }
}, (error, response) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    const data = JSON.parse(response.body);
    const features = data.features;

    features.forEach(feature => {
      const cord = feature.geometry.coordinates;
      console.log(`${feature.place_name} => Latitude: ${cord[1]} / Longitude: ${cord[0]}`);
    });
  }
})