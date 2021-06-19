const express = require("express");
const morgan = require("morgan");
const app = express();
const session = require('express-session');
const flash = require('express-flash');

//const { pool } = require('./js/dbconnect')

//settings
app.set('appName', 'MainteanceWebPro');
app.set('port', process.env.PORT || 3000);

//middleware
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: "",
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//routes
app.use(require('./routes/login'));
app.use(require('./routes/admin'));
app.use(require('./routes/planner'));
app.use(require('./routes/mantenedor'));



app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log("Servidor en http://localhost:" + app.get('port'));
});