const { Router } = require("express");

const router = Router();

const { esMtn } = require('../js/auth');

const { mantenedorMenu } = require('../controllers/mantenedor.controllers');

router.get('/mtn', esMtn, mantenedorMenu);

router.post('/start-ficha', esMtn, (req, res) => {
    const pautaInfo = {
        'codigoPautaMantencion': 'text',
        'nombrePauta': 'text',
        'nombreTecnicoPauta': 'text',
        'nombreEquipoPauta': 'text',
        'codigoEquipoPauta': 'text',
        'fechaCalendarizadaPauta': 'text'
    }
    res.render('man-ficha', { pautaInfo })
});



module.exports = router;