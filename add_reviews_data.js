// This script creates the database
// and inserts 2 review details in the collection `reviews`

// import module from `./models/db.js`
const db = require('./models/db.js');

// import module from `./models/db.js`
const mongodb = require('./models/mongodb.js');

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const collection = 'reviews';

// calls the function createDatabase()
// defined in the `database` object in `./models/db.js`
mongodb.createDatabase();

// creates an object
// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var review = {
    authorID: "5e837b8993e3972b4818a41e",
    restaurantID: "5e849c4f38b3a204a8f1a294",
    pubdate: new Date(),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!" 
};

// calls the function insertOne()
// defined in the `database` object in `./models/db.js`
// follow the model in restaurantModel.js insert the res_Info data 
mongodb.insertOne(collection, review);