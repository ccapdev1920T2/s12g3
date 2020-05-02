const db = require('../models/db.js');

const User = require('../models/userModel.js');

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const logoutController = {

    getLogout:function(req, res) {
        /*
            logs-out the current user
            destroys the current values stored in `req.session`
        */
        req.session.destroy(function(err) {
        if(err) throw err;
        /*
            redirects the client to `/profile` using HTTP GET,
            defined in `../routes/routes.js`
        */
        res.redirect('/');
        });
    }
    
}


module.exports = logoutController;
