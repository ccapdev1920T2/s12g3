// import module `database` from `../models/db.js`
const db = require('../models/db.js');
// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');
// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server

// import module `bcrypt`
const bcrypt = require('bcrypt');

const uasController = {

    postUAS: function(req, res){
        //finds currently logged in user
        db.findOne(User, {isLoggedIn: true}, 'upic uname pword ucity utype ulikes', function(result) {

            var upicture = req.body.upic;
            if(upicture == "") 
                upicture = result.upic;

            var oldpass = req.body.oldpword;
            var newpword = req.body.npword;    
            if(newpword == "") 
                newpword = result.pword;

            var fcity = req.body.ucity;
            if((req.body.npword != "" || req.body.cnpword != "") && fcity == "") 
                fcity = result.ucity;

            var ftype = req.body.utype;
            if((req.body.npword != "" || req.body.cnpword != "") && ftype == "") 
                ftype = result.utype;

            var flikes = req.body.ulikes;
            if((req.body.npword != "" || req.body.cnpword != "") && flikes == "") 
                flikes = result.ulikes;

            

            console.log("update: " + result);

            console.log("req.body.oldpword: " + req.body.oldpword);

            bcrypt.compare(req.body.oldpword, result.pword, function(err, equal) {
                var update = {
                    // left is column/field name; right is value/data
                    upic : upicture,
                    uname : req.body.uname,
                    ucity: fcity,
                    utype: ftype,
                    ulikes: flikes,
                    email : req.body.email,
                    pword : newpword,
                    gender : req.body.gender
                }
                            
                if(equal){
                    db.updateOne(User, {uname : result.uname}, update);
                    res.redirect('/');
                }
                else {
                    var update = {
                        // left is column/field name; right is value/data
                        upic : req.body.upic,
                        uname : req.body.uname,
                        ucity : req.body.ucity, 
                        utype : req.body.utype,
                        ulikes : req.body.ulikes,
                        email : req.body.email,
                        pword : req.body.npword,
                        gender : req.body.gender,
                        errormsg: "Old Password Incorrect"
                    }
                    res.render('useraccountsetting', update );
                }
            });

                        
        })
    },

    // executed when the client sends an HTTP GET request `/useraccountsetting`
    // as defined in `../routes/routes.js`
    getUAS: function (req, res) {
        var query = {uname: req.params.username};
        console.log("query: " + query);
        
        var projection = 'upic uname email gender pword ucity type ulikes';
        
        db.findOne(User, {isLoggedIn: true}, projection, function(result) {
            console.log("result: " + result);
            // if the user exists in the database
            // render the profile page with their details
            if(result != null) {
                // render `../views/user.hbs`
                res.render('useraccountsetting', result);
            }
            // if the user does not exist in the database
            // render the error page
            else {
                // render `../views/error.hbs`
                res.render('error', {uname: "Guest",errormsg:"No user is logged in. Login first please."});
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
