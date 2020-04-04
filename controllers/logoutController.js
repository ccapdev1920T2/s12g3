const db = require('../models/db.js');

const User = require('../models/userModel.js');

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const logoutController = {

    getLogout:function(req, res) {

        db.updateOne(User, {isLoggedIn: true}, {isLoggedIn: false});

        
        res.render('logout', {uname: "Guest"});

    }


}


module.exports = logoutController;
