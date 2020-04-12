// import module from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/userModel.js');

// import module `User` from `../models/UserModel.js`
const Restaurant = require('../models/restaurantModel.js');

const searchController = {

    getSearch: function (req, res){

        console.log("pasok");
        res.render('home');
    }



}

module.exports = searchController;