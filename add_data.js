// This script creates the database
// and inserts 8 user details in the collection `profiles`

// import module from `./models/db.js`
const db = require('./models/db.js');

// import module from `./models/db.js`
const mongodb = require('./models/mongodb.js');

// import module User from ../models/restaurantModel.js
const restaurant = require('./models/restaurantModel.js');

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const collection = 'restaurants';

// calls the function createDatabase()
// defined in the `database` object in `./models/db.js`
mongodb.createDatabase();


// creates an object
// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var rest_Info = {
    rPhoto: "cones-on-head.jpg",
    rName: "Spicy Heat",
    rCity: "Manila City",
    rType: "Casual Restaurant",
    rCuisine: "Italian",
    rServes: "Pasta, Pizza, Salad, Pastry",
    rOverallRate: 10.0
        
};

// calls the function insertOne()
// defined in the `database` object in `./models/db.js`
// follow the model in restaurantModel.js insert the res_Info data 
mongodb.insertOne(collection, rest_Info);

// creates an object
// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var rest_Info = {
    rPhoto: "meatgarden.jpg",
    rName: "The Meat Garden",
    rCity: "Manila City",
    rType: "Casual Restaurant",
    rCuisine: "Italian",
    rServes: "Pasta, Pizza, Steak",
    rOverallRate: 10.0
};

// calls the function insertOne()
// defined in the `database` object in `./models/db.js`
// stores the object `user` in the collection (table) `rest_info`
mongodb.insertOne(collection, rest_Info);

// creates an object
// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var rest_Info = {
    rPhoto: "mendokoro-ramenba.jpg",
    rName: "Fair Feeds",
    rCity: "Makati City",
    rType: "Casual Restaurant",
    rCuisine: "Japanese",
    rServes: "Ramen",
    rOverallRate: 10.0
};

// calls the function insertOne()
// defined in the `database` object in `./models/db.js`
// stores the object `user` in the collection (table) `rest_info`
mongodb.insertOne(collection, rest_Info);

// creates an object
// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var rest_Info = {
    rPhoto: "the-frazzled-cook.jpg",
    rName: "Best Bites",
    rCity: "Quezon City",
    rType: "Casual Restaurant",
    rCuisine: "European, Italian ",
    rServes: "Salad, Pizza, Pasta, Paella, Cocktails",
    rOverallRate: 10.0
};

// calls the function insertOne()
// defined in the `database` object in `./models/db.js`
// stores the object `user` in the collection (table) `rest_info`
mongodb.insertOne(collection, rest_Info);


// module.exports = add_data;
