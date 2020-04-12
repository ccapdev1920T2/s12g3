// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Review = require('../models/reviewModel.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const deleteController = {

    deleteReview: function (req, res){
        

        db.findOne(User, {isLoggedIn: true}, 'uname _id', function(loggedUserResult){
            console.log("enter user");

            db.findOne(Review,{_id:req.params.reviewID}, 'authorID', function(reviewResult){

                //if the currently logged in user is the author of the review
                if(ObjectId(loggedUserResult._id).toString() == reviewResult.authorID ){

                    db.deleteOne(Review, {_id:req.params.reviewID});

                    //refreshes the page
                    res.redirect('back');
                }
                //else, say that u can't delete reviews you didn't make
                else{
                    res.render('error', {errormsg: "You can't delete reviews published by other users!"});
                }

            } )


        })
    }
}

module.exports = deleteController;
