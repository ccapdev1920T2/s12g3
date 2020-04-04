// This script creates the database
//NOTE in _id, "a" means restaurant, "b" means review, "c" means commentCollection, and "d" means user 
// NOTE restaurant details and user details must be created first, then reviews, then comments.

// always include the line after this as the 1st element when adding stuff
// _id: ObjectId()






// import module from `./models/db.js`
const mongodb = require('./models/mongodb.js');
const ObjectId = require('mongodb').ObjectID;

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const restaurantCollection = 'restaurants';

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const reviewCollection = 'reviews';

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const userCollection = 'users';

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const commentCollection = 'comments';

// calls the function createDatabase()
// defined in the `database` object in `./models/db.js`
mongodb.createDatabase();



// creates a restaurant with _id = "r1"
// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant1Details= {
    _id: ObjectId(),
    rPhoto: "cones-on-head.jpg",
    rName: "Spicy Heat",
    rCity: "Manila City",
    rType: "Casual Restaurant",
    rCuisine: "Italian",
    rServes: "Pasta, Pizza, Salad, Pastry",
    rOverallRate: 10.0
        
};
mongodb.insertOne(restaurantCollection, restaurant1Details);

// add user1
var user1Details = {
    _id: ObjectId(),
    upic: "BobJohnson.jpg",
    uname: "bobjohnson",
    email: "bobjohnson@gmail.com",
    gender: "Male",
    pword: "pass123",
    ucity: "Manila",
    utype: "Italian",
    ulikes: "Pasta, Soup, Barbeque, Seafood"
}
mongodb.insertOne(userCollection, user1Details);

// add user2
var user2Details = {
    _id: ObjectId(),
    upic: "HaroldAnderson.jpg",
    uname: "haroldanderson",
    email: "haroldanderson@gmail.com",
    gender: "Male",
    pword: "pass123",
    ucity: "Makati",
    utype: "Indian",
    ulikes: "Curry, Roti"
}
mongodb.insertOne(userCollection, user2Details);

//add review1 created by user1 to restaurant1
var review1Details = {
    _id: ObjectId(),
    authorID: user1Details._id,
    restaurantID: restaurant1Details._id,
    pubdate: new Date("YYYY-mm-dd"),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!" 
};
mongodb.insertOne(reviewCollection, review1Details);

//add review2 created by user1 to restaurant1
var review2Details = {
    _id: ObjectId(),
    authorID: user1Details._id,
    restaurantID: restaurant1Details._id,
    pubdate: new Date("YYYY-mm-dd"),
    votes: 40,
    foodrate: 10,
    servicerate: 10,
    envrate: 10,
    reviewText: " I love everything that has something to do with this restaurant. :)" 
};
mongodb.insertOne(reviewCollection, review2Details);


// adds  comment1 to review1
var comment1Details = {
    authorID: user2Details._id,
    reviewID: review1Details._id,
    date: new Date(),
    commentText: "Try the mushroom soup next time"
}
mongodb.insertOne(commentCollection, comment1Details);