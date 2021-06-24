const { Router } = require("express");
const router = Router();

//const { logging } = require('../controllers/planner.controller');
const { auth } = require('../js/auth');

router.get('/pln', auth, (req, res) => {
    res.render('planificador');
});

//router.post('/', logging);

module.exports = router;