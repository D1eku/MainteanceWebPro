const { pool } = require('../js/dbconnect');

const getUsers = async(req, res) => {
    const response = await pool.query('SELECT * FROM administrador');
    console.log(response.rows);
    res.send('users');
}

module.exports = {
    getUsers
}