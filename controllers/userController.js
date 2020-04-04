
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `User` from `../models/UserModel.js`
const Review = require('../models/reviewModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const userController = {

    
    getUserByUN: function (req, res) {
       // query where `uname` is equal to URL parameter `username`
       var query = {uname: req.params.username};
        console.log("query: " + query);
        
        // fields to be returned
        var projection = '_id isLoggedIn upic uname email gender pword ucity utype ulikes';

        db.findOne(User, query, projection, function(result) {
            // db.findMany(Review, {: })
                console.log("result: " + result);
                // if the user exists in the database
                // render the profile page with their details
                if(result != null) {
                    var details = {
                        uname: result.uname,
                        ucity: result.ucity,
                        utype: result.utype,
                        ulikes: result.ulikes
                    };
                    
                    // render `../views/user.hbs`
                    res.render('user', details);
                }
                // if the user does not exist in the database
                // render the error page
                else {
                    // render `../views/error.hbs`
                    res.render('error');
                }
        });

    },

    getUser: function(req, res){
        // fields to be returned
        var projection = '_id isLoggedIn upic uname email gender pword ucity utype ulikes';
        var reviewProjection = '_id authorID restaurantID pubdate votes foodrate servicerate envrate reviewText';


        db.findOne(User, {isLoggedIn: true}, projection, function(result) {
            if(result != null) {
                console.log("objectified result._id: " + ObjectId(result._id));
                console.log("result._id: " +result._id);


                db.findMany(Review, {authorID: ObjectId(result._id)}, reviewProjection, function(reviewsResult){
                
                    console.log("object reviewsResult length: " + reviewsResult.length);
                    console.log("result: " + result);
                    console.log("reviewsResult: " + reviewsResult); 

                    // if the user exists in the database
                    // render the profile page with their details
                
                        var details = {
                            uname: result.uname,
                            ucity: result.ucity,
                            utype: result.utype,
                            ulikes: result.ulikes,
                            reviewsRest: reviewsResult
                        };
                        
                        console.log("details: " + JSON.stringify(details));

                        // render `../views/user.hbs`
                        res.render('user', details);
                    
                    
                });
            }
            // if the user does not exist in the database
            // render the error page
            else {
                    // render `../views/error.hbs`
                    res.render('error', {uname: "Guest", errormsg: "You can't view your profile if your not logged in. Login first pls"});
            }
                
        });


    }
}

// exports the object `userController` (defined above)
// when another script exports from this file
module.exports = userController;
