const { pool } = require('../js/dbconnect');

const getUsers = async(req, res) => {
    const response = await pool.query('SELECT * FROM usuario');
    console.log(response.rows);
    res.send('users');
}

/*
const addUser = async (req, res) => {
	try {
		var rut = req.body.rut;
		var pass = req.body.pwd;
		var hashpass = await bcrypt.hash(pass, 10)
		var nombre = req.body.name + " " + req.body.lname;
		var tipo = req.body.seleccion;
		var email = req.body.email;
		var fono = req.body.telefono;

		var rutExiste = await pool.query('SELECT * FROM public.usuario WHERE rut = $1', [rut]);
		var emailExiste = await pool.query('SELECT * FROM public.usuario WHERE email = $1', [email]);

		if (rutExiste.rows.length == 0 && emailExiste.rows.length == 0) {
			pool.query("INSERT INTO public.usuario VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
				[rut, hashpass, nombre, tipo, email, fono, "unblocked", pass], async function (err, resultsq2, fields) {
					var sql = "SELECT * FROM usuario"
					var rs = await client.query(sql);
					if (err) {
						res.render('ListaUsers', { restipo: "danger", resultado: "Error registrando al usuario", users: rs, sesion: req.session });
					}
					else {
						res.render('ListaUsers', { restipo: "success", resultado: "El usuario se ha registrado con éxito.", users: rs, sesion: req.session });
					}
				});

		}
		else {
			res.render('ListaUsers', { restipo: "warning", resultado: "El rut o el email del usuario ya existe.", users: rs, sesion: req.session });
		}
	}
	catch{
		res.render('Login', { restipo: "warning", resultado: "Sesión cerrada por actividad sin permisos" });
	}
});
*/

module.exports = {
    getUsers
}