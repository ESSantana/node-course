const express = require("express");

const app = express();

app.get("", (request, response) => {
  response.send("Hello, world!");
});

app.listen(3000, "", () => console.log("App running on localhost port 3000"));
