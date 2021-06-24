var auth = (req, res, next) => {
    if (req.session.logged) {
        return next();
    } else {
        console.log("No autorizado");
        res.redirect('/');
    }
};

module.exports = {
    auth
}