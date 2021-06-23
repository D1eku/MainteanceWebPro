const { pool } = require('../js/dbconnect');



/*
router.get('/passChange', (req, res) => {
	if (req.session.loggedin) {
		res.render('CambiarContrasena', {restipo: "success", resultado: "", sesion: req.session });
	}
	else {
		req.session.loggedin = false;
		res.render('Login', {restipo: "warning",resultado: "Sesión cerrada por actividad sin permisos"});
		
	}
});


router.post('/passChange', async (req, res) => {
	var rut = req.body.rutUser;
	var oldpass = req.body.oldpwd;
	var newpas = req.body.newpwd;
	var hashpass = await bcrypt.hash(newpas, 10)
	var existeUsuario = await client.query('Select * from usuario where rutpas = $1', [rut]);
	if (existeUsuario.rows[0] == undefined) {
		res.redirect('/');
	}
	else {
		if(await bcrypt.compare(oldpass, existeUsuario.rows[0].contrasena)){
			client.query('Update usuario set contrasena = $2, passw = $3 where rutpas = $1', [rut, hashpass, newpas],
			 (err, resres, fields) => {
				if(err){
					req.session.loggedin = false;
					res.render('Login', {restipo: "danger", resultado: "Ocurrió un problema, y la contraseña no pudo actualizarse!"});
				}
				else{
					req.session.loggedin = false;
					res.render('Login', {restipo: "success", resultado: "La contraseña se ha cambiado con éxito!"});
				}
			 });	
		}
		else{
			
			res.render('CambiarContrasena', {sesion: req.session, restipo: "danger", resultado: "La contraseña antigua no coincide."});
		}
	}


});

router.post('/getpassw', function (req, res) {
	const rut = req.body.rut2;
	const email = req.body.mailrec;

	client.query('SELECT nombrecompleto, passw from usuario where rutpas = $1 and email =$2', [rut, email], function (err, result) {
		if (result.rows[0] == undefined) {
			res.render('Login', {restipo: "danger", resultado: "El rut y/o el correo electrónico están escritos de forma incorrecta."});
		} else {
			var mensaje = 'SantaFeria App \nHola ' + result.rows[0].nombrecompleto + '\n'
			mensaje += 'Desde nuestros servidores recibimos que solicitaste la recuperación de tu contraseña \n'
			mensaje += 'Tu contraseña es: \n'
			mensaje += result.rows[0].passw
			mensaje += '\nSi no fuiste tú quien solicitó este correo, puedes solicitarle a un administrador un cambio de correo \n'
			mensaje += 'Saludos! \n \n - Correo enviado gracias a nodemailer.'
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'pybooleangames@gmail.com',
					pass: 'negropaiton'
				}
			});

			var mailOptions = {
				from: 'pybooleangames@gmail.com',
				to: email,
				subject: 'Santaferia: Recuperación de contraseña',
				text: mensaje
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					res.render('Login', {restipo: "danger", resultado: "El correo registrado es probable que no exista"});
				} else {
					res.render('Login', {restipo: "success", resultado: "Se ha enviado el correo de forma exitosa!"});
				}
			});
		}
	});
});
*/

const logging = async(req, res) => {
    try {
        var user = req.body.rutuser;
        var pass = req.body.passuser;

        admin = await pool.query('select * from usuario u inner join administrador a on u.rut = a.rut where u.rut = $1', [user]);
        if (admin.rows[0] == undefined) {
            console.log('El usuario no es administrador');
        } else {
            if (admin.rows[0].password == pass) {
                req.session.nombre = admin.rows[0].nombre;
                //if (await bcrypt.compare(password, results.rows[0].contrasena)) {
                //if (results.rows[0].estado == "blocked") {
                //res.render('Login', { restipo: "danger", resultado: "El usuario ingresado se encuentra bloqueado actualmente" })
                //} else {
                res.redirect('/administrador');
            } else {
                console.log('Contraseña incorrecta');
            }
        }
        res.end();

        plani = await pool.query('select * from usuario u inner join planificador p on u.rut = p.rut where u.rut = $1', [user]);
        if (plani.rows[0] == undefined) {
            console.log('El usuario no es planificador');
        } else {
            if (plani.rows[0].password == pass) {
                req.session.nombre = plani.rows[0].nombre;
                //if (await bcrypt.compare(password, results.rows[0].contrasena)) {
                //if (results.rows[0].estado == "blocked") {
                //res.render('Login', { restipo: "danger", resultado: "El usuario ingresado se encuentra bloqueado actualmente" })
                //} else {
                res.redirect('/pln');
            } else {
                console.log('Contraseña incorrecta');
            }
        }
        res.end();

        manten = await pool.query('select * from usuario u inner join mantenedor m on u.rut = m.rut where u.rut = $1', [user]);
        if (manten.rows[0] == undefined) {
            console.log('El usuario no es mantenedor');
        } else {
            if (manten.rows[0].password == pass) {
                req.session.nombre = manten.rows[0].nombre;
                //if (await bcrypt.compare(password, results.rows[0].contrasena)) {
                //if (results.rows[0].estado == "blocked") {
                //res.render('Login', { restipo: "danger", resultado: "El usuario ingresado se encuentra bloqueado actualmente" })
                //} else {
                res.redirect('/mtn');
            } else {
                console.log('Contraseña incorrecta');
            }
        }
        res.end();


    } catch (err) {
        console.log(err);
    }


}



module.exports = {
    logging
}