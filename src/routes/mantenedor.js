const { Router } = require("express");
const router = Router();

//const { logging } = require('../controllers/planner.controller');

router.get('/mtn', (req, res) => {
    res.render('mantenedor');
});

//router.post('/', logging);

module.exports = router;