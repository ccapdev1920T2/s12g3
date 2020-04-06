// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `restaurant` from `../models/userModel.js`
const Users = require('../models/userModel.js');

// import module `User` from `../models/reviewModel.js`
const Review = require('../models/reviewModel.js');

const reviewEditController = {
    postReviewEdit: function(req, res){
       
        //finds currently logged in user
        db.findOne(Users, {isLoggedIn: true}, 'uname', function(result) {
            var update = {
                // left is column/field name; right is value/data
                foodrate: req.body.foodrate,
                servicerate: req.body.servicerate,
                envrate: req.body.envrate,
                reviewText: req.body.reviewText
            }

            console.log("update: " + result);
            console.log("uname: " + result.uname);
            console.log("foodrate: " + result.foodrate);
            console.log("result.reviewText: " + result.reviewText);
            console.log("update.reviewText: " + update.reviewText);

            if(result.reviewText == req.body.reviewText){
                db.updateOne(Review, {uname : result.uname}, update);
                res.redirect('/review');
            }
            else{
                var update = {
                    // left is column/field name; right is value/data
                    foodrate: req.body.foodrate,
                    servicerate: req.body.servicerate,
                    envrate: req.body.envrate,
                    reviewText: req.body.reviewText,
                    errormsg: "Review Text is Required"
                }
                res.render('reviewedit', update );
            }
        })
    },

    // executed when the client sends an HTTP GET request `/useraccountsetting`
    // as defined in `../routes/routes.js`
    getReviewEdit: function (req, res) {


        /*var query = {uname: req.params.username};
        console.log("query: " + query);
        
        var projection = 'foodrate, servicerate, envrate, reviewText';
        
        db.findOne(User, {isLoggedIn: true}, projection, function(result) {
            console.log("result: " + result);
            // if the user exists in the database
            // render the profile page with their details
            if(result != null) {
                // render `../views/user.hbs`
                res.render('reviewedit', result);
            }
            // if the user does not exist in the database
            // render the error page
            else {
                // render `../views/error.hbs`
                res.render('error', {uname: "Guest",errormsg:"No Input in Review"});
            }
        });*/
        res.render('reviewedit');
    },

    


    // executed when the client sends an HTTP GET request `/useraccountsetting`
    // as defined in `../routes/routes.js`
    oldgetReviewEdit: function (req, res) {
        var query = {uname: req.params.username};
        console.log("query: " + query);
        var projection = 'reviewText';
        
        db.findOne(User, query, projection, function(result) {
            console.log("result: " + result);
            // if the user exists in the database
            // render the profile page with their details
            if(result != null) {
                var details = {
                    reviewText: result.reviewText,
                    // ucity: result.email,
                    // utype: result.pword,
                    // ulikes: result.cpword
                };
                // render `../views/user.hbs`
                res.render('reviewedit', details);
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
module.exports = reviewEditController;
