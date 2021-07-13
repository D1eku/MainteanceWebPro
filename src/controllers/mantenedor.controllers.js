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

addFichaAtencion
modificarAtencion
desplegarFichaAtencion
revisarPosGPS

*/

const mantenedorMenu = async(req, res) => {
    try {
        //Mira la consola 
        //console.log(req.body);
        // Por ahora las preubas se realizaran sobre dieku
        // Por lo tanto 
        const mantData = (await pool.query('select * from mantenedor m inner join empresa e on m.empresa = e.codigo where rut = "dieku"')).rows
        res.render('mantenedor', {mantData})
    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    mantenedorMenu
}