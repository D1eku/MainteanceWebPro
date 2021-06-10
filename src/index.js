const express = require("express");
const morgan = require("morgan");
const app = express();

//const { pool } = require('./js/dbconnect')

//settings
app.set('appName', 'MainteanceWebPro');
app.set('port', 3000);

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/users'));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/hola', (req, res) => {
    res.send('about');
});

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log("server on port", app.get('port'));
});