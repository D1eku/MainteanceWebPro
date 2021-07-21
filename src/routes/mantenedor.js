const { Router } = require("express");
const router = Router();

const { esMtn } = require('../js/auth');
const { mantenedorMenu, getFichaFill, uploadData } = require('../controllers/mantenedor.controllers');

router.get('/mtn', esMtn, mantenedorMenu);

router.post('/start-ficha', esMtn, getFichaFill);

router.post('/send-data-of-mainteance', esMtn, uploadData)

module.exports = router;