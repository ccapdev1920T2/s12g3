
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `User` from `../models/UserModel.js`
const Review = require('../models/reviewModel.js');

// import module `User` from `../models/UserModel.js`
const Restaurant = require('../models/restaurantModel.js');

//for ObjectId(_id), used to get the Object type of the retrieved _id
const ObjectId = require('mongodb').ObjectID;

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const deleteController = {

    deleteReview: function (req, res){
        db.deleteOne(Review, {_id:req.params.reviewID});
        res.redirect('/');

        // db.findOne(User, {isLoggedIn: true}, 'uname _id', function(loggedUserResult){

        //     console.log(loggedUserResult);
        //     var _id = loggedUserResult._id;
        //     var uname = loggedUserResult.uname;
        //     // console.log(_id);
        
        //     if(loggedUserResult == !null){
        //         console.log("TRUEEEE");
        //         db.findOne(Review, {_id: req.params.reviewID }, '_id restaurantID authorID', function(result){
        //             var authorID = result.authorID;

        //             console.log(result);

        //             console.log(_id);
        //             console.log(authorID);
        //             if(_id == authorID){
        //                 db.deleteOne(Review, {_id:req.params.reviewID});
        //                 res.redirect('/');
        //             }else{
        //                 render('error', {errormsg: "This review is not yours. You can only delete reviews you made."});
        //             }
        //         })
        //     }else{
        //         res.render('error', {uname:uname, errormsg: "This review may be not yours or you are not logged in."});
        //     }
                

        // })
    }

}

module.exports = deleteController;
