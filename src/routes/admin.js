const { Router } = require("express");
const router = Router();

//const { getUsers } = require('../controllers/users.controller');
const { adminUserMenu, adminEquipoMenu, adminPautasMenu, addPautasMenu, adminEmpresaMenu, addNewUsuario, editUsuario } = require('../controllers/admin.controllers');

//Administrador
router.get('/administrador', (req, res) => {
    res.render('administrador', { nombre: req.session.nombre });
});

//Administracion de Pautas
router.get('/admin-pautas-menu', adminPautasMenu);
router.get('/admin-pautas-menu-agregar-pauta', addPautasMenu);
//router.post('/add-new-pauta-admin', addnewPauta);

//Administracion de Empresas
router.get('/admin-empresas-menu', adminEmpresaMenu);
//router.post('/add-new-empresa-admin', addNewEmpresa);
//router.post('/editar-empresa-admin', editEmpresa);

//Administracion de Equipos
router.get('/admin-equipos-menu', adminEquipoMenu);
//router.post('/add-new-equipo-admin', addNewEquipo);

//Administracion de Usuarios 
router.get('/admin-usuarios-menu', adminUserMenu);
router.post('/add-new-usuario-admin', addNewUsuario);
router.post('/edit-usuario-admin', editUsuario);

module.exports = router;