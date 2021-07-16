const { Router } = require("express");
const router = Router();

const { esMtn } = require('../js/auth');
const { mantenedorMenu, getFichaFill, uploadData } = require('../controllers/mantenedor.controllers');

router.get('/mtn', esMtn, mantenedorMenu);

/*
router.post('/start-ficha', esMtn, (req, res) => {
    const pautaInfo = {
        'codigoPautaMantencion': 'text',
        'nombrePauta': 'text',
        'nombreTecnicoPauta': 'text',
        'nombreEquipoPauta': 'text',
        'codigoEquipoPauta': 'text',
        'fechaCalendarizadaPauta': 'text'
        'items' : {
            ''
        }
    }
    res.render('man-ficha', { pautaInfo })
}); */

router.post('/start-ficha', esMtn, getFichaFill);

router.post('/send-data-of-mainteance', esMtn,uploadData)

module.exports = router;