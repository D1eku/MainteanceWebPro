const { Router } = require("express");

const router = Router();

const { esMtn } = require('../js/auth');

//Quita esto mauro
const { pool } = require('../js/dbconnect');
//Quita eso ya tu sabes la organizacion esa que haces owo 

const { mantenedorMenu } = require('../controllers/admin.controllers');

router.get('/mtn', esMtn,  (req, res)  =>  {

    const mantData = { 
        'rut' : 'dieku',
        'rol' : 'dieku',
        'nombre_usuario': 'dieku',
        'email' : 'dieku@dieku.cl',
        'empresa' : '001',
        'nombre_empresa' : 'Chait-Enterprise',
        'activa' : true
    }
    
    const pautas_mant = [ 
        {
            'cod_pauta' : '0001',
            'nombre_pauta': 'Mantencion Motocierras',
            'fecha_realizar' : '01/08/2021',
            'Ubicacion': 'La Serena ? O GPS ',
            'Estado' : 'Por Realizar'
        }

    ]


    res.render('mantenedor', {mantData, pautas_mant});
}); 

router.post('/start-ficha', esMtn, (req, res) => {
    const pautaInfo = {
        'info1':'text',
        'info2':'text',
        'info3':'text',
        'info4':'text'
    }
    res.render('man-ficha', {pautaInfo})
});

//router.get('/mtn', esMtn, mantenedorMenu);


module.exports = router;