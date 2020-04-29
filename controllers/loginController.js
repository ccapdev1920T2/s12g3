const db = require('../models/db.js');

// import module `bcrypt`
const bcrypt = require('bcrypt');

const User = require('../models/userModel.js');

const loginController = {

    getLogin: function(req, res) {
        res.render('login');
    },

    postLogin: function(req, res) {

        var projection = 'uname';
        // checks if someone is currently logged in
        db.findOne(User, {isLoggedIn: true}, projection, function(isLoggedInResult) {
            
            // console.log(isLoggedInResult);

            //if no one is currently logged in
            if(isLoggedInResult == null){

                var projection = 'uname pword';
                var uname = req.body.uname;
                var pword = req.body.pword;

                
                User.findOne({uname: uname}, projection, function(err, results) {
                    if(results != null){

                        bcrypt.compare(pword, results.pword, function(err, equal) {

                            
                            if(equal){
                                //if tama credentials, it will set that user's isLoggedIn to true
                                db.updateOne(User, {uname: uname}, {isLoggedIn: true});
                                res.render('loginsuccess',results);
            
                            }
                            else {
                                res.render('login', {uname: "Guest", InvalidCredentialsError: "Invalid Credentials!"});
                            }
                        });
                    }

                });
            }

        });

    },
   
    oldpostLogin: function(req, res) {

        var projection = 'uname';
        // checks if someone is currently logged in
        db.findOne(User, {isLoggedIn: true}, projection, function(isLoggedInResult) {
            
            console.log(isLoggedInResult);
            //if no one is currently logged in
            if(isLoggedInResult == null){
                var projection = 'uname pword';
                var uname = req.body.uname;
                var pword = req.body.pword;

                User.findOne({uname: uname}, projection, function(err, results) {
                    var cpword = results.pword;
                    if (pword != cpword){
                        res.render('error');
                    }
                    else {
                        if (err){
                            console.log(err);
                            return res.status(500).send();
                        }
                        if (!User){
                            res.render('error');
                        }

                        db.updateOne(User, {uname: uname}, {isLoggedIn: true});
                        res.redirect('/');
                    }
                })
            }
            else{ //if SOMeONE is CURRENTLY logged in
                var errormsg = "Someone is still logged in. Log out first pls";
                res.render('error', {errormsg: errormsg});
            }
        });
    }

}

module.exports = loginController;