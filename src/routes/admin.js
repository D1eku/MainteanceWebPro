const { Router } = require("express");
const router = Router();

const { esAdm } = require('../js/auth');
const { adminUserMenu, adminEquipoMenu, adminPautasMenu, addPautasMenu, adminEmpresaMenu, addNewUsuario, editUsuario, addNewEmpresa, editEmpresa, addNewEquipo, editEquipo, addNewPauta, editPauta, editExistPautaAdmin } = require('../controllers/admin.controllers');

//Administrador
router.get('/administrador', esAdm, (req, res) => {
    res.render('administrador', { nombre: req.session.nombre });
});

//Administracion de Pautas
router.get('/admin-pautas-menu', esAdm, adminPautasMenu);
router.get('/admin-pautas-menu-agregar-pauta', esAdm, addPautasMenu);
router.post('/edit-pauta-admin', esAdm, editPauta);
router.post('/add-new-pauta-admin', esAdm, addNewPauta);
router.post('/edit-exist-pauta-admin', esAdm, editExistPautaAdmin);


//Administracion de Empresas
router.get('/admin-empresas-menu', esAdm, adminEmpresaMenu);
router.post('/add-new-empresa-admin', esAdm, addNewEmpresa);
router.post('/editar-empresa-admin', esAdm, editEmpresa);

//Administracion de Equipos
router.get('/admin-equipos-menu', esAdm, adminEquipoMenu);
router.post('/add-new-equipo-admin', esAdm, addNewEquipo);
router.post('/editar-equipo-admin', esAdm, editEquipo);

//Administracion de Usuarios 
router.get('/admin-usuarios-menu', esAdm, adminUserMenu);
router.post('/add-new-usuario-admin', esAdm, addNewUsuario);
router.post('/edit-usuario-admin', esAdm, editUsuario);

module.exports = router;