const { Router } = require("express");
const router = Router();

const { esMtn } = require('../js/auth');

router.get('/mtn', esMtn, (req, res) => {
    res.render('mantenedor');
});


module.exports = router;