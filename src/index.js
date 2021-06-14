const express = require("express");
const morgan = require("morgan");
const app = express();

//const { pool } = require('./js/dbconnect')

//settings
app.set('appName', 'MainteanceWebPro');
app.set('port', process.env.PORT || 3000);

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('src/public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    console.log(__dirname);
    res.render('index');
});

app.get('/admin', (req, res) => {
    res.render(__dirname + '/public/administrador.ejs');
});



app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/hola', (req, res) => {
    res.send('about');
});

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log("Servidor en http://localhost:" + app.get('port'));
});