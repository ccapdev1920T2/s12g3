// import module `database` from `../models/db.js`
const db = require('../models/db.js');
// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');
// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const uasController = {
    postUAS: function(req, res){
        var query =  {uname : req.params.username };
        // when submitting forms using HTTP POST method
        // the values in the input fields are stored in the req.body object
        // each <input> element is identified using its `name` attribute
        // Example: the value entered in <input type="text" name="uname">
        // can be retrieved using req.body.uname
        var update = {
            // left is column/field name; right is value/data
            upic : req.body.upic,
            uname : req.body.uname,
            email : req.body.email,
            pword : req.body.npword,
            cpword : req.body.pword,
            gender : req.body.gender
        }
        // calls the function updateOne()
        // defined in the `database` object in `../models/db.js`
        // this function adds a document to collection `users`
        db.updateOne(User, query, update);
        // upon adding a user to the database,
        // defined in `../routes/routes.js`
        // passing values using URL
        res.redirect('/');
    },

    // executed when the client sends an HTTP GET request `/useraccountsetting`
    // as defined in `../routes/routes.js`
    getUAS: function (req, res) {
        var query = {uname: req.params.username};
        console.log("query: " + query);
        var projection = 'upic';
        
        db.findOne(User, {isLoggedIn: true}, projection, function(result) {
            console.log("result: " + result);
            // if the user exists in the database
            // render the profile page with their details
            if(result != null) {
                var details = {
                    upic: result.upic,
                    // ucity: result.email,
                    // utype: result.pword,
                    // ulikes: result.cpword
                };
                // render `../views/user.hbs`
                res.render('useraccountsetting', details);
            }
            // if the user does not exist in the database
            // render the error page
            else {
                // render `../views/error.hbs`
                res.render('error');
            }
        });
    },

    // executed when the client sends an HTTP GET request `/useraccountsetting`
    // as defined in `../routes/routes.js`
    oldgetUAS: function (req, res) {
        var query = {uname: req.params.username};
        console.log("query: " + query);
        var projection = 'upic';
        
        db.findOne(User, query, projection, function(result) {
            console.log("result: " + result);
            // if the user exists in the database
            // render the profile page with their details
            if(result != null) {
                var details = {
                    upic: result.upic,
                    // ucity: result.email,
                    // utype: result.pword,
                    // ulikes: result.cpword
                };
                // render `../views/user.hbs`
                res.render('useraccountsetting', details);
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

// exports the object `signupController` (defined above)
// when another script exports from this file
module.exports = uasController;
