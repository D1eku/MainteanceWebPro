const { Router } = require("express");

const router = Router();

const { esMtn } = require('../js/auth');

const { mantenedorMenu } = require('../controllers/mantenedor.controllers');

router.get('/mtn', esMtn, mantenedorMenu);

router.post('/start-ficha', esMtn, (req, res) => {
    const pautaInfo = {
        'info1': 'text',
        'info2': 'text',
        'info3': 'text',
        'info4': 'text'
    }
    res.render('man-ficha', { pautaInfo })
});



module.exports = router;