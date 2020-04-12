// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `restaurant` from `../models/restaurantModel.js`
const Restaurant = require('../models/restaurantModel.js');

// import module `restaurant` from `../models/reviewModel.js`
const Reviews = require('../models/reviewModel.js');

// import module `restaurant` from `../models/userModel.js`
const Users = require('../models/userModel.js');

// import module `restaurant` from `../models/commentModel.js`
const Comments = require('../models/commentModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const restaurantController = {

    getRestaurant: function (req, res) {
        // query where `idNum` is equal to URL parameter `idNum`
        var query = {_id: req.params.id};
        
         // fields to be returned
         var projection = 'rPhoto rName rCity rType rCuisine rServes rOverallRate restReviews';
         
         // calls the function findOne()
         // defined in the `database` object in `../models/db.js`
         // this function searches the collection `restaurant`
         // based on the value set in object `query`
         // the third parameter is a string containing the fields to be returned
         // the fourth parameter is a callback function
         // this called when the database returns a value
         // saved in variable `result`
         db.findOne(Restaurant, query, projection, function(result) {
            
             console.log("result: " + result);

            // fields to be returned
            var reviewProjection = '_id authorID restaurantID pubdate votes  foodrate servicerate envrate reviewText';
            var reviewsQuery = {restaurantID: ObjectId(req.params.id)}; //check reviews and check for a review with restaurantID same as the ObjectId(req.params.id)

            db.findMany(Reviews, reviewsQuery, reviewProjection, function(resultreview) {
            //for debuging only. checks value of resultreview
            // console.log("resultreview: " + resultreview);
                
            console.log("object resultreview length: " + resultreview.length);

            for(var reviewIndex=0; reviewIndex<resultreview.length; reviewIndex++){
                
                console.log("resultreview.authorID of index"+reviewIndex+": " + resultreview[reviewIndex]);
                var reviewAuthorQuery = { _id: ObjectId(resultreview[reviewIndex].authorID) };
                var reviewAuthorProjection = '_id uname upic email   ';
 
                
 
                console.log("reviewAuthorQuery: "+JSON.stringify(reviewAuthorQuery));
                 db.findOne(Users, reviewAuthorQuery, reviewAuthorProjection, function(reviewAuthorResult){
 
                     console.log("reviewAuthorResult: " +reviewAuthorResult);
                     // var review;
                     // var restoDetails;
                     if(resultreview != null && result !=null) {
                         // if resultreview != null 
                        //  var review = {
                        //      authorID : resultreview.authorID,
                        //      restaurantID : resultreview.restaurantID,
                        //      pubdate : resultreview.pubdate,
                        //      votes  : resultreview.votes,
                        //      foodrate : resultreview.foodrate,
                        //      servicerate : resultreview.servicerate,
                        //      envrate : resultreview.envrate,
                        //      reviewText: resultreview.reviewText
                        //  };
 
                        resultReview={
                            reviewAuthor: reviewAuthorResult
                        }
 
                         //  if result != null
                         var restoDetails = {
                                 rPhoto: result.rPhoto,
                                 rName: result.rName,
                                 rCity: result.rCity,
                                 rType: result.rType,
                                 rCuisine: result.rCuisine,
                                 rServes: result.rServes,
                                 rOverallRate: result.rOverallRate,
                                 restReviews: resultreview,
                                 
                                 
                                 
                         };
 
                         //for debugging, to check the content of restoDetails
                         console.log("restoDetailsString: " + JSON.stringify(restoDetails));
 
                         // render `../views/restaurant.hbs`
                         res.render('restaurant', restoDetails);
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
                
                     
            });
         });
     }
}

// exports the object `controller` (defined above)
// when another script exports from this file
module.exports = restaurantController;