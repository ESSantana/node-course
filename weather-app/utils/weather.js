const request = require("request");

const weather = (latitude, longitude, callback) => {
  request.get(
    "http://api.weatherstack.com/current",
    {
      useQuerystring: true,
      qs: {
        access_key: "63d1bd3ab2ebd9347c5978d097439e3f",
        query: `${latitude},${longitude}`,
        units: "m",
      },
    },
    (error, { body }) => {
      const data = JSON.parse(body);
      if (error) {
        callback("Unable to get weather information", undefined);
      } else if (
        data?.error?.code !== "undefined" &&
        data?.error?.code === 601
      ) {
        callback(
          "Unable to find weather information to specified location",
          undefined
        );
      } else {
        callback(undefined, {
          temperature: data.current.temperature,
          feelsLikeTemperature: data.current.feelslike,
          chanceOfRain: data.current.precip * 100,
        });
      }
    }
  );
};

module.exports = weather;
