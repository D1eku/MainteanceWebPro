const { pool } = require('../js/dbconnect');
const bcrypt = require("bcrypt");


const main = (req, res) => {
    req.session.logged = false;
    res.render('index');
}

const logging = async(req, res) => {
    try {
        var user = req.body.rutuser;
        var pass = req.body.passuser;

        admin = (await pool.query('select * from usuario u inner join administrador a on u.rut = a.rut where u.rut = $1', [user])).rows[0];
        if (admin == undefined) {
            console.log('El usuario no es administrador');
        } else {
            req.session.rut = admin.rut;
            req.session.nombre = admin.nombre;
            req.session.tipo = "adm";
            bcrypt.compare(pass, admin.password, (err, same) => {
                if (err) {
                    console.log(err);
                }
                if (same) {
                    req.session.logged = true;
                    return res.redirect('/administrador');
                } else {
                    console.log('Contraseña incorrecta');
                }
            });
        }
        plani = (await pool.query('select * from usuario u inner join planificador p on u.rut = p.rut where u.rut = $1', [user])).rows[0];
        if (plani == undefined) {
            console.log('El usuario no es planificador');
        } else {
            req.session.rut = plani.rut;
            req.session.nombre = plani.nombre;
            req.session.tipo = "pln";
            bcrypt.compare(pass, plani.password, (err, same) => {
                if (err) {
                    console.log(err);
                }
                if (same) {
                    req.session.logged = true;
                    return res.redirect('/pln');
                } else {
                    console.log('Contraseña incorrecta');
                }
            });
        }

        manten = (await pool.query('select * from usuario u inner join mantenedor m on u.rut = m.rut where u.rut = $1', [user])).rows[0];
        if (manten == undefined) {
            console.log('El usuario no es mantenedor');
        } else {
            req.session.rut = manten.rut;
            req.session.nombre = manten.nombre;
            req.session.tipo = "mtn";
            bcrypt.compare(pass, manten.password, (err, same) => {
                if (err) {
                    console.log(err);
                }
                if (same) {
                    req.session.logged = true;
                    return res.redirect('/mtn');
                } else {
                    console.log('Contraseña incorrecta');
                }
            });
        }
    } catch (err) {
        console.log(err);
    }


}

module.exports = {
    main,
    logging
}