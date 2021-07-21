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
        res.render('planificador', { nombre: req.session.nombre, pautas, calendarios });
    } catch (err) {
        console.log(err);
    }

}

const sendAssignDatePauta = async(req, res) => {
    try {
        //select fa.codigo_pauta, fa.fecha_estimada, pm.codigo_equipo, pm.rutMantenedor from equipo
        console.log(req.body)
        res.redirect("/pln")
    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    planifMenu,
    sendAssignDatePauta
}