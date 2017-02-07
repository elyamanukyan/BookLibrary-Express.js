const jwt = require('jsonwebtoken');
const conf = require('../config/config');
module.exports= function isAuthenticate(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['authorization'] || req.cookies.authorization
    // console.log(app.get(conf.jwtSecret))

    if (token) {
        console.log(token)
        try {
            // verifies secret and checks exp
            jwt.verify(token, conf.jwtSecret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } catch (err) {
            // res.status(403).json({message: 'Invalid Token'})
            req.flash("info", "Invalid Token. You must be logged in to see this page.");
            res.redirect("/login");
        }
    } else {
        // res.status(500).json({message: 'No token'})
        req.flash("info", "You must be logged in to see this page. No token");
        res.redirect("/login");
    }

}