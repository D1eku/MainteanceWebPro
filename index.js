const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/hola', (req, res) => {
    res.send('about');
});

app.listen(3000, () => {
    console.log("server on port 3000");
});