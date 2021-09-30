const request = require("request");

const geocodeBaseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const geocode = (address, callback) => {
  request.get(
    `${geocodeBaseUrl}/${encodeURIComponent(address)}.json`,
    {
      useQuerystring: true,
      qs: {
        access_token:
          "pk.eyJ1IjoiZW1lcnNvbjI5OTgiLCJhIjoiY2t0dXJkeW44MDB0ejJ2cWgyODB5dHRmZyJ9.jv3THhxMKqBCC4UUrwA7nA",
        limit: 1,
      },
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to get location", undefined);
      } else if (body.includes("Not Found")) {
        callback("Unable to find specified location", undefined);
      } else {
        const data = JSON.parse(body);
        const currentLocation = data.features.shift();
        const cord = currentLocation.geometry.coordinates;
        callback(undefined, {
          latitude: cord[1],
          longitude: cord[0],
          location: currentLocation.place_name,
        });
      }
    }
  );
};

module.exports = geocode;
