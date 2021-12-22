// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
// callback function to debug
function listening() {
  console.log(`Server running on localhost ${port}`);
}
// http get request
app.get("/all", function (req, res) {
  console.log(projectData);
  res.send(projectData);
});

// http post request
app.post("/addWeatherData", addWeatherData);

function addWeatherData(req, res) {
  projectData.date = req.body.date
  projectData.temp = req.body.temp
  projectData.content = req.body.content
  res.send({ msg: "data posted successfully" });
  console.log("server ", projectData);
}
