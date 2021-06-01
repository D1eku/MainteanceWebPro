var pgp = require("pg-promise")( /*options*/ );
var db = pgp("postgres://zaeefiudjurtxf:13fe4c1be4f86edf36839d648b3ec614c59936bb4afcde71223dce8a772ce341@host:5432/d5abtmg5q8j2g7");

db.one("SELECT $1 AS value", 123)
    .then(function(data) {
        console.log("DATA:", data.value);
    })
    .catch(function(error) {
        console.log("ERROR:", error);
    });