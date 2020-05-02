// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `restaurant` from `../models/userModel.js`
const Users = require('../models/userModel.js');

// import module `User` from `../models/reviewModel.js`
const Review = require('../models/reviewModel.js');

// import module `restaurant` from `../models/restaurantModel.js`
const Restaurant = require('../models/restaurantModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

const reviewEditController = {
    postReviewEdit: function(req, res){

        //finds currently logged in user
        db.findOne(Users, {isLoggedIn: true}, 'uname', function(result) {


            db.findOne(Review, {_id: ObjectId(req.body.reviewID)}, 'reviewText foodrate servicerate envrate restaurantID', function(reviewResult){


                console.log("req.body.reviewID: " + req.body.reviewID);

                if(reviewResult.reviewText != req.body.reviewText){

                    var rOverallRate = (Number(req.body.foodrate) + Number(req.body.servicerate) + Number( req.body.envrate) ) /3;
                    rOverallRate = rOverallRate.toFixed(1);

                    var update = {
                        // left is column/field name; right is value/data
                        foodrate: req.body.foodrate,
                        servicerate: req.body.servicerate,
                        envrate: req.body.envrate,
                        rOverallRate: rOverallRate,
                        reviewText: req.body.reviewText
                    }

                    console.log("enter ==");
                    db.updateOne(Review, {_id : ObjectId(reviewResult._id)}, update);
                    // window.close();
                    // res.redirect('/restaurant/'+req.body.reviewID);


                    var reviewProjection = '_id authorID restaurantID pubdate votes foodrate servicerate envrate reviewText rName rPhoto rOverallRate';
                    db.findMany(Review, {restaurantID: reviewResult.restaurantID}, reviewProjection, function(reviewSResult){
                        console.log("reviewCount"+reviewSResult.length);
                        console.log(reviewSResult);

                        var totalFR = 0;
                        var totalSR = 0;
                        var  totalER = 0;
                        console.log("totalER: " +totalER);

                        var numReviews = reviewSResult.length;

                        for(i = 0; i<numReviews; i++){
                            totalFR += reviewSResult[i].foodrate;
                            totalSR += reviewSResult[i].servicerate;
                            totalER += reviewSResult[i].envrate;
                            console.log( "i: " + i+ "| totalER: " +totalER);
                        }

                        var rAveEnvironmentRate = totalER/(numReviews);
                        var rAveFoodRate = totalFR/(numReviews);
                        var rAveServiceRate = totalSR/(numReviews);

                        // changes decimal placement to 1 decimal only
                        rAveEnvironmentRate = rAveEnvironmentRate.toFixed(1);
                        rAveFoodRate = rAveFoodRate.toFixed(1);
                        rAveServiceRate = rAveServiceRate.toFixed(1);


                        var rOverallRate = (Number(rAveEnvironmentRate) + Number(rAveFoodRate) + Number(rAveServiceRate) )/3 ;
                        
                        console.log("rOverallRate: " + rOverallRate);

                        var updatedResto = {
                            rAveEnvironmentRate: rAveEnvironmentRate,
                            rAveFoodRate: rAveFoodRate,
                            rAveServiceRate: rAveServiceRate,
                            rOverallRate: rOverallRate.toFixed(1)
                        }

                    
                        console.log("updatedResto: " + JSON.stringify(updatedResto));
                        console.log("reviewResult.restaurantID: " + reviewSResult[0].restaurantID);

                        db.updateOne(Restaurant, {_id: ObjectId(reviewSResult[0].restaurantID)}, updatedResto);

                        res.redirect('back');
                    })

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
        var reviewProjection = '_id authorID restaurantID pubdate votes foodrate servicerate envrate reviewText rName rPhoto rOverallRate';

        db.findOne(Review, {_id: ObjectId(id)},reviewProjection, function(reviewResult){

            var reviewdetails= {
                foodrate: reviewResult.foodrate,
                envrate: reviewResult.envrate,
                servicerate: reviewResult.servicerate,
                reviewText: reviewResult.reviewText,
                reviewID: id

            }

            res.render('reviewedit', reviewdetails);
        });
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
