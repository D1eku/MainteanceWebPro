var esAdm = (req, res, next) => {
    if (req.session.logged && req.session.tipo == "adm") {
        return next();
    } else {
        console.log("No autorizado");
        res.redirect('/');
    }
};

var esMtn = (req, res, next) => {
    if (req.session.logged && req.session.tipo == "mtn") {
        return next();
    } else {
        console.log("No autorizado");
        res.redirect('/');
    }
};

var esPln = (req, res, next) => {
    if (req.session.logged && req.session.tipo == "pln") {
        return next();
    } else {
        console.log("No autorizado");
        res.redirect('/');
    }
};

module.exports = {
    esAdm,
    esMtn,
    esPln
}