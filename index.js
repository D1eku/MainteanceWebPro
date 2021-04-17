//Datos server;
const hostname = '127.0.0.1';
const port = 3000;

//Conexion SQL
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: hostname,
  database: "test-mainteance",
  password: "postgres",
  port: 5432,
});

client.connect();
//Conexion SQL


//Express
const express = require('express');
const app = express();
app.use(require('/routes/index'))
app.listen(port, function() {
  console.log('Servidor web escuchando en el puerto 3000');
});
app.use(express.static(__dirname + '/public/'));


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Gets 
app.get("/", function(req, res){
  console.log("GET --> /")
  res.sendFile("/index.html")
});


//Post
app.post("/try-login", function(req, res){
  console.log("trying to loggin ")
  console.log(req.body)

});



