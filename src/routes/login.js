const { Router } = require("express");
const router = Router();

const { logging } = require('../controllers/login.controller');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', logging);

module.exports = router;