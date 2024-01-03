// jshint esversion: 6

const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));



//create 3 methods

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.city);
  //https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=8a748572feba22307cbca17ffbef1337
  var cityname = req.body.city;
  var apikey = "8a748572feba22307cbca17ffbef1337";
  var unit = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey + "&units=" + unit;


  https.get(url, function(response) {
    console.log(response.statusCode);



    response.on("data", function(data) {
      //console.log(data);
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      res.write("<p> The weather in " + cityname + " is: " + weatherData.weather[0].description + "</p>");
      res.write("<h4> The temperatue is " + weatherData.main.temp + "</h4>");
      res.write("<img src=http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png>");
      res.send();

    });

  });

});



app.listen(3000, function() {
  console.log("server started on port 3000");
});
