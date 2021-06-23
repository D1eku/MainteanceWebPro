const { pool } = require('../js/dbconnect');
/*
const addNewPauta = async (req,res) => {
    try{
        res.redirect('/admin-pautas-menu');
    }
    catch(err){
        console.log(err);
    }
    
}

const addNewEquipo = async (req,res) => {
    try{
        res.redirect('/admin-equipos-menu');
    }
    catch(err){
        console.log(err);
    }
}

const addNewEmpresa = async (req,res) => {
    try{
        res.redirect('/admin-empresas-menu');
    }
    catch(err){
        console.log(err);
    }
}

const editEmpresa = async (req,res) => {
    try{
        res.redirect('/admin-empresas-menu');
    }
    catch(err){
        console.log(err);
    }
}

*/
const addNewUsuario = async(req, res) => {
    try {
        var tipo = req.body.tipo_new_usuario;
        var rut = req.body.code_new_usuario;
        var pass = req.body.password_new_usuario;
        var nombre = req.body.nombre_new_usuario;
        var email = req.body.correo_new_usuario;
        var estado = req.body.estado_new_usuario;

        //solo para mantenedor:
        var rol = req.body.rol_mantenedor_new_usuario;
        var empresa = req.body.empresa_mantenedor_new_usuario;

        //verificación
        var rutExiste = await pool.query('SELECT * FROM usuario WHERE rut = $1', [rut]);
        var emailExiste = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);

        if (rutExiste.rows.length == 0 && emailExiste.rows.length == 0) {
            addToUsuario = await pool.query('INSERT INTO usuario VALUES($1, $2, $3, $4, $5)', [rut, email, pass, nombre, estado]);
            addToTipo = await pool.query('INSERT INTO tipo_usuario VALUES($1, $2)', [rut, tipo]);
            if (tipo == 'Administrador') {
                addadm = await pool.query('INSERT INTO administrador VALUES($1)', [rut]);
            }
            if (tipo == 'Mantenedor') {
                addmtn = await pool.query('INSERT INTO mantenedor VALUES($1, $2, $3)', [rut, rol, empresa]);
            }
            if (tipo == 'Planificador') {
                addadm = await pool.query('INSERT INTO planificador VALUES($1)', [rut]);
            }
            res.redirect('/admin-usuarios-menu');
            console.log("Usuario Insertado")
        } else {
            //res.render('ListaUsers', { restipo: "warning", resultado: "El rut o el email del usuario ya existe.", users: rs, sesion: req.session });
            console.log("Usuario ya existe");
            res.redirect('/admin-usuarios-menu');
        }
    } catch (err) {
        //res.render('Login', { restipo: "warning", resultado: "Sesión cerrada por actividad sin permisos" });
        console.log(err);
    }
}

const editUsuario = async(req, res) => {
    try {
        var tipo = req.body.tipo_editar_usuario;
        var rut = req.body.code_editar_usuario;

        //FALTA EL NUEVO RUT!
        //NO OLVIDAR!!

        var pass = req.body.password_editar_usuario;
        var nombre = req.body.nombre_editar_usuario;
        var email = req.body.correo_editar_usuario;
        var estado = req.body.estado_editar_usuario;

        //solo para mantenedor:
        var rol = req.body.rol_mantenedor_editar_usuario;
        var empresa = req.body.empresa_mantenedor_editar_usuario;

        updateUsuario = await pool.query('UPDATE usuario SET email = $1, password = $2, nombre = $3, activo = $4 where rut = $5', [email, pass, nombre, estado, rut]);

        if (tipo == 'Mantenedor') {
            updateMtn = await pool.query('UPDATE mantenedor SET rol = $2, empresa = $3 where rut = $1', [rut, rol, empresa]);
        }

        res.redirect('/admin-usuarios-menu');
        console.log("Usuario Editado");

    } catch (err) {
        //res.render('Login', { restipo: "warning", resultado: "Sesión cerrada por actividad sin permisos" });
        console.log(err);
    }
}

const addPautasMenu = async(req, res) => {
    try {
        dataPage = (await pool.query('select codigo, nombre from empresa')).rows;
        equipos = (await pool.query('select * from equipo')).rows;
        res.render('admin-pautas-menu-agregar-pauta', { nombre: req.session.nombre, dataPage });
    } catch (err) {
        console.log(err);
    }
}
const adminPautasMenu = async(req, res) => {
    try {
        //pautas = (await pool.query('select * from pauta_mantenimiento')).rows;
        var pautas = [{ datos: 'a' }];
        res.render('admin-pautas-menu', { nombre: req.session.nombre, pautas });
    } catch (err) {
        console.log(err);
    }
}

const adminEmpresaMenu = async(req, res) => {
    try {
        dataPage = (await pool.query('select * from empresa')).rows;
        res.render('admin-empresas-menu', { nombre: req.session.nombre, dataPage });
    } catch (err) {
        console.log(err);
    }
}


const adminUserMenu = async(req, res) => {
    try {
        empresas = (await pool.query('select * from empresa')).rows;
        usuarios = (await pool.query('select u.rut, email, nombre,activo, tipo from usuario u inner join tipo_usuario tu on u.rut = tu.rut')).rows;
        mantenedores = (await pool.query('select u.rut, email, nombre,activo, rol, empresa from usuario u inner join mantenedor m on u.rut = m.rut')).rows;
        res.render('admin-usuarios-menu', { nombre: req.session.nombre, empresas, usuarios, mantenedores });
    } catch (err) {
        console.log(err);
    }
}

const adminEquipoMenu = async(req, res) => {
    try {
        dataPage = (await pool.query('select * from equipo')).rows;
        res.render('admin-equipos-menu', { nombre: req.session.nombre, dataPage });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addNewUsuario,
    editUsuario,
    addPautasMenu,
    adminEmpresaMenu,
    adminEquipoMenu,
    adminPautasMenu,
    adminUserMenu
}