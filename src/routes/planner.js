const { Router } = require("express");
const router = Router();

const { esPln } = require('../js/auth');

router.get('/pln', esPln, (req, res) => {
    res.render('planificador');
});


module.exports = router;