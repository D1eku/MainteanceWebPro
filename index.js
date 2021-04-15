const hostname = '127.0.0.1';
const port = 3000;

const http = require('http');

const express = require('express');
const app = express();

const bodyParser = require("body-parser");


app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded( { extended: true }));


app.get("/", function(req, res){
  console.log("GET --> /")
  res.sendFile("/index.html")
});



app.post("/try-login", function(req, res){
  console.log(req.body)
  res.send("Your data is OK LOgged")
});

app.listen(port, function() {
  console.log('Servidor web escuchando en el puerto 3000');
});

