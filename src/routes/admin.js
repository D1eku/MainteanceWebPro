const { Router } = require("express");
const router = Router();

//const { getUsers } = require('../controllers/users.controller');

router.get('/administrador', (req, res) => {
    res.render('administrador', { nombre: req.session.nombre });
});

module.exports = router;