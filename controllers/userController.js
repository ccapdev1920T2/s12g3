
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `database` from `../models/dbWithCallback.js`
const dbWithCallbackdb = require('../models/dbWithCallback.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `User` from `../models/UserModel.js`
const Review = require('../models/reviewModel.js');

// import module `restaurant` from `../models/restaurantModel.js`
const Restaurant = require('../models/restaurantModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const userController = {


    getUserByUN: function (req, res) {
       // query where `uname` is equal to URL parameter `username`
       var query = {uname: req.params.username};
        console.log("query: " + query);

        console.log("req.session.uname: " + req.session.uname);
        
        // fields to be returned
        var projection = '_id isLoggedIn upic uname email gender pword ucity utype ulikes';
        var reviewProjection = '_id reviewID  authorID restaurantID restaurantName pubdate votes foodrate servicerate envrate reviewText rName rPhoto';//

        // just to fix the problem with button validations when user/:username is the same as the session's uname
        // because yung uname ng hbs sa get~~ user/:username, merong name ng restaurant. so yeah.
        if(req.session.uname == req.params.username){
            res.redirect('/user');
        }
        
        db.findOne(User, query, projection, function(result) {
            if(result != null) {

                if(req.session.uname != null){
                        //for the normal user page with logged user // if the search fields doesn't have any value
                        if( req.query.city == null && req.query.restaurant == null){
                            db.findMany(Review, {authorID: ObjectId(result._id)}, reviewProjection, function(reviewsResult){
                            
                                var reviewsWithAuthor = reviewsResult;
                                for(var i=0; i<reviewsResult.length; i++){
            
                                    var setRev = {
                                        rPhoto :result.upic,
                                        rName : result.uname,
                                        authorID :reviewsResult[i].authorID,
                                        restaurantID :reviewsResult[i].restaurantID,
                                        restaurantName: reviewsResult[i].restaurantName, //
                                        pubdate :  reviewsResult[i].pubdate,
                                        votes : reviewsResult[i].votes,
                                        foodrate : reviewsResult[i].foodrate,
                                        servicerate : reviewsResult[i].servicerate,
                                        envrate : reviewsResult[i].envrate,
                                        reviewText : reviewsResult[i].reviewText,
                                        reviewID: ObjectId(reviewsResult[i]._id).toString()
            
                                    }
                                    // console.log("setRev: " + JSON.stringify(setRev));
                                    console.log("reviewsResult._id: " + reviewsResult[i]._id);
                                    db.updateOne(Review, {_id: reviewsResult[i]._id}, setRev);
            
                                    reviewsWithAuthor[i] = setRev;
                                }

                                var details = {
                                    sessionUname: req.session.uname,
                                    upic: result.upic,
                                    uname: result.uname,
                                    ucity: result.ucity,
                                    utype: result.utype,
                                    ulikes: result.ulikes,
                                    reviewsRest: reviewsWithAuthor
                                };

                                console.log("check: " + JSON.stringify(details));

                                // render `../views/user.hbs`
                                res.render('otheruser', details);
                                
                                
                            });

                        }
                        
                        // for search
                        else {

                            if(req.query.city != '' && req.query.restaurant != ''){
                                //if both restaurant name and city is entered
                                Restaurant.find({rCity : req.query.city, rName : req.query.restaurant}, function (err, restaurantResult){
                                    console.log("restaurantResult: " + restaurantResult);
                                    res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                                })
                            }else if(req.query.city != ''){
                                //if restaurant city is only entered
                                Restaurant.find({rCity : req.query.city}, function (err, restaurantResult){
                                    console.log("restaurantResult: " + restaurantResult);
                                    res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                                })
                            }else if(req.query.restaurant != ''){
                                //if restaurant name is only entered
                                Restaurant.find({rName : req.query.restaurant}, function (err, restaurantResult){
                                    console.log("restaurantResult: " + restaurantResult);
                                    res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                                })
                            }else{
                                //just refreshes the page if both search fields are blank
                                res.redirect('back');
                            }
                        }
                }
                // else (KAPAG GUEST LANG)
                else{
                    //for the normal user page with logged user // if the search fields doesn't have any value
                    if( req.query.city == null && req.query.restaurant == null){
                        db.findMany(Review, {authorID: ObjectId(result._id)}, reviewProjection, function(reviewsResult){
                        
                            var reviewsWithAuthor = reviewsResult;
                            for(var i=0; i<reviewsResult.length; i++){
        
                                var setRev = {
                                    rPhoto :result.upic,
                                    rName : result.uname,
                                    authorID :reviewsResult[i].authorID,
                                    restaurantID :reviewsResult[i].restaurantID,
                                    restaurantName: reviewsResult[i].restaurantName, //
                                    pubdate :  reviewsResult[i].pubdate,
                                    votes : reviewsResult[i].votes,
                                    foodrate : reviewsResult[i].foodrate,
                                    servicerate : reviewsResult[i].servicerate,
                                    envrate : reviewsResult[i].envrate,
                                    reviewText : reviewsResult[i].reviewText,
                                    reviewID: ObjectId(reviewsResult[i]._id).toString()
        
                                }
                                // console.log("setRev: " + JSON.stringify(setRev));
                                console.log("reviewsResult._id: " + reviewsResult[i]._id);
                                db.updateOne(Review, {_id: reviewsResult[i]._id}, setRev);
        
                                reviewsWithAuthor[i] = setRev;
                            }

                            var details = {
                                sessionUname: "Guest",
                                upic: result.upic,
                                uname: result.uname,
                                ucity: result.ucity,
                                utype: result.utype,
                                ulikes: result.ulikes,
                                reviewsRest: reviewsWithAuthor
                            };

                            console.log("check: " + JSON.stringify(details));

                            // render `../views/user.hbs`
                            res.render('otheruser', details);
                            
                            
                        });

                    }
                    
                    // for search
                    else {

                        if(req.query.city != '' && req.query.restaurant != ''){
                            //if both restaurant name and city is entered
                            Restaurant.find({rCity : req.query.city, rName : req.query.restaurant}, function (err, restaurantResult){
                                console.log("restaurantResult: " + restaurantResult);
                                res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                            })
                        }else if(req.query.city != ''){
                            //if restaurant city is only entered
                            Restaurant.find({rCity : req.query.city}, function (err, restaurantResult){
                                console.log("restaurantResult: " + restaurantResult);
                                res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                            })
                        }else if(req.query.restaurant != ''){
                            //if restaurant name is only entered
                            Restaurant.find({rName : req.query.restaurant}, function (err, restaurantResult){
                                console.log("restaurantResult: " + restaurantResult);
                                res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                            })
                        }else{
                            //just refreshes the page if both search fields are blank
                            res.redirect('back');
                        }
                    }


                }

            }
            // if the user does not exist in the database
            // render the error page
            else {
                    // render `../views/error.hbs`
                    res.render('error', {uname: "Guest", errormsg: "You can't view your profile if your not logged in. Login first pls"});
            }
        });

    },

    getUser: function(req, res){
        // fields to be returned
        var projection = '_id isLoggedIn upic uname email gender pword ucity utype ulikes';
        var reviewProjection = '_id reviewID  authorID restaurantID restaurantName pubdate votes foodrate servicerate envrate reviewText rName rPhoto';//


        db.findOne(User, {uname: req.session.uname}, projection, function(result) {
            if(result != null) {
                //for the normal user page with logged user // if the search fields doesn't have any value
                if( req.query.city == null && req.query.restaurant == null){
                    db.findMany(Review, {authorID: ObjectId(result._id)}, reviewProjection, function(reviewsResult){
                    
                        var reviewsWithAuthor = reviewsResult;
                        for(var i=0; i<reviewsResult.length; i++){
    
                            var setRev = {
                                rPhoto :result.upic,
                                rName : result.uname,
                                authorID :reviewsResult[i].authorID,
                                restaurantID :reviewsResult[i].restaurantID,
                                restaurantName: reviewsResult[i].restaurantName, //
                                pubdate :  reviewsResult[i].pubdate,
                                votes : reviewsResult[i].votes,
                                foodrate : reviewsResult[i].foodrate,
                                servicerate : reviewsResult[i].servicerate,
                                envrate : reviewsResult[i].envrate,
                                reviewText : reviewsResult[i].reviewText,
                                reviewID: ObjectId(reviewsResult[i]._id).toString()
    
                            }
                            // console.log("setRev: " + JSON.stringify(setRev));
                            console.log("reviewsResult._id: " + reviewsResult[i]._id);
                            db.updateOne(Review, {_id: reviewsResult[i]._id}, setRev);
    
                            reviewsWithAuthor[i] = setRev;
                        }

                        var details = {
                            upic: result.upic,
                            uname: result.uname,
                            ucity: result.ucity,
                            utype: result.utype,
                            ulikes: result.ulikes,
                            reviewsRest: reviewsWithAuthor
                        };

                        console.log("check: " + JSON.stringify(details));

                        // render `../views/user.hbs`
                        res.render('user', details);
                        
                        
                    });
                }
                // for search
                else {

                    if(req.query.city != '' && req.query.restaurant != ''){
                        //if both restaurant name and city is entered
                        Restaurant.find({rCity : req.query.city, rName : req.query.restaurant}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                        })
                    }else if(req.query.city != ''){
                        //if restaurant city is only entered
                        Restaurant.find({rCity : req.query.city}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                        })
                    }else if(req.query.restaurant != ''){
                        //if restaurant name is only entered
                        Restaurant.find({rName : req.query.restaurant}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home', {uname: result.uname, restaurant: restaurantResult }); 
                        })
                    }else{
                        //just refreshes the page if both search fields are blank
                        res.redirect('back');
                    }
                }
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
