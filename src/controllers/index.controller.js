const { pool } = require('../js/dbconnect');

const getUsers = (req, res) => {
    const response = pool.query('SELECT * FROM administrador');
    console.log(response.rows);
    res.send('users');
}

module.exports = {
    getUsers
}