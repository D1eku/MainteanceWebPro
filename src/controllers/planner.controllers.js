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

modificarFechaPauta
modificarPeriodicidad

*/

const planifMenu = async(req, res) => {
    try {
        //select fa.codigo_pauta, fa.fecha_estimada, pm.codigo_equipo, pm.rutMantenedor from equipo
        const pautas = (await pool.query("select pm.codigo, pm.nombre, pm.clase, pm.fecha_creacion, e.nombre nom_empresa, e.codigo cod_empresa, pm.equipo, pm.version, pm.estado from pauta_mantenimiento pm inner join empresa e on pm.empresa = e.codigo")).rows;
        const calendarios = (await pool.query("select * from calendario")).rows
        const mantenedores = (await pool.query("select m.rut, u.nombre, m.rol, m.empresa from mantenedor  m  inner join usuario u on m.rut = u.rut where u.activo = 'Activado' ")).rows
        console.log(mantenedores)
        res.render('planificador', { nombre: req.session.nombre, pautas, calendarios, mantenedores });
    } catch (err) {
        console.log(err);
    }

}

const sendAssignDatePauta = async(req, res) => {
    try {
        //select fa.codigo_pauta, fa.fecha_estimada, pm.codigo_equipo, pm.rutMantenedor from equipo
        let {
            codigo_pauta,
            name_pauta, //rutMantenedorXD,
            fecha_estimada_pauta
        } = req.body;

        let codigo_calendario = Math.floor(Math.random() * 100000);
        var codExiste = (await pool.query('SELECT * FROM calendario WHERE codigo = $1', [codigo_calendario])).rows.length;
        var strfechaEst = fecha_estimada_pauta.split('-');
        var fEstimada = new Date(strfechaEst[0], strfechaEst[1] - 1, strfechaEst[2]);

        console.log("Tipo fecha: " + fEstimada + "; Tipo String: " + fecha_estimada_pauta + "\n")


        if (codExiste < 1) {
            const pautaActual = (await pool.query("select * from pauta_mantenimiento where codigo = $1", [codigo_pauta])).rows[0];
            //const insertCalendario = await pool.query('insert into calendario values($1, $2, $3, $4, $5, $6', [codigo_calendario, pautaActual.equipo, "RutMantenedor", fEstimada, codigo_pauta, req.session.rut]);
            res.redirect("/pln")
        } else {
            console.log("Ya existe un calendario con este código");
            res.redirect("/pln")
        }




    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    planifMenu,
    sendAssignDatePauta
}