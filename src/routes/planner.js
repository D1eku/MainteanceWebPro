const { Router } = require("express");
const router = Router();

//const { logging } = require('../controllers/planner.controller');

router.get('/pln', (req, res) => {
    res.render('planificador');
});

//router.post('/', logging);

module.exports = router;