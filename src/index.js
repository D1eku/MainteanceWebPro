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

app.use(require('./routes/users'));
app.use(express.static('src/public'));


app.get('/', (req, res) => {
    console.log(__dirname);
    res.render(__dirname+'/public/index.ejs');
});

app.get('/admin', (req, res) => {
    res.render(__dirname +'/public/administrador.ejs');
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