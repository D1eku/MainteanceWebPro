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
        const calendarioMant = (await pool.query('select c.codigo codigo_calendario, pm.nombre nombre_pauta, pm.codigo codigo_pauta, c.fecha_estimada fecha_realizar, e.ubicacion ubicacion from calendario c inner join pauta_mantenimiento pm on c.codigo_pauta = pm.codigo inner join equipo e on e.codigo = c.codigo_equipo where c.rut_mantenedor = $1', [req.session.rut])).rows
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
    try {
        console.log(req.body)
        const codigoPautaBuscar = req.body.pautaCodigo.split("-")[1]
        const codigoCalendarioBuscar = req.body.pautaCodigo.split('-')[0]
        console.log("Funciona esto ? ")
        const pautaInfo = (await pool.query("select  p.codigo codigo_mantencion, p.nombre nombre_pauta, c.rut_mantenedor rut_tecnico, u.nombre nombre_tecnico, e.codigo codigo_equipo, e.nombre nombre_equipo, c.fecha_estimada fecha_calendarizada from pauta_mantenimiento p  inner join equipo e on p.equipo = e.codigo inner join empresa em  on p.empresa = em.codigo inner join calendario c on p.codigo = c.codigo_pauta inner join mantenedor mant on c.rut_mantenedor = mant.rut inner join usuario u on u.rut = mant.rut where p.codigo = $1 and c.codigo = $2", [codigoPautaBuscar, codigoCalendarioBuscar])).rows;
        console.log("Query 1 ejecutada :D ")
        const itemsPauta = (await pool.query("select i.codigo codigo_item, i.nombre item, si.codigo codigo_subitem, si.nombre subitem, i.codigo_pauta codigo_pauta from item i inner join subitem si on i.codigo = si.codigo_item  where i.codigo_pauta = $1 ", [codigoPautaBuscar])).rows
        console.log(pautaInfo)
        res.render('man-ficha', { pautaInfo, itemsPauta });
    } catch (err) {
        console.log(err);
    }
}

const uploadData = async(req, res) => {
    try {
        console.log(req.body)
        let { codigoPauta, nombrePauta, nombreTecnicoPauta, turnoPauta, tipoActividadPauta, nombreEquipoPauta, codigoEquipoPauta, fechaCalendarizadaPauta, fechaRealizadaPauta, diagnosticoPauta, supervisorEmpresaPauta, supervisorMandantePauta, codigo_subitem, estadoRecibidoSubitem, estadoEntregadoSubitem, observacionIPauta, obsGeneralPauta } = req.body;
        let codigo_ficha = Math.floor(Math.random() * 100000);

        var strFechaCal = fechaCalendarizadaPauta.split('/');
        var strfechaRea = fechaRealizadaPauta.split('/');
        var fEstimada = new Date(strFechaCal[2], strFechaCal[1] - 1, strFechaCal[0]);
        var fRealizada = new Date(strfechaRea[2], strfechaRea[1] - 1, strfechaRea[0]);

        var codigoExiste = await pool.query('SELECT * FROM ficha_atencion WHERE codigo = $1', [codigo_ficha]);

        if (codigoExiste.rows.length == 0) {

            addAtencion = await pool.query('INSERT INTO ficha_atencion VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [codigo_ficha, nombrePauta, diagnosticoPauta, turnoPauta, fEstimada, fRealizada, nombreTecnicoPauta, supervisorEmpresaPauta, tipoActividadPauta, obsGeneralPauta, supervisorMandantePauta, codigoPauta]);
            for (var i = 0; i < codigo_subitem.length; i++) {

                itemactual = (await pool.query('SELECT codigo_item FROM subitem where codigo = $1', [codigo_subitem[i]])).rows[0].codigo_item;
                let codResp = Math.floor(Math.random() * 10000);
                //console.log("CodSubItem: " + codigo_subitem[i] + "; codItem: " + itemactual + "; Observ: " + observacionIPauta[i] + "; EstRecib: " + estadoRecibidoSubitem[i] + "; EstEntreg: " + estadoEntregadoSubitem[i] + "\n");
                addRespItem = await pool.query('INSERT INTO respuesta_item VALUES($1, $2, $3, $4, $5, $6, $7)', [codResp, itemactual, codigo_subitem[i], codigo_ficha, observacionIPauta[i], estadoRecibidoSubitem[i], estadoEntregadoSubitem[i]]);
            }
            res.redirect('/mtn')
        } else {
            console.log("codigo ya existe");
            res.redirect('/mtn')
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    mantenedorMenu,
    getFichaFill,
    uploadData
}