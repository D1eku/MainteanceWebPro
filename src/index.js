const express = require("express");
const morgan = require("morgan");
const app = express();

//const { pool } = require('./js/dbconnect')

//settings
app.set('appName', 'MainteanceWebPro');
app.set('port', 3000);
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/users'));


app.get('/', (req, res) => {
    const data = [{ name: 'john' }, { name: 'wily' }];
    res.render('index.ejs', { people: data });
})

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/hola', (req, res) => {
    res.send('about');
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log("server on port", app.get('port'));
});