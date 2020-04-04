
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const userController = {

    
    getUserByUN: function (req, res) {
       // query where `uname` is equal to URL parameter `username`
       var query = {uname: req.params.username};
        console.log("query: " + query);
        // fields to be returned
        var projection = 'uname email pword cpword';

        // calls the function findOne()
        // defined in the `database` object in `../models/db.js`
        // this function searches the collection `users`
        // based on the value set in object `query`
        // the third parameter is a string containing the fields to be returned
        // the fourth parameter is a callback function
        // this called when the database returns a value
        // saved in variable `result`
        db.findOne(User, query, projection, function(result) {

            console.log("result: " + result);
            // if the user exists in the database
            // render the profile page with their details
            if(result != null) {
                var details = {
                    uname: result.uname,
                    ucity: result.email,
                    utype: result.pword,
                    ulikes: result.cpword
                };
                
                // render `../views/user.hbs`
                res.render('user', details);
            }
            // if the user does not exist in the database
            // render the error page
            else {
                // render `../views/error.hbs`
                res.render('error');
            }
        });

    }
}

// exports the object `userController` (defined above)
// when another script exports from this file
module.exports = userController;
