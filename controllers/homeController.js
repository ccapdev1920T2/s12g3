// import module from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `User` from `../models/UserModel.js`
const Restaurant = require('../models/restaurantModel.js');

const homeController = {

    getRestaurants: function(req, res) {


        db.findOne(User, {isLoggedIn: true}, 'uname', function(result){
            
            Restaurant.find({}, function (err, restaurant){

                // this console.log is for gebugging only
                // console.log(restaurant);

                console.log("result: " +result);


                res.render('home.hbs', {restaurant: restaurant}); 
            });
        });

        
    
        

    }

    



}

// exports the object `homeController` (defined above)
// when another script exports from this file
module.exports = homeController;