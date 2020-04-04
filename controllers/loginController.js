const db = require('../models/db.js');

const User = require('../models/userModel.js');

const loginController = {

    getLogin: function(req, res){
        res.render('login');
    },

    postLogin: function(req, res){
        var uname = req.body.uname;
        var pword = req.body.pword;

        User.findOne({uname:uname}, function(err, results){
            var cpword = results.pword;

            if(pword != cpword){
                res.render('error');
            }
            else{
                if(err){
                    console.log(err);
                    return res.status(500).send();
                }
                if(!User){
                    res.render('error');
                }

                res.redirect('/'+uname);
            }
        })

    }




}