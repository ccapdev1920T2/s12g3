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
        db.findMany(Reviews, {}, '', function(result) {
            res.render('restaurant', {
                restReviews: result
            });
        }); // This is to load the page initially
            // res.render('restaurant'); // This is to load the page initially
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

            var rOverallRate = (Number(foodrate)+Number(servicerate)+Number(envrate))/3;
            rOverallRate = rOverallRate.toFixed(1); // converts to 1 decimal only (1.3 instead of 1.3333333333333)

            // console.log("result.upic" + result.upic);

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
                rName: rName,
                rOverallRate: rOverallRate
            });

            var reviewProjection = '_id authorID restaurantID pubdate votes foodrate servicerate envrate reviewText rName rPhoto rOverallRate';
                
            db.findMany(Reviews, {restaurantID: req.body.restaurantID}, reviewProjection, function(reviewResult){
                console.log("reviewCount"+reviewResult.length);
                console.log(reviewResult);

                var totalFR = Number(foodrate);
                var totalSR = Number(servicerate);
                var  totalER = Number(envrate);
                console.log("totalER: " +totalER);

                var numReviews = reviewResult.length;

                for(i = 0; i<numReviews; i++){
                    totalFR += reviewResult[i].foodrate;
                    totalSR += reviewResult[i].servicerate;
                    totalER += reviewResult[i].envrate;
                    console.log( "i: " + i+ "| totalER: " +totalER);
                }

                var rAveEnvironmentRate = totalER/(numReviews+1);
                var rAveFoodRate = totalFR/(numReviews+1);
                var rAveServiceRate = totalSR/(numReviews+1);

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

                db.updateOne(Restaurant, {_id: ObjectId(restaurantID)}, updatedResto);
    
            })
           

            // console.log(foodrate);
            // console.log(servicerate);
            // console.log(envrate);
            // console.log((foodrate+servicerate+envrate));

            

            res.redirect('/restaurant/'+restaurantID);
        });

    },

    deleteReview: function(req, res){
        res.redirect('/restaurant');
    },

    getRestaurant: function (req, res) {

        
        // query where `idNum` is equal to URL parameter `idNum`
        var query = {_id: req.params.id};
        
        // fields to be returned
        var projection = 'rPhoto rName rCity rType rCuisine rServes rAveFoodRate rAveServiceRate rAveEnvironmentRate rOverallRate restReviews';
        
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
                    var reviewProjection = '_id authorID restaurantID pubdate votes  foodrate servicerate envrate reviewText rName rPhoto rOverallRate';
                
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
                                    rAveEnvironmentRate: result.rAveEnvironmentRate,
                                    rAveFoodRate: result.rAveFoodRate,
                                    rAveServiceRate: result.rAveServiceRate,
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
        
    },

    getIncrementVote: function(req, res){
        
        // console.log(req.query.reviewID);
        // alert("get from controller");

        // db.findOne(Reviews, {_id: req.query.restaurantID}, 'votes', function(reviewResult){

            res.send(true);
        // });


    }

    // downvoteReview: function(req, res){
    //     res.redirect('/restaurant');
    // }
            
     
}

// exports the object `controller` (defined above)
// when another script exports from this file
module.exports = restaurantController;