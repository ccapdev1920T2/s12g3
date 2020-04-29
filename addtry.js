// This script creates the database
//NOTE in _id, "a" means restaurant, "b" means review,  and "d" means user 
// NOTE restaurant details and user details must be created first, then reviews

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



// calls the function createDatabase()
// defined in the `database` object in `./models/db.js`
mongodb.createDatabase();




// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant1Details= {
    _id: ObjectId(),
    rPhoto: "cones-on-head.jpg",
    rName: "Spicy Heat",
    rCity: "Manila",
    rType: "Casual Restaurant",
    rCuisine: "Italian",
    rServes: "Pasta, Pizza, Salad, Pastry",
    rAveFoodRate:10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 9.5 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 9, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.5  //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant1Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant2Details= {
    _id: ObjectId(),
    rPhoto: "sunnies-cafe.jpg",
    rName: "Sunnies Cafe",
    rCity: "Makati",
    rType: "Cafe",
    rCuisine: "Italian",
    rServes: "Coffee, Salad, Pastry",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 8 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 10, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.3 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant2Details);

// add user1
var user1Details = {
    _id: ObjectId(), // this just generates an _id for this object
    isLoggedIn: false,
    upic: "BobJohnson.jpg",
    uname: "bobjohnson",
    email: "bobjohnson@gmail.com",
    gender: "Male",
    pword: "$2b$10$ui2b9Q8Xi0Vy1jh8ghqLSeufONuXr04wevo23UzAnSxjMtu6NwmUC",
    ucity: "Manila",
    utype: "Italian",
    ulikes: "Pasta, Soup, Barbeque, Seafood"
}

mongodb.insertOne(userCollection, user1Details);

// add user2
var user2Details = {
    _id: ObjectId(), // this just generates an _id for this object
    isLoggedIn: false,
    upic: "HaroldAnderson.jpg",
    uname: "haroldanderson",
    email: "haroldanderson@gmail.com",
    gender: "Male",
    pword: "$2b$10$ui2b9Q8Xi0Vy1jh8ghqLSeufONuXr04wevo23UzAnSxjMtu6NwmUC",
    ucity: "Makati",
    utype: "Indian",
    ulikes: "Curry, Roti"
}

mongodb.insertOne(userCollection, user2Details);

//add review1 created by user2 to restaurant1
var review1Details = {
    _id: ObjectId(), // this just generates an _id for this object
    authorID: ObjectId(user2Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user2Details.uname, // gets uname of user2.
    rPhoto: user2Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant1Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Spicy Heat",
    pubdate: new Date('2020-04-02'),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    rOverallRate: 9, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!" 
};

mongodb.insertOne(reviewCollection, review1Details);

//add review2 created by user2 to restaurant1
var review2Details = {
    _id: ObjectId(),
    authorID: ObjectId(user2Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user2Details.uname, // gets uname of user2.
    rPhoto: user2Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant1Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Spicy Heat",
    pubdate: new Date('2020-03-26'),
    votes: 40,
    foodrate: 10,
    servicerate: 10,
    envrate: 10,
    rOverallRate: 10, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: " I love everything that has something to do with this restaurant. :)" 
};

mongodb.insertOne(reviewCollection, review2Details);


//add review3 created by user1 to restaurant2
var review2Details = {
    _id: ObjectId(),
    authorID: ObjectId(user1Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user1Details.uname, // gets uname of user2.
    rPhoto: user1Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant2Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Sunnies Cafe",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: " I love the food and ambiance but the service is slow for a cafe that is relatively not big." 
};

mongodb.insertOne(reviewCollection, review2Details);


