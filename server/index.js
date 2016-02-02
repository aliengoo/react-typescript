"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var app = express();
app.use(jsonParser);

var movies = require("./movies/movies");

// routes here
app.use("/api", movies);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
