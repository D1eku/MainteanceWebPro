const { Cookie } = require('express-session');
const { as } = require('pg-promise');
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
        const calendarioMant = (await pool.query('select c.codigo codigo_calendario, pm.nombre nombre_pauta, pm.codigo codigo_pauta, c.fecha_estimada fecha_realizar, e.ubicacion ubicacion from calendario c inner join pauta_mantenimiento pm on c.codigo_pauta = pm.codigo inner join equipo e on e.codigo = c.codigo_equipo where c.rut_mantenedor = $1', [req.session.rut] )).rows
        const mantData = (await pool.query("select m.rut, m.rol, u.nombre as nombre_usuario, u.email, e.codigo, e.nombre as nombre_empresa, e.activa from usuario u, mantenedor m inner join empresa e on m.empresa = e.codigo where m.rut = u.rut and m.rut = $1", [req.session.rut])).rows[0];
        //const pautas_mant = (await pool.query("select p.codigo as codigo_pauta, p.nombre as nombre_pauta, e.ubicacion as ubicacion, p.estado from pauta_mantenimiento p inner join equipo e on e.codigo = p.equipo")).rows;

        console.log(calendarioMant)


        //console.log(pautas_mant);
        res.render('mantenedor', { mantData, calendarioMant })
    } catch (err) {
        console.log(err);
    }

}

const getFichaFill = async(req, res) => {
    console.log(req.body)
    const codigoPautaBuscar = req.body.pautaCodigo.split("-")[1]
    const codigoCalendarioBuscar = req.body.pautaCodigo.split('-')[0]
    console.log("Funciona esto ? ")
    const pautaInfo = (await pool.query("select  p.codigo codigo_mantencion, p.nombre nombre_pauta, c.rut_mantenedor rut_tecnico, u.nombre nombre_tecnico, e.codigo codigo_equipo, e.nombre nombre_equipo, c.fecha_estimada fecha_calendarizada from pauta_mantenimiento p  inner join equipo e on p.equipo = e.codigo inner join empresa em  on p.empresa = em.codigo inner join calendario c on p.codigo = c.codigo_pauta inner join mantenedor mant on c.rut_mantenedor = mant.rut inner join usuario u on u.rut = mant.rut where p.codigo = $1 and c.codigo = $2",[codigoPautaBuscar, codigoCalendarioBuscar])).rows;
    console.log("Query 1 ejecutada :D ")
    const itemsPauta = (await pool.query("select i.codigo codigo_item, i.nombre item, si.codigo codigo_subitem, si.nombre subitem, i.codigo_pauta codigo_pauta from item i inner join subitem si on i.codigo = si.codigo_item  where i.codigo_pauta = $1 ",[codigoPautaBuscar])).rows
    console.log(pautaInfo)
    res.render('man-ficha', { pautaInfo, itemsPauta})
}

const uploadData = async(req, res) => {
    console.log(req.body)

    res.redirect('/mtn')
}

module.exports = {
    mantenedorMenu,
    getFichaFill,
    uploadData
}