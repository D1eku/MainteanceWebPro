const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://zaeefiudjurtxf:13fe4c1be4f86edf36839d648b3ec614c59936bb4afcde71223dce8a772ce341@ec2-34-193-112-164.compute-1.amazonaws.com:5432/d5abtmg5q8j2g7',
    ssl: {
        rejectUnauthorized: false,
        require: true
    }
});

module.exports = {
    pool
}