const { pool } = require('../js/dbconnect');
const bcrypt = require("bcrypt");


//Mauro soy el diego quizas te sirva este comentario.
//Al momento de cambiar los items y subitems de una pauta existente
//Te recomiendo eliminar las columnas asociadas a los items e insertar
//Los nuevos subitems/items 

const editExistPautaAdmin = async(req, res) => { //Metele mano a esta parte mauro OwO SOS EL MEJOR TE KIERO
    try {
        let {
            codigoPautaEditada,
            nombre_pauta,
            equipo_pauta,
            tipo_periodicidad_pauta,
            cantidad_periodo_pauta,
            empresa_pauta,
            clase_pauta,
            version_pauta,
            itemsInfo
        } = req.body
        let new_ver = (parseFloat(version_pauta) + 0.1).toString();

        var fecha = new Date();
        var mes = fecha.getMonth();
        mes = parseInt(mes) + 1;
        if (mes < 10) {
            mes = '0' + mes;
        }
        var fecha_pauta = fecha.getFullYear() + '-' + mes + '-' + fecha.getDate();
        console.log(codigo_pauta + "; " + version_pauta + "; " + fecha_pauta);

        /*
        let dropItemsSubItems = (await pool.query('DELETE FROM subitem s inner join item i on s.codigo_item = i.codigo WHERE i.codigo_pauta = $1; DELETE FROM item WHERE codigo_pauta = $1', [codigoPautaEditada]));
        let cantSubItems = (await pool.query('SELECT * from subitem')).rows.length;
        let cantItems = (await pool.query('SELECT * from item')).rows.length;


        updatePauta = await pool.query('UPDATE pauta_mantenimiento SET nombre = $2, version = $3, cantidad_periodo = $4, tipo_periodo = $5, clase = $6, equipo = $7, empresa = $8)', [codigoPautaEditada, nombre_pauta, version_pauta, cantidad_periodo_pauta, tipo_periodicidad_pauta, clase_pauta,
             equipo_pauta, empresa_pauta
        ]);

        var itemsJSON = eval(itemsInfo);
        for (var i = 0; i < itemsJSON.length; i++) {
            var obj = itemsJSON[i];
            codItem = ++cantItems;
            addItem = await pool.query("INSERT INTO item values($1, $2, $3)", [codItem, obj.item, codigo_pauta]);
            //console.log(obj);
            console.log(codItem);
            for (var j = 0; j < obj.cantSubItem; j++) {
                codSubItem = ++cantSubItems;
                console.log(codSubItem);
                addSubItem = await pool.query("INSERT INTO subitem values($1, $2, $3)", [codSubItem, obj.subitems[j], codItem]);
                //console.log(obj.subitems[j]);
            }
        }
        console.log("Pauta Editada");
        res.redirect('/admin-pautas-menu');
        */
    } catch (err) {
        console.log(err);
    }
}

const addNewPauta = async(req, res) => {
    try {
        //Mira la consola 
        console.log(req.body);
        let {
            nombre_pauta,
            equipo_pauta,
            tipo_periodicidad_pauta,
            cantidad_periodo_pauta,
            empresa_pauta,
            clase_pauta,
            itemsInfo
        } = req.body
            //codigo (podría generarlo automaticamente??) --> Si, generalo automatico.
        let codigo_pauta = Math.floor(Math.random() * 100000);
        let version_pauta = "1.0";
        var fecha = new Date();
        var mes = fecha.getMonth();
        mes = parseInt(mes) + 1
        if (mes < 10) {
            mes = '0' + mes;
        }
        var fecha_pauta = fecha.getFullYear() + '-' + mes + '-' + fecha.getDate();

        console.log(codigo_pauta + "; " + version_pauta + "; " + fecha_pauta);

        let pautaExiste = await pool.query('SELECT * FROM pauta_mantenimiento WHERE codigo = $1', [codigo_pauta]);
        let cantItems = (await pool.query('SELECT * from item')).rows.length;
        let cantSubItems = (await pool.query('SELECT * from subitem')).rows.length;

        if (pautaExiste.rows.length == 0) {
            addToPauta = await pool.query('INSERT INTO pauta_mantenimiento VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [codigo_pauta, nombre_pauta, version_pauta, cantidad_periodo_pauta, tipo_periodicidad_pauta, "Activa", clase_pauta,
                fecha_pauta, equipo_pauta, empresa_pauta
            ]);

            var itemsJSON = eval(itemsInfo);
            for (var i = 0; i < itemsJSON.length; i++) {
                var obj = itemsJSON[i];
                codItem = ++cantItems;
                addItem = await pool.query("INSERT INTO item values($1, $2, $3)", [codItem, obj.item, codigo_pauta]);
                //console.log(obj);
                console.log(codItem);
                for (var j = 0; j < obj.cantSubItem; j++) {
                    codSubItem = ++cantSubItems;
                    console.log(codSubItem);
                    addSubItem = await pool.query("INSERT INTO subitem values($1, $2, $3)", [codSubItem, obj.subitems[j], codItem]);
                    //console.log(obj.subitems[j]);
                }
            }
            console.log("Pauta Insertada");
            res.redirect('/admin-pautas-menu');

        } else {
            res.redirect('/admin-pautas-menu');
        }

    } catch (err) {
        console.log(err);
    }

}

const editPauta = async(req, res) => {
    try {
        //Cambiar en el boton editar de POST A GET 

        "select * from pauta_mantenimiento pm inner join empresa e on pm.empresa = e.codigo inner join item i on i.codigo_pauta = pm.codigo inner join subitem si  on si.codigo_item = i.codigo where pm.codigo = 1"
        //editar aun no funciona creo??, Si aun no funciona XD
        //Revisa el req.body porque hay mas cosas que insertar, los items uwu 
        //Mira la consola 
        //console.log("En Edit Pauta");
        //console.log(req.body);
        let codigoPautaEditar = req.body.codeToEditPauta;
        console.log("POST QUERY")
            //console.log(codigoPautaEditar)
        let pauta = (await pool.query(
            "select pm.codigo codigo_pauta, pm.nombre nombre_pauta, pm.tipo_periodo tperiodo, pm.cantidad_periodo cperiodo, pm.clase clase_pauta, pm.estado estado_pauta, pm.version version_pauta, pm.fecha_creacion, e.codigo codigo_empresa_pauta, e.nombre nombre_empresa_pauta, e.activa estado_empresa_pauta, eq.codigo codigo_equipo_pauta, eq.nombre nombre_equipo_pauta, eq.activo estado_equipo_pauta from pauta_mantenimiento pm inner join empresa e on pm.empresa = e.codigo inner join equipo eq on pm.equipo = eq.codigo where pm.codigo =$1", [parseInt(codigoPautaEditar)]
        )).rows;
        pauta = pauta[0];
        const empresas = (await pool.query('select codigo, nombre from empresa')).rows; //Empresas en general
        const equipos = (await pool.query('select * from equipo')).rows; //Equipos en general
        //const itemSubitems = (await pool.query('select * from item i where i.codigo_pauta =$1',[parseInt(codigoPautaEditar)])).rows;//Subitems de la pauta
        const items = (await pool.query('select * from item i where i.codigo_pauta =$1', [parseInt(codigoPautaEditar)])).rows;
        const subitems = (await pool.query('select i.codigo codigo_item, si.codigo codigo_subitem, si.nombre subitem from item i inner join subitem si on i.codigo = si.codigo_item where i.codigo_pauta =$1', [parseInt(codigoPautaEditar)])).rows;
        console.log("items:", items)
        console.log("subitem:", subitems)

        let dataPautaItems = []
        console.log("Data Pauta Items antes de agregar los items \n", dataPautaItems)
        for (let i = 0; i < items.length; i++) { //Por cada item.
            dataPautaItems[i] = {
                'item': items[i].nombre,
                'cantSubItem': 0,
                'subitems': []
            }
            for (let j = 0; j < subitems.length; j++) { //Por cada subitem.
                //console.log("================================================ \n")
                //console.log("items[i] = \n", items[i])
                //console.log("subitems[j] = \n", subitems[j])
                //console.log("items[i].codigo == subitems[j].codigo_item --> ", items[i].codigo == subitems[j].codigo_item)
                //console.log("================================================ \n")
                if (items[i].codigo == subitems[j].codigo_item) {
                    console.log(j)
                    dataPautaItems[i].subitems[dataPautaItems[i].cantSubItem] = subitems[j].subitem;
                    dataPautaItems[i].cantSubItem += 1;
                }
            }
        }
        //console.log("Data Pauta Items despues de agregado los items \n", dataPautaItems)

        //console.log("PAUTA")
        //console.log(pauta)
        //console.log("itemSubitems")
        //console.log(itemSubitems)
        //console.log("empresas")
        //console.log(empresas)
        //console.log("equipos")
        //console.log(equipos)

        //let {nombre_pauta, equipo_pauta, tipo_periodicidad_pauta, cantidad_periodo_pauta, empresa_pauta, clase_pauta} = req.body
        //codigo (podría generarlo automaticamente??), el codigo no se edita, Se mantiene en el tiempo.
        //version (comienza con 1.0?) --> Si editas una pauta, aumenta en 1, entonces 1.0 --> 1.1
        //fechacreacion --> no es necesario modificar esto jeje se mantiene la fecha de creacion de la vez que se creo 
        //Si tienes dudas sobre como guardamos las pautas mejor nos juntamos y hablamos no mas owo 

        res.render('admin-pautas-menu-edit-pauta', { pauta, dataPautaItems, items, subitems, empresas, equipos });
    } catch (err) {
        console.log(err);
    }

}

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
            hashpass = await bcrypt.hash(pass, 10);

            console.log(req.body);
            addToUsuario = await pool.query('INSERT INTO usuario VALUES($1, $2, $3, $4, $5)', [rut, email, hashpass, nombre, estado]);

            //addToUsuario = await pool.query('INSERT INTO usuario VALUES($1, $2, $3, $4, $5)', [rut, email, pass, nombre, estado]);
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

        hashpass = await bcrypt.hash(pass, 10);

        updateUsuario = await pool.query('UPDATE usuario SET email = $1, password = $2, nombre = $3, activo = $4 where rut = $5', [email, hashpass, nombre, estado, rut]);

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

const addNewEmpresa = async(req, res) => {
    try {
        let { code_new_empresa, name_new_empresa, estado_activacion_new_empresa } = req.body;
        console.log(req.body);

        var codExiste = (await pool.query('SELECT * FROM empresa WHERE codigo = $1', [code_new_empresa])).rows.length;

        if (codExiste < 1) {
            addToEmpresas = await pool.query('INSERT INTO empresa VALUES($1, $2, $3)', [code_new_empresa, name_new_empresa, estado_activacion_new_empresa]);
            res.redirect('/admin-empresas-menu');
        } else {
            console.log("Ya existe una empresa con este código");
            res.redirect('/admin-empresas-menu');
        }

    } catch (err) {
        console.log(err);
    }
}

const editEmpresa = async(req, res) => {
    try {
        let { code_edit_empresa, name_edit_empresa, estado_activacion_edit_empresa } = req.body;
        console.log(req.body);

        updateEmpresa = await pool.query('UPDATE empresa SET nombre = $2, activa = $3 where codigo = $1', [code_edit_empresa, name_edit_empresa, estado_activacion_edit_empresa]);
        res.redirect('/admin-empresas-menu');

    } catch (err) {
        console.log(err);
    }
}

const addNewEquipo = async(req, res) => {
    try {
        let { code_new_equipo, nombre_new_equipo, clase_new_equipo, desc_new_equipo, ubicacion_new_equipo } = req.body;

        var codExiste = (await pool.query('SELECT * FROM equipo WHERE codigo = $1', [code_new_equipo])).rows.length;

        if (codExiste < 1) {
            addToEquipo = await pool.query('INSERT INTO equipo VALUES($1, $2, $3, $4, $5)', [code_new_equipo, nombre_new_equipo, clase_new_equipo, desc_new_equipo, ubicacion_new_equipo]);
            res.redirect('/admin-equipos-menu');
        } else {
            console.log("Ya existe un equipo con este código");
            res.redirect('/admin-equipos-menu');
        }

        res.redirect('/admin-equipos-menu');
    } catch (err) {
        console.log(err);
    }
}

const editEquipo = async(req, res) => {
    try {
        let { code_edit_equipo, name_edit_equipo, clase_edit_equipo, descripcion_edit_equipo, edit_estado_equipo, ubicacion_edit_equipo } = req.body;
        console.log(req.body);

        updateEquipo = await pool.query('UPDATE equipo SET nombre = $2, clase = $3, descripcion = $4, ubicacion = $5 where codigo = $1', [code_edit_equipo, name_edit_equipo, clase_edit_equipo, descripcion_edit_equipo, ubicacion_edit_equipo]);
        res.redirect('/admin-equipos-menu');

    } catch (err) {
        console.log(err);
    }
}

const addPautasMenu = async(req, res) => {
    try {
        empresas = (await pool.query('select codigo, nombre from empresa')).rows;
        equipos = (await pool.query('select * from equipo')).rows;
        res.render('admin-pautas-menu-agregar-pauta', { nombre: req.session.nombre, empresas, equipos });
    } catch (err) {
        console.log(err);
    }
}

const adminPautasMenu = async(req, res) => {
    try {
        const pautas = (await pool.query("select pm.codigo, pm.nombre, pm.clase, pm.fecha_creacion, e.nombre nom_empresa, e.codigo cod_empresa, pm.equipo, pm.version from pauta_mantenimiento pm inner join empresa e on pm.empresa = e.codigo")).rows;
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
        equipos = (await pool.query('select * from equipo')).rows;
        res.render('admin-equipos-menu', { nombre: req.session.nombre, equipos });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addNewUsuario,
    editUsuario,
    addNewEmpresa,
    editEmpresa,
    addNewEquipo,
    editEquipo,
    addNewPauta,
    editPauta,
    editExistPautaAdmin,
    addPautasMenu,
    adminEmpresaMenu,
    adminEquipoMenu,
    adminPautasMenu,
    adminUserMenu
}