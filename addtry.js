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

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant3Details= {
    _id: ObjectId(),
    rPhoto: "Antonio's.jpg",
    rName: "Antonio's Restaurant",
    rCity: "Tagaytay",
    rType: "Casual Restaurant",
    rCuisine: "Filipino",
    rServes: "Barbeque, Spaghetti, Pastry",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 8.3 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 9.3, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.2 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant3Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant4Details= {
    _id: ObjectId(),
    rPhoto: "Sariwon.jpg",
    rName: "Sariwon Restaurant",
    rCity: "Bonifacio Global City",
    rType: "Casual Dining",
    rCuisine: "Korean",
    rServes: "Bulgogi, Bibimbap, Kimchi",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 8 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 10, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.3 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant4Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant5Details= {
    _id: ObjectId(),
    rPhoto: "Becky's.jpg",
    rName: "Becky's Kitchen",
    rCity: "Manila",
    rType: "Bakery",
    rCuisine: "Bakery",
    rServes: "Brownie, Butter Cake, Blueberry Cheesecake",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 8.5 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 9, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.2 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant5Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant6Details= {
    _id: ObjectId(),
    rPhoto: "Circles.jpg",
    rName: "Circles Event Cafe",
    rCity: "San Lorenzo",
    rType: "Casual Dining",
    rCuisine: "Asian, European",
    rServes: "Salmon, Roasted Beef, Steak",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant6Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant7Details= {
    _id: ObjectId(),
    rPhoto: "Pookaberry.jpg",
    rName: "Pookaberry Cafe",
    rCity: "Tomas Morato",
    rType: "Cafe",
    rCuisine: "Coffee",
    rServes: "Coffee, Big Breakfast, Wagyu",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 10 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 10, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 10 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant7Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant8Details= {
    _id: ObjectId(),
    rPhoto: "Balay.jpg",
    rName: "Balay Dako",
    rCity: "Tagaytay",
    rType: "Casual Dining",
    rCuisine: "Filipino",
    rServes: "Sisig, Puto Bumbong, Lechon Kawaii",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 9.5 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 9, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.5 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant8Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant9Details= {
    _id: ObjectId(),
    rPhoto: "Spiral.jpg",
    rName: "Spiral",
    rCity: "CCP Complex",
    rType: "Fine Dining",
    rCuisine: "European",
    rServes: "Foie Gras, Sea Food, Wine",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant9Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant10Details= {
    _id: ObjectId(),
    rPhoto: "CoCo.jpg",
    rName: "CoCo Ichibanya",
    rCity: "San Juan",
    rType: "Casual Dining",
    rCuisine: "Japansese",
    rServes: "Tonkatsu, Pork Cutlet, Tuna Salad",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant10Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant11Details= {
    _id: ObjectId(),
    rPhoto: "Va-Bene-Pasta-Deli.jpg",
    rName: "Va Bene Pasta Deli",
    rCity: "Dasmarinas",
    rType: "Casual Dining",
    rCuisine: "Italian",
    rServes: "Pasta, Pizza, Pastry",
    rAveFoodRate:0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0  //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant11Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant12Details= {
    _id: ObjectId(),
    rPhoto: "Benjarong.jpg",
    rName: "Benjarong",
    rCity: "San Lorenzo",
    rType: "Fining Dining",
    rCuisine: "Thai",
    rServes: "Pad Thai, Sweet Pork, Crispy Pork",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant12Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant13Details= {
    _id: ObjectId(),
    rPhoto: "Butcher-and-Sons.jpg",
    rName: "Butcher and Sons",
    rCity: "Baguio",
    rType: "French",
    rCuisine: "Italian",
    rServes: "Beek Steak, Salad, Fries",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant13Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant14Details= {
    _id: ObjectId(),
    rPhoto: "Cafe-Lidia.jpg",
    rName: "Cafe Lidia",
    rCity: "Marikina",
    rType: "Casual Dining",
    rCuisine: "American",
    rServes: "Pasta, Nachos, Carbonara",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant14Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant15Details= {
    _id: ObjectId(),
    rPhoto: "Oori-Korean.jpg",
    rName: "Oori Korean Restaurant",
    rCity: "Pasay",
    rType: "Casual Dining",
    rCuisine: "Korean",
    rServes: "Steak, Kimchi, Pastry",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 8 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 10, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.3 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant15Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant16Details= {
    _id: ObjectId(),
    rPhoto: "Yokocho.jpg",
    rName: "Yokocho",
    rCity: "Libertad",
    rType: "Quick Bites",
    rCuisine: "Japanse",
    rServes: "Chicken Chops, Salad, Sushi",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant16Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant17Details= {
    _id: ObjectId(),
    rPhoto: "Zumara.jpg",
    rName: "Zumara",
    rCity: "Taguig",
    rType: "Quick Bites",
    rCuisine: "Japanse",
    rServes: "Tempura, Sashimi, Sushi",
    rAveFoodRate: 10, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 8 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 10, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 9.3 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant17Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant18Details= {
    _id: ObjectId(),
    rPhoto: "Yi-Fang.jpg",
    rName: "Yi Fang Fruit Tea",
    rCity: "Mandaluyong",
    rType: "Beverage Shop",
    rCuisine: "Beverages",
    rServes: "Fruit Juice, Tea, Cookies",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant18Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant19Details= {
    _id: ObjectId(),
    rPhoto: "Bread-Broth-&-Beyond.jpg",
    rName: "Bread Broth & Beyond",
    rCity: "Mandaluyong",
    rType: "Casual Dining",
    rCuisine: "Mediterranean",
    rServes: "Bread, Salad, Big Breakfast",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant19Details);

// containing Photo name, restaurant name, city location, type of restaurant, Cuisine, Serves and overall rate.
var restaurant20Details= {
    _id: ObjectId(),
    rPhoto: "Shakey's.jpg",
    rName: "Shakey's",
    rCity: "Manila",
    rType: "Casual DIning",
    rCuisine: "American",
    rServes: "Pizza, Salad, Pastry",
    rAveFoodRate: 0, // take note that this should be the average of all foodratings in review for this particular restuarant (manual computation)
    rAveServiceRate: 0 , // take note that this should be the average of all rAveServiceRate in review for this particular restuarant (manual computation)
    rAveEnvironmentRate: 0, // take note that this should be the average of all rAveEnvironmentRate in review for this particular restuarant (manual computation)
    rOverallRate: 0 //take note that this should be the average of rAveFoodRate, rAveServiceRate, rAveEnvironmentRate
};

mongodb.insertOne(restaurantCollection, restaurant20Details);


// add user1
var user1Details = {
    _id: ObjectId(), // this just generates an _id for this object
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

// add user3
var user3Details = {
    _id: ObjectId(), // this just generates an _id for this object
    upic: "AnnieKendrick.jpg",
    uname: "anniekendrick",
    email: "anniekendrick@gmail.com",
    gender: "Female",
    pword: "$2b$10$ui2b9Q8Xi0Vy1jh8ghqLSeufONuXr04wevo23UzAnSxjMtu6NwmUC",
    ucity: "Mandaluyong",
    utype: "American",
    ulikes: "Beef Steak, Carbonara"
}

mongodb.insertOne(userCollection, user3Details);

// add user4
var user4Details = {
    _id: ObjectId(), // this just generates an _id for this object
    upic: "BruceLing.jpg",
    uname: "bruceling",
    email: "bruce@gmail.com",
    gender: "Male",
    pword: "$2b$10$ui2b9Q8Xi0Vy1jh8ghqLSeufONuXr04wevo23UzAnSxjMtu6NwmUC",
    ucity: "Tagaytay",
    utype: "Korean",
    ulikes: "Samgyup, beef"
}

mongodb.insertOne(userCollection, user4Details);

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
var review3Details = {
    _id: ObjectId(),
    authorID: ObjectId(user3Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user3Details.uname, // gets uname of user2.
    rPhoto: user3Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant3Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Antonio's Restaurant",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: " I love the food and ambiance but the service is slow for a cafe that is relatively not big." 
};

mongodb.insertOne(reviewCollection, review3Details);

var review4Details = {
    _id: ObjectId(),
    authorID: ObjectId(user4Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user4Details.uname, // gets uname of user2.
    rPhoto: user4Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant4Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Sariwon Restaurant",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: " I love the food and ambiance but the service is slow for a cafe that is relatively not big." 
};

mongodb.insertOne(reviewCollection, review4Details);

//add review1 created by user2 to restaurant1
var review5Details = {
    _id: ObjectId(), // this just generates an _id for this object
    authorID: ObjectId(user1Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user1Details.uname, // gets uname of user2.
    rPhoto: user1Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant5Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Becky's Kitchen",
    pubdate: new Date('2020-04-02'),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    rOverallRate: 9, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Great food at a great price! Love the fish plates as well as the salads. Chain restaurant that doesn't feel like a chain! Love this place!" 
};

mongodb.insertOne(reviewCollection, review5Details);

//add review2 created by user2 to restaurant1
var review6Details = {
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

mongodb.insertOne(reviewCollection, review6Details);

//add review3 created by user1 to restaurant2
var review7Details = {
    _id: ObjectId(),
    authorID: ObjectId(user2Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user2Details.uname, // gets uname of user2.
    rPhoto: user2Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant2Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Sunnies Cafe",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: " Stopped here for a snack on our way back to the Manchester airport. Had the boneless buffalo wings and potato skins appetizer and some French onion soup. Appetizer was very good - wings spicy but not too spicy and the potato skins were excellent. Courtney our server was excellent and friendly, knowledgeable. Would stop in again if in the area. It's a chain but pretty good - better than most. Prices very reasonable."
};

mongodb.insertOne(reviewCollection, review7Details);

var review8Details = {
    _id: ObjectId(),
    authorID: ObjectId(user4Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user4Details.uname, // gets uname of user2.
    rPhoto: user4Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant3Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Antonio's Restaurant",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Stopped in for dinner. Food was very good and reasonably priced. Ordered a steak dinner. It was tender and well seasoned." 
};

mongodb.insertOne(reviewCollection, review8Details);

//add review1 created by user2 to restaurant1
var review9Details = {
    _id: ObjectId(), // this just generates an _id for this object
    authorID: ObjectId(user1Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user1Details.uname, // gets uname of user2.
    rPhoto: user1Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant8Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Balay Dako",
    pubdate: new Date('2020-04-02'),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    rOverallRate: 9, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Ninety Nine Restaurants are well known in the New England area. Reasonably priced good food and drink. Lots of bar and dining room seating, with plenty of flat screen TV's to give yo something to do after ordering."
};

mongodb.insertOne(reviewCollection, review9Details);

//add review2 created by user2 to restaurant1
var review10Details = {
    _id: ObjectId(),
    authorID: ObjectId(user2Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user2Details.uname, // gets uname of user2.
    rPhoto: user2Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant8Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Balay Dako",
    pubdate: new Date('2020-03-26'),
    votes: 40,
    foodrate: 10,
    servicerate: 10,
    envrate: 10,
    rOverallRate: 10, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "More of a family oriented place with lots of kids and larger groups...beers are cold an burgers are good....but not where I would recommend couples or friends go for more of a complete experience. We got in without a wait at prime time on Friday night which tells you something. Sever was friendly, but looked too young to serve alcohol."
};

mongodb.insertOne(reviewCollection, review10Details);

//add review3 created by user1 to restaurant2
var review11Details = {
    _id: ObjectId(),
    authorID: ObjectId(user3Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user3Details.uname, // gets uname of user2.
    rPhoto: user3Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant17Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Zumara",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "This place is always crowded but there is usually room at the bar. It would never be my first choice but the service is very good and sometimes the food is too." 
};

mongodb.insertOne(reviewCollection, review11Details);

var review12Details = {
    _id: ObjectId(),
    authorID: ObjectId(user1Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user1Details.uname, // gets uname of user2.
    rPhoto: user1Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant15Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Oori Korean Restaurant",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "highly recomended ,hfrkgh,rghtkgh,gntkhgk jrthkt jrhrtih ittkighkt htjtkhgt htkghtk ihthktith tktkthttkigh" 
};

mongodb.insertOne(reviewCollection, review12Details);

//add review1 created by user2 to restaurant1
var review13Details = {
    _id: ObjectId(), // this just generates an _id for this object
    authorID: ObjectId(user4Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user4Details.uname, // gets uname of user2.
    rPhoto: user4Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant1Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Spicy Heat",
    pubdate: new Date('2020-04-02'),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    rOverallRate: 9, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Very good like i like! Tasty food and a good customer service. Better place to try a spicy delicious nugget." 
};

mongodb.insertOne(reviewCollection, review13Details);

//add review2 created by user2 to restaurant1
var review14Details = {
    _id: ObjectId(),
    authorID: ObjectId(user3Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user3Details.uname, // gets uname of user2.
    rPhoto: user3Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant7Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Spicy Heat",
    pubdate: new Date('2020-03-26'),
    votes: 40,
    foodrate: 10,
    servicerate: 10,
    envrate: 10,
    rOverallRate: 10, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "First time visit to this restaurant - Ordered a Caesar salad - asked for anchovies. A green salad arrived with chunks of toasted bread. NO EGG, NO Parmesan cheese , NO Anchovies, no Caesar salad but a dill mayonnaise . Wilted leaves(NOT Cos)"
};

mongodb.insertOne(reviewCollection, review14Details);

//add review3 created by user1 to restaurant2
var review15Details = {
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
    reviewText: "We all enjoyed our meals mac and cheese,burgers and chicken . The waitress was friendly,attentive and excellent server. The 99 is a very child friendly atmosphere at a very reasonable price. My grandson was very excited with the multiple serving of popcorn"
};

mongodb.insertOne(reviewCollection, review15Details);

var review16Details = {
    _id: ObjectId(),
    authorID: ObjectId(user1Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user1Details.uname, // gets uname of user2.
    rPhoto: user1Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant4Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Sariwon Restaurant",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Excellent food. Authentic PuertoRican flavors. Excellent service. Andres, our server was very courteous. We really recommend this restaurant." 
};

mongodb.insertOne(reviewCollection, review16Details);

//add review1 created by user2 to restaurant1
var review17Details = {
    _id: ObjectId(), // this just generates an _id for this object
    authorID: ObjectId(user2Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user2Details.uname, // gets uname of user2.
    rPhoto: user2Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant3Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Antonio's Restaurant",
    pubdate: new Date('2020-04-02'),
    votes: 12,
    foodrate: 10,
    servicerate: 9,
    envrate: 8,
    rOverallRate: 9, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Have visited this place to eat many times. The food is fresh hot and delicious, portions are plentiful. Staff are lovely, polite, friendly and helpful. Would recommend this eating place to everyone." 
};

mongodb.insertOne(reviewCollection, review17Details);

//add review2 created by user2 to restaurant1
var review18Details = {
    _id: ObjectId(),
    authorID: ObjectId(user2Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user2Details.uname, // gets uname of user2.
    rPhoto: user2Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant2Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Sunnies Cafe",
    pubdate: new Date('2020-03-26'),
    votes: 40,
    foodrate: 10,
    servicerate: 10,
    envrate: 10,
    rOverallRate: 10, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "I had lunch with my family,the food was wonderful ,fresh ,properly prepared and a great value for the price.In addition to the nice meal the staff especially Romany are very friendly and efficient." 
};

mongodb.insertOne(reviewCollection, review18Details);

//add review3 created by user1 to restaurant2
var review19Details = {
    _id: ObjectId(),
    authorID: ObjectId(user3Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user3Details.uname, // gets uname of user2.
    rPhoto: user3Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant4Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Sariwon Restaurant",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "We eat here quite often, either as a couple or family. wait staff is generally very good. Food always comes out hot and well prepared. Restaurant is clean as well as the bathrooms." 
};

mongodb.insertOne(reviewCollection, review19Details);

var review20Details = {
    _id: ObjectId(),
    authorID: ObjectId(user1Details._id).toString(), // gets _id of user2. this indicates that user2 is the author of the review
    rName: user1Details.uname, // gets uname of user2.
    rPhoto: user1Details.upic, // gets upic of user2.
    restaurantID: ObjectId(restaurant5Details._id).toString(), //gets the _id of restaurant1Details. this indicates that the review is for that restaurant
    restaurantName: "Becky's Kitchen",
    pubdate: new Date('2020-03-27'),
    votes: 3,
    foodrate: 10,
    servicerate: 8,
    envrate: 10,
    rOverallRate: 9.3, //take note that this should be the average of foodrate, servicerate, envrate
    reviewText: "Me and the wifey visited a 99 Restaurant earlier this summer in Salem NH. We posted a poor review. Was contacted in the comments section of my review was given a # and asked to call in to speak to a customer relations representative. They apologized for our experience and offered to mail us a gift card. They sent $15 card. Welp! We went to use it at the curb side.....”Wait for it!" 
};

mongodb.insertOne(reviewCollection, review20Details);
