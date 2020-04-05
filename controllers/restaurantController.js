// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `restaurant` from `../models/restaurantModel.js`
const Restaurant = require('../models/restaurantModel.js');

// import module `restaurant` from `../models/reviewModel.js`
const Reviews = require('../models/reviewModel.js');

// import module `restaurant` from `../models/userModel.js`
const Users = require('../models/userModel.js');


//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const restaurantController = {

    deleteReview: function(req, res){
        res.redirect('/');
    },

    getRestaurant: function (req, res) {
        // query where `idNum` is equal to URL parameter `idNum`
        var query = {_id: req.params.id};
        
         // fields to be returned
         var projection = 'rPhoto rName rCity rType rCuisine rServes rOverallRate restReviews';
         
        db.findOne(Users, {isLoggedIn: true}, 'uname', function(loggedUserResult){

            console.log("loggedUserResult: " + loggedUserResult);
            if(loggedUserResult == null){
                var headername = "Guest";
            }else{
                var headername = loggedUserResult.uname;
            }

            db.findOne(Restaurant, query, projection, function(result) {
                
                console.log("result: " + result);

                // fields to be returned
                var reviewProjection = '_id authorID restaurantID pubdate votes  foodrate servicerate envrate reviewText';
                var reviewsQuery = {restaurantID: ObjectId(req.params.id)}; //check reviews and check for a review with restaurantID same as the ObjectId(req.params.id)

                    db.findMany(Reviews, reviewsQuery, reviewProjection, function(resultreview) {
                        
                   
                    
                    // if(resultreview == !null){
                        console.log("object resultreview length: " + resultreview.length);

                        var resrevlen = resultreview.length;
                        // var reviewsWithAuthor = resultreview;
                        for(var i=0; i<resrevlen; i++){
                            
                            
                            var reviewAuthorQuery = { _id: ObjectId(resultreview[i].authorID) };
                            var reviewAuthorProjection = '_id uname upic email   ';

                            
                            console.log("resultreview: " + resultreview[i].authorID);
                            
                        
                            var    authorID = resultreview[i].authorID;
                            var    restaurantID =resultreview[i].restaurantID;
                            var    pubdate =  resultreview[i].pubdate;
                            var    votes = resultreview[i].votes;
                            var    foodrate = resultreview[i].foodrate;
                            var    servicerate = resultreview[i].servicerate;
                            var    envrate = resultreview[i].envrate;
                            var    reviewText = resultreview[i].reviewText;
                        
                        
                        
                            db.findOne(Users, reviewAuthorQuery, reviewAuthorProjection, function(reviewAuthorResult){
                                
                                console.log("revPhoto: "+ reviewAuthorResult.upic);
                                var reviewsWithAuthor = resultreview;
                                var setRev = {
                                    rPhoto : reviewAuthorResult.upic,
                                    rName : reviewAuthorResult.uname,
                                    authorID : authorID,
                                    restaurantID :restaurantID,
                                    pubdate :  pubdate,
                                    votes : votes,
                                    foodrate : foodrate,
                                    servicerate : servicerate,
                                    envrate : envrate,
                                    reviewText : reviewText
                                }
                                reviewsWithAuthor[i] = setRev;
                            
                                console.log("setRev:" + JSON.stringify(setRev));
                                console.log("reviewsWithAuthor: " +reviewsWithAuthor);
                                console.log(i+" inside dbOne "+resrevlen);
                                if(resultreview != null && result !=null) {

                                    //  if result != null
                                    var restoDetails = {
                                            uname: headername,
                                            rPhoto: result.rPhoto,
                                            rName: result.rName,
                                            rCity: result.rCity,
                                            rType: result.rType,
                                            rCuisine: result.rCuisine,
                                            rServes: result.rServes,
                                            rOverallRate: result.rOverallRate,
                                            restReviews: reviewsWithAuthor
                                    };

                                    result = restoDetails;
                                    console.log("result: " + JSON.stringify(result));

                                    console.log(i+" | "+resrevlen);

                                    if(i == resrevlen ){
                                        console.log("!!!!!!!!!!!!!!!!!!!!");
                                        res.render('restaurant', restoDetails);
                                    }
                                    
                                    
                                    //for debugging, to check the content of restoDetails
                                    // console.log("restoDetailsString: " + JSON.stringify(restoDetails));
            
                                    // render `../views/restaurant.hbs`
                                    // res.render('restaurant', restoDetails);
                                }
                                // if the user does not exist in the database
                                // render the error page
                                else 
                                {
                                        // render `../views/error.hbs`
                                        res.render('error');
                                }  
                            });
                        }
                    // }else{
                    //     var restoDetails = {
                    //         uname: headername,
                    //         rPhoto: result.rPhoto,
                    //         rName: result.rName,
                    //         rCity: result.rCity,
                    //         rType: result.rType,
                    //         rCuisine: result.rCuisine,
                    //         rServes: result.rServes,
                    //         rOverallRate: result.rOverallRate
                    //     };

                    //     res.render('restaurant', restoDetails);
                    // }
                })
                
            });
        })
            



    }
            
     
}

// exports the object `controller` (defined above)
// when another script exports from this file
module.exports = restaurantController;