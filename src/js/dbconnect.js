const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-34-193-112-164.compute-1.amazonaws.com',
    user: 'zaeefiudjurtxf',
    password: '13fe4c1be4f86edf36839d648b3ec614c59936bb4afcde71223dce8a772ce341',
    database: 'd5abtmg5q8j2g7',
    port: '5432',
    ssl: true
});

module.exports = {
    pool
}