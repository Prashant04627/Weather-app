const express = require('express');
const https = require("https")
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
  })

app.post("/", function(req, res) {
 var query = req.body.cityName
 var units = req.body.degree
 console.log(units);
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=f57fb68d15a101d9a9bf8121b0c6909c&units="+ units;
 https.get(url, function(response) {

   response.on("data", function(data) {
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const iconPic =" http://openweathermap.org/img/wn/"+ icon + "@2x.png"
     res.write("<h1>The Temperature in "+ query + " is " + temp + " " +units + ".</h1>")
     res.write( "<p>the weather description is " + weatherDescription + '</p>')
     res.write("<img src = "+ iconPic + ">")
     res.send()
   })
 })


})

app.listen("3000", function() {
  console.log("responding")
})
