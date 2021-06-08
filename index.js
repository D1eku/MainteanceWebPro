//Datos server;
const hostname = '127.0.0.1';
const port = 3000;

//Conexion SQL
const { Client } = require("pg");

const client = new Client({
    user: "zaeefiudjurtxf",
    host: "ec2-34-193-112-164.compute-1.amazonaws.com",
    database: "d5abtmg5q8j2g7",
    password: "13fe4c1be4f86edf36839d648b3ec614c59936bb4afcde71223dce8a772ce341",
    port: 5432,
});

client.connect();
console.log("???? hola probando algo")
    //Conexion SQL


//Express
const express = require('express');
const app = express();
app.use(require('/routes/index'))
app.listen(port, function() {
    console.log('Servidor web escuchando en el puerto 3000');
});


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Gets 
app.get("/", function(req, res) {
    console.log("GET --> /")
    res.sendFile("/index.html")
});


//Post
app.post("/try-login", function(req, res) {
    console.log("trying to loggin ")
    console.log(req.body)

});