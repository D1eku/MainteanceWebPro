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
        /*const mantData = {
            'rut': 'dieku',
            'rol': 'dieku',
            'nombre_usuario': 'dieku',
            'email': 'dieku@dieku.cl',
            'empresa': '001',
            'nombre_empresa': 'Chait-Enterprise',
            'activa': true
        }*/
        const mantData = (await pool.query("select m.rut, m.rol, u.nombre as nombre_usuario, u.email, e.codigo, e.nombre as nombre_empresa, e.activa from usuario u, mantenedor m inner join empresa e on m.empresa = e.codigo where m.rut = u.rut and m.rut = $1", [req.session.rut])).rows[0];
        const pautas_mant = (await pool.query("select p.codigo as codigo_pauta, p.nombre as nombre_pauta, e.ubicacion as ubicacion, p.estado from pauta_mantenimiento p inner join equipo e on e.codigo = p.equipo")).rows;

        /*const pautas_mant = [ 
            {
                'cod_pauta' : '0001',
                'nombre_pauta': 'Mantencion Motocierras',
                'fecha_realizar' : '01/08/2021',
                'Ubicacion': 'La Serena ? O GPS ',
                'Estado' : 'Por Realizar'
            }
    
        ]*/
        console.log(pautas_mant);
        res.render('mantenedor', { mantData, pautas_mant })
    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    mantenedorMenu
}