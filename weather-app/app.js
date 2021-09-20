const request = require('request');

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