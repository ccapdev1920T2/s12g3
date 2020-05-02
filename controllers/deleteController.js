// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Review = require('../models/reviewModel.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `restaurant` from `../models/restaurantModel.js`
const Restaurant = require('../models/restaurantModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const deleteController = {

    deleteReview: function (req, res){
        
        db.findOne(User, {uname: req.session.uname}, 'uname _id', function(loggedUserResult){
            console.log("enter user");

            db.findOne(Review,{_id:req.params.reviewID}, 'authorID restaurantID', function(reviewResult){

                //if the currently logged in user is the author of the review
                if(ObjectId(loggedUserResult._id).toString() == reviewResult.authorID ){

                    db.deleteOne(Review, {_id:req.params.reviewID});

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

                        if(numReviews != 0){
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

                        }else{
                            var updatedResto = {
                                rAveEnvironmentRate: 0,
                                rAveFoodRate: 0,
                                rAveServiceRate: 0,
                                rOverallRate: 0
                            }
                        }

                        console.log("updatedResto: " + JSON.stringify(updatedResto));
                        console.log("reviewResult.restaurantID: " + reviewResult.restaurantID);

                        db.updateOne(Restaurant, {_id: ObjectId(reviewResult.restaurantID)}, updatedResto);
            
                    })

                    //refreshes the page
                    res.redirect('back');
                }
                //else, say that u can't delete reviews you didn't make
                else{
                    res.render('error', {errormsg: "You can't delete reviews published by other users!"});
                }
            })
        })
    }
}

module.exports = deleteController;
