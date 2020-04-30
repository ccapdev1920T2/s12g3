// import module from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `User` from `../models/UserModel.js`
const Restaurant = require('../models/restaurantModel.js');

const homeController = {

    getRestaurants: function(req, res) {

        
        

        db.findOne(User, {isLoggedIn: true}, 'uname', function(result){ 

            //for the normal homepage // if the search fields doesn't have any value
            if( req.query.city == null && req.query.restaurant == null){
                Restaurant.find({}, function (err, restaurant){
                    if(req.session.uname != null){
                        var details = {
                        restaurant: restaurant,
                        uname: req.session.uname
                        }
                    }else{
                        var details = {
                            restaurant: restaurant,
                            uname: "Guest"
                        }
                    }
                    // this console.log is for gebugging only
                    // console.log(restaurant);
                    // console.log("result: " +result);
                    res.render('home.hbs', details); 
                }) 
            }
            
            // for search
            else {

                //if someone is logged in
                if(req.session.uname != null){
                    if(req.query.city != '' && req.query.restaurant != ''){
                        //if both restaurant name and city is entered
                        Restaurant.find({rCity : req.query.city, rName : req.query.restaurant}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home.hbs', {uname: req.session.uname, restaurant: restaurantResult }); 
                        })
                    }else if(req.query.city != ''){
                        //if restaurant city is only entered
                        Restaurant.find({rCity : req.query.city}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home.hbs', {uname: req.session.uname, restaurant: restaurantResult }); 
                        })
                    }else if(req.query.restaurant != ''){
                        //if restaurant name is only entered
                        Restaurant.find({rName : req.query.restaurant}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home.hbs', {uname: req.session.uname, restaurant: restaurantResult }); 
                        })
                    }else{
                        //just refreshes the page if both search fields are blank
                        res.redirect('back');
                    }
                }
                //else (if no one is logged in.) // renders pages with "Guest" as uname
                else{
                    if(req.query.city != '' && req.query.restaurant != ''){
                        //if both restaurant name and city is entered
                        Restaurant.find({rCity : req.query.city, rName : req.query.restaurant}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home.hbs', {uname: "Guest", restaurant: restaurantResult }); 
                        })
                    }else if(req.query.city != ''){
                        //if restaurant city is only entered
                        Restaurant.find({rCity : req.query.city}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home.hbs', {uname: "Guest", restaurant: restaurantResult }); 
                        })
                    }else if(req.query.restaurant != ''){
                        //if restaurant name is only entered
                        Restaurant.find({rName : req.query.restaurant}, function (err, restaurantResult){
                            console.log("restaurantResult: " + restaurantResult);
                            res.render('home.hbs', {uname: "Guest", restaurant: restaurantResult }); 
                        })
                    }else{
                        //just refreshes the page if both search fields are blank
                        res.redirect('back');
                    }

                }
                
            }
            
            
        });
    },

    getCurrentUser: function (req, res){

        db.findOne(User, {isLoggedIn: true}, 'uname upic _id', function(result){

            console.log("working");

            res.send(result);

        })


    }
}

// exports the object `homeController` (defined above)
// when another script exports from this file
module.exports = homeController;