const { Router } = require("express");
const router = Router();

//const { getUsers } = require('../controllers/users.controller');

router.get('/administrador', (req, res) => {
    res.render('administrador', { nombre: req.session.nombre });
});

router.get('/admin-pautas-menu', (req, res) => {
    var dataPage = [

    ]

    res.render('admin-pautas-menu', { nombre: req.session.nombre, dataPage });
});

router.get('/admin-equipos-menu', (req, res) => {
    
    var dataPage = [  

    ]

    res.render('admin-equipos-menu', { nombre: req.session.nombre, dataPage });
});

router.post('/add-new-equipo-admin', (req, res) => {
    // Hola mauro o belen soy el dieku
    // necesito que me hagan una query con los datos de las empresas
    // Estos datos se tienen que estructurar en un JSON como se ve abajo 
    // En la variable dataPage
    // Esta parte de la pagina para cargar la tabla ta "casi lista"
    // Asi que eso jeje
    console.log(req.body)
    //Generar query correspondiente para agregar y saber si se logro o no agregar

    //Retornar pagina con las nuevas empresas.
    var dataPage = [
        {
        "codigo_empresa": "E1",
        "nombre_empresa": "Empresa 1",
        },
        {
        "codigo_empresa": "E2",
        "nombre_empresa": "Empresa 2",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E4",
        "nombre_empresa": "Empresa 4",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
    ];
    res.render('admin-equipos-menu', { nombre: req.session.nombre, dataPage });
});


router.get('/admin-usuarios-menu', (req, res) => {
    
    var dataPage = [  

    ]

    res.render('admin-usuarios-menu', { nombre: req.session.nombre, dataPage });
});

router.get('/admin-empresas-menu', (req, res) => {
    // Hola mauro o belen soy el dieku
    // necesito que me hagan una query con los datos de las empresas
    // Estos datos se tienen que estructurar en un JSON como se ve abajo 
    // En la variable dataPage
    // Esta parte de la pagina para cargar la tabla ta "casi lista"
    // Asi que eso jeje
    var dataPage = [
        {
        "codigo_empresa": "E1",
        "nombre_empresa": "Empresa 1",
        },
        {
        "codigo_empresa": "E2",
        "nombre_empresa": "Empresa 2",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E4",
        "nombre_empresa": "Empresa 4",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
    ];

    res.render('admin-empresas-menu', { nombre: req.session.nombre, dataPage });
});

router.post('/add-new-empresa-admin', (req, res) => {
    // Hola mauro o belen soy el dieku
    // necesito que me hagan una query con los datos de las empresas
    // Estos datos se tienen que estructurar en un JSON como se ve abajo 
    // En la variable dataPage
    // Esta parte de la pagina para cargar la tabla ta "casi lista"
    // Asi que eso jeje
    console.log(req.body)
    var code_new_empresa = req.body.code_new_empresa;
    var name_new_empresa = req.body.name_new_empresa;
    //Generar query correspondiente para agregar y saber si se logro o no agregar

    //Retornar pagina con las nuevas empresas.
    var dataPage = [
        {
        "codigo_empresa": "E1",
        "nombre_empresa": "Empresa 1",
        },
        {
        "codigo_empresa": "E2",
        "nombre_empresa": "Empresa 2",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E4",
        "nombre_empresa": "Empresa 4",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
    ];
    res.render('admin-empresas-menu', { nombre: req.session.nombre, dataPage });
});

router.post('/editar-empresa-admin', (req, res) => {
    console.log(req.body)
    var code_new_empresa = req.body.code_new_empresa;
    var name_new_empresa = req.body.name_new_empresa;
    //Generar query correspondiente para editar y saber si se logro o no editar

    //Retornar pagina con las nuevas empresas.
    var dataPage = [
        {
        "codigo_empresa": "E1",
        "nombre_empresa": "Empresa 1",
        },
        {
        "codigo_empresa": "E2",
        "nombre_empresa": "Empresa 2",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E4",
        "nombre_empresa": "Empresa 4",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
        {
        "codigo_empresa": "E3",
        "nombre_empresa": "Empresa 3",
        },
    ];
    res.render('admin-empresas-menu', { nombre: req.session.nombre, dataPage });
});

module.exports = router;