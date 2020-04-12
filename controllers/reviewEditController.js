// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `restaurant` from `../models/userModel.js`
const Users = require('../models/userModel.js');

// import module `User` from `../models/reviewModel.js`
const Review = require('../models/reviewModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

const reviewEditController = {
    postReviewEdit: function(req, res){

        //finds currently logged in user
        db.findOne(Users, {isLoggedIn: true}, 'uname', function(result) {

            db.findOne(Review, {_id: ObjectId(req.body.reviewID)}, 'reviewText', function(reviewResult){

                if(reviewResult.reviewText != req.body.reviewText){

                    var update = {
                        // left is column/field name; right is value/data
                        foodrate: req.body.foodrate,
                        servicerate: req.body.servicerate,
                        envrate: req.body.envrate,
                        reviewText: req.body.reviewText
                    }

                    console.log("enter ==");
                    db.updateOne(Review, {_id : ObjectId(reviewResult._id)}, update);
                    // window.close();
                    // res.redirect('/restaurant/'+req.body.reviewID);
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
        })
    },

    // executed when the client sends an HTTP GET request `/useraccountsetting`
    // as defined in `../routes/routes.js`
    getReviewEdit: function (req, res) {


        var id = req.params.reviewID;
        res.render('reviewedit', {reviewID: id});
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
