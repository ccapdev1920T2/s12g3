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
        db.findOne(Users, {isLoggedIn: true}, 'uname upic', function(result) {

            var authoruname = result.uname;
            var authorID = result._id;
            var foodrate = req.body.foodrate;
            var servicerate = req.body.servicerate;
            var envrate = req.body.envrate;
            var reviewText = req.body.reviewText;
            var restaurantID = req.body.restaurantID; 
            var rPhoto = result.upic;
            var rName = result.uname;
            var restaurantName = req.body.restaurantName;

            console.log("result.upic" + result.upic);

            db.insertOne(Reviews, {
                authorID: authorID,
                authoruname: authoruname,
                foodrate: foodrate,
                servicerate: servicerate,
                envrate: envrate,
                reviewText: reviewText,
                restaurantID: restaurantID,
                restaurantName: restaurantName,
                rPhoto: rPhoto,
                rName: rName
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

            // console.log("loggedUserResult: " + loggedUserResult);
            if(loggedUserResult == null){
                var headername = "Guest";
            }else{
                var headername = loggedUserResult.uname;
            }

            //for the normal restaurant page // if the search fields doesn't have any value
            if( req.query.city == null && req.query.restaurant == null){

                db.findOne(Restaurant, query, projection, function(result) {
                    var reviewProjection = '_id authorID restaurantID pubdate votes  foodrate servicerate envrate reviewText rName rPhoto';
                
                    //check reviews and check for a review with restaurantID same as the ObjectId(req.params.id)
                    var reviewsQuery = {restaurantID: ObjectId(req.params.id)}; 

                    db.findMany(Reviews, reviewsQuery, reviewProjection, function(resultreview) {
                        db.findOne(Users, {_id : ObjectId(resultreview.authorID)}, 'rName, rPhoto', function(reviewsResult){
                            if(resultreview != null && result !=null) {

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

                                res.render('restaurant', restoDetails);
                            }
                            else 
                            {
                                res.render('error');
                            }  
                        })    
                    })

                })
            }
            // for search
            else {

                if(req.query.city != '' && req.query.restaurant != ''){
                    //if both restaurant name and city is entered
                    Restaurant.find({rCity : req.query.city, rName : req.query.restaurant}, function (err, restaurantResult){
                        console.log("restaurantResult: " + restaurantResult);
                        res.render('home', {uname: loggedUserResult.uname, restaurant: restaurantResult }); 
                    })
                }else if(req.query.city != ''){
                    //if restaurant city is only entered
                    Restaurant.find({rCity : req.query.city}, function (err, restaurantResult){
                        console.log("restaurantResult: " + restaurantResult);
                        res.render('home', {uname: loggedUserResult.uname, restaurant: restaurantResult }); 
                    })
                }else if(req.query.restaurant != ''){
                    //if restaurant name is only entered
                    Restaurant.find({rName : req.query.restaurant}, function (err, restaurantResult){
                        console.log("restaurantResult: " + restaurantResult);
                        res.render('home', {uname: loggedUserResult.uname, restaurant: restaurantResult }); 
                    })
                }else{
                    //just refreshes the page if both search fields are blank
                    res.redirect('back');
                }
                
            }
        
        })
        
    }
            
     
}

// exports the object `controller` (defined above)
// when another script exports from this file
module.exports = restaurantController;