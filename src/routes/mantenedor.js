const { Router } = require("express");
const router = Router();

//const { logging } = require('../controllers/planner.controller');
const { auth } = require('../js/auth');

router.get('/mtn', auth, (req, res) => {
    res.render('mantenedor');
});

//router.post('/', logging);

module.exports = router;