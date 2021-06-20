const { Router } = require("express");
const router = Router();
const { pool } = require('../js/dbconnect');//Quizas haya que sacar esto despues 

//const { getUsers } = require('../controllers/users.controller');

//Administrador
router.get('/administrador', (req, res) => {
    res.render('administrador', { nombre: req.session.nombre });
});

//Administracion de Pautas
router.get('/admin-pautas-menu', (req, res) => {
    var dataPage = [

    ]

    res.render('admin-pautas-menu', { nombre: req.session.nombre, dataPage });
});

router.get('/admin-pautas-menu-agregar-pauta', (req, res) => {
    var dataPage = [

    ]

    res.render('admin-pautas-menu-agregar-pauta', { nombre: req.session.nombre, dataPage });
});

router.post('/add-new-pauta-admin', (req, res) => {
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
    res.render('admin-pautas-menu-agregar-pauta', { nombre: req.session.nombre, dataPage });
});

//Administracion de Equipos
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

//Administracion de Usuarios 
router.get('/admin-usuarios-menu', (req, res) => {
    //Primera query empresas
    pool.query('select * from empresa', async function(err, results, fields) {
        //Segunda query usuarios
        pool.query('select u.rut, email, nombre,activo, tipo from usuario u inner join tipo_usuario tu on u.rut = tu.rut', async function(err2, results2, fields2) {
            //Tercera query mantenedores.
            pool.query('select u.rut, email, nombre,activo, rol, empresa from usuario u inner join mantenedor m on u.rut = m.rut', async function(err3, results3, fields3) {
                console.log("Empresas")
                console.log(results.rows)
                console.log("Usuarios")
                console.log(results2.rows)
                console.log("Mantenedores Info")
                console.log(results3.rows)
                var empresas = results.rows;
                var usuarios = results2.rows;
                var mantenedores = results3.rows;
                res.render('admin-usuarios-menu', { nombre: req.session.nombre, empresas, usuarios, mantenedores });
            });
        });
    });
});

router.post('/add-new-usuario-admin', (req, res) => {
    // Hola mauro o belen soy el dieku
    // necesito que me hagan una query con los datos de las empresas
    // Estos datos se tienen que estructurar en un JSON como se ve abajo 
    // En la variable dataPage
    // Esta parte de la pagina para cargar la tabla ta "casi lista"
    // Asi que eso jeje
    console.log(req.body)
    return res.redirect('/admin-usuarios-menu');
});

//Administracion de Empresas
router.get('/admin-empresas-menu', (req, res) => {
    // Hola mauro o belen soy el dieku
    // necesito que me hagan una query con los datos de las empresas
    // Estos datos se tienen que estructurar en un JSON como se ve abajo 
    // En la variable dataPage
    // Esta parte de la pagina para cargar la tabla ta "casi lista"
    // Asi que eso jeje
    //var dataPage = [];

    pool.query('select * from empresa', async function(err, results, fields) {
        //console.log(results.rows)
            //for(var i = 0; i<results.rows.length; i++){
            //    console.log(results.rows[i]);
                
            //}
            var dataPage = results.rows;
            return res.render('admin-empresas-menu', { nombre: req.session.nombre, dataPage });
        });

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
    var activa_new_empresa = req.body.estado_activacion_new_empresa;
    var active_new_empresa = true;
    if(activa_new_empresa == "1"){
        var active_new_empresa = false;
    }
    //Generar query correspondiente para agregar y saber si se logro o no agregar

    //Query con insert

    return res.redirect('/admin-empresas-menu');
});

router.post('/editar-empresa-admin', (req, res) => {
    console.log(req.body)
    var code_edit_empresa = req.body.code_new_empresa;
    var name_edit_empresa = req.body.name_new_empresa;
    var activa_edit_empresa = req.body.estado_activacion_new_empresa;
    var active_edit_empresa = true;
    if(activa_new_empresa == "1"){
        var active_new_empresa = false;
    }

    //Generar query correspondiente para editar y saber si se logro o no editar

    //Retornar pagina con las nuevas empresas.
    
    return res.redirect('/admin-empresas-menu');
});

module.exports = router;