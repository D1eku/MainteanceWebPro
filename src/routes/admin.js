const { Router } = require("express");
const router = Router();

//const { getUsers } = require('../controllers/users.controller');
const { auth } = require('../js/auth');
const { adminUserMenu, adminEquipoMenu, adminPautasMenu, addPautasMenu, adminEmpresaMenu, addNewUsuario, editUsuario, addNewEmpresa, editEmpresa, addNewEquipo } = require('../controllers/admin.controllers');

//Administrador
router.get('/administrador', auth, (req, res) => {
    res.render('administrador', { nombre: req.session.nombre });
});

//Administracion de Pautas
router.get('/admin-pautas-menu', auth, adminPautasMenu);
router.get('/admin-pautas-menu-agregar-pauta', auth, addPautasMenu);
//router.post('/add-new-pauta-admin', auth, addnewPauta);

//Administracion de Empresas
router.get('/admin-empresas-menu', auth, adminEmpresaMenu);
router.post('/add-new-empresa-admin', auth, addNewEmpresa);
router.post('/editar-empresa-admin', auth, editEmpresa);

//Administracion de Equipos
router.get('/admin-equipos-menu', auth, adminEquipoMenu);
router.post('/add-new-equipo-admin', auth, addNewEquipo);

//Administracion de Usuarios 
router.get('/admin-usuarios-menu', auth, adminUserMenu);
router.post('/add-new-usuario-admin', auth, addNewUsuario);
router.post('/edit-usuario-admin', auth, editUsuario);

module.exports = router;