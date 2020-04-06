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

    getReview: function (req, res) {
        res.render('restaurant');
    },

    postReview: function (req, res) {
        db.findOne(Users, {isLoggedIn: true}, 'uname', function(result) {

        console.log("ZHUPP+EIIIIIIIIII");

        
        var authoruname = result.uname;
        var authorID = result._id;
        var foodrate = req.body.foodrate;
        var servicerate = req.body.servicerate;
        var envrate = req.body.envrate;
        var reviewText = req.body.reviewText;
        var restaurantID =req.body.restaurantID; 
        
        console.log(restaurantID);
        

        db.insertOne(Reviews, {
            authorID: authorID,
            authoruname: authoruname,
            foodrate: foodrate,
            servicerate: servicerate,
            envrate: envrate,
            reviewText: reviewText,
            restaurantID: restaurantID
        });

        console.log(foodrate);
        console.log(servicerate);
        console.log(envrate);
        console.log(reviewText);

        res.redirect('/restaurant/'+restaurantID);
        })
    },

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
                        
                    if(resultreview != null && result !=null) {

                        //  if result != null
                        var restoDetails = {
                            restoID:  req.params.id,

                            uname: headername,
                            rPhoto: result.rPhoto,
                            rName: result.rName,
                            rCity: result.rCity,
                            rType: result.rType,
                            rCuisine: result.rCuisine,
                            rServes: result.rServes,
                            rOverallRate: result.rOverallRate,
                            restReviews: resultreview
                        };

                        result = restoDetails;
                        console.log("result: " + JSON.stringify(result));


                            
                        console.log("!!!!!!!!!!!!!!!!!!!!");
                        res.render('restaurant', restoDetails);
                        
                    }
                    else 
                    {
                        // render `../views/error.hbs`
                        res.render('error');
                    }  
                        
                    
                })
        
            });
        })
    }
            
     
}

// exports the object `controller` (defined above)
// when another script exports from this file
module.exports = restaurantController;