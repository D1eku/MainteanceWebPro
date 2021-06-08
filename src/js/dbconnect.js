const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

/*
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});
const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-34-193-112-164.compute-1.amazonaws.com',
    user: 'zaeefiudjurtxf',
    password: '13fe4c1be4f86edf36839d648b3ec614c59936bb4afcde71223dce8a772ce341',
    database: 'd5abtmg5q8j2g7',
    port: '5432'
});
*/

module.exports = {
    pool
}