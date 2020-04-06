// import module from `../models/db.js`
const db = require('../models/db.js');

// defines an object which contains functions executed as callback
// when a client requests for a certain path in the server
const controller = {

    // executed when the client sends an HTTP GET request `/favicon.ico`
    // as defined in `../routes/routes.js`
    getFavicon: function (req, res) {
        res.status(204);
    },

    // executed when the client sends an HTTP GET request `/:username`
    // as defined in `../routes/routes.js`
    getProfile: function (req, res) {

        // gets the parameter `username` from the URL
        var u = req.params.username;

        // creates an object `query`
        // which assigns the value of the variable `u` to field `username`
        var query = {username: u};

        // calls the function findOne()
        // defined in the `database` object in `../models/db.js`
        // this function searches the collection `profiles`
        // based on the value set in object `query`
        // the third parameter is a callback function
        // this called when the database returns a value
        // saved in variable `result`
        db.findOne('profiles', query, function (result) {

            // renders `../views/profile.hbs`
            // with the values in variable `results`
            res.render('profile', result);
        });
    },
    // try codes 
    /*getrest_Info: function (req, res) {

        // gets the parameter `username` from the URL
        var restaurant_name = req.params.rname;

        // creates an object `query`
        // which assigns the value of the variable `u` to field `username`
        var query = {rname: restaurant_name};

        // calls the function findOne()
        // defined in the `database` object in `../models/db.js`
        // this function searches the collection `profiles`
        // based on the value set in object `query`
        // the third parameter is a callback function
        // this called when the database returns a value
        // saved in variable `result`
        db.findOne('rest_info', query, function (result) {

            // renders `../views/profile.hbs`
            // with the values in variable `results`
            res.render('rest_info', result);
        });
    },*/


    //hi so this gets the info from form name="newuser"
    // added by xavier (just to note na dont trust this too much)
    postUserInfo: function (req, res) {
        console.log(req.body); // data from the form is stored
        var fN = req.params.fName;  //basically just stores the data in individual vars
        var lN = req.params.lName;
        var usern = req.params.username;
        var b = req.params.bio;

        //put them back together but formatted.
        // format ->   {name in the db: local name (the vars)}
        // an attempt to make it not hardcoded
        // var query = {"fName": fN, "lName":lN, "username":usern, "bio":b }  
        

        // code on the line after this works. it is hardcoded
        // to check, after clicking submit, go to localhost:9090/sxn   or whatever the username is
        var query = {"fName" : "xavier", "lName" : "nieva", "username" : "sxn", "bio" : "so yea im sean i just wanna sleep yknow" };
     
        console.log(fN);  // for debugging purposes
        console.log(lN);
        console.log(usern);
        console.log(b);
        console.log(query);

        db.insertOne('profiles', query); // put data in query into the database, sepcifically in 'profiles' collection

        res.render('insert'); //just goes back to insert.hbs (refreshes the page or smth)
    },

    // added by xavier (just to note na dont trust this too much)
    getUserInfo: function (req, res) {
        res.render('insert');
    },

    // getRestaurants: function(req, res) {

    //     restaurant.find({}, function (err, restaurant){

    //         console.log(restaurant);

    //        res.render('home.hbs', {restaurant: restaurant}); 
    //     })
        
        
    // },

    getOneRestaurant: function(req, res) {
        res.render('restaurant.hbs', {
            
            rPhoto: "cones-on-head.jpg",
            rName: "Spicy Heat",
            rCity: "Manila City",
            rType: "Casual Restaurant",
            rCuisine: "Italian",
            rServes: "Pasta, Pizza, Salad, Pastry",
            rOverallRate: 10.0,
            rAveFoodRate: 10.0,
            rAveServiceRate: 10.0,
            rAveEnvironmentRate: 10.0,
            
            restreview: [
                {
                    uPhoto: "BobJohnson.jpg",
                    uName: "Bob Johnson",
                    pubdate: "February 25, 2019",
                    rOverallRate: 10.0,
                    foodrate: "8",
                    servicerate: "9",
                    envrate: "8.8",
                    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!"
                 },
                 {
                    uPhoto: "JimmyJones.jpg",
                    uName: "Jimmy Jones",
                    pubdate: "January 3, 2019",
                    rOverallRate: 10.0,
                    foodrate: "8",
                    servicerate: "9",
                    envrate: "8.8",
                    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!"
                },
                 {
                    uPhoto: "RobertSmith.jpg",
                    uName: "Robert Smith",
                    pubdate: "February 25, 2019",
                    rOverallRate: 10.0,
                    foodrate: "8",
                    servicerate: "9",
                    envrate: "8.8",
                    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!"
                 }
            ]
        });
    },

    getLogin: function(req, res) {
        res.render('login.hbs', {
    
        });
    },

    getRegister: function(req, res) {
        res.render('register.hbs', {
        });
    },

    getSetting: function(req, res) {
        res.render('useraccountsetting.hbs', {
            // upic: "JimmyJones.jpg"
        });
    },

    getReview:  function(req, res) {
        res.render('review.hbs', {
            reviewrest: {
                rimage: "meatgarden.jpg",
                rname: "The Meat Garden",
                pubdate: "February 25, 2019", 
                ovalreview: "8.6",
                foodrate: "8",
                servicerate: "9",
                envrate: "8.8",
                reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!"
            },
    
            comments:
            [
                {
                    image: "doctor.png",
                    name: "Den Don Doctor",
                    pubdate: "February 25, 2019", 
                    commenttext: "yummerz"
                },
                {
                    image: "doctor.png",
                    name: "Den Don Doctor 2",
                    pubdate: "February 26, 2019", 
                    commenttext: "yummerzzzzz"
                },
            ]
    
    
        });
    },

    // getEditReview: function(req, res) {
    //     res.render('reviewedit.hbs', {
    //     });
    // },

    getEditComment: function(req, res) {
        res.render('commentedit.hbs', {
            image: "doctor.png",
            name: "Den Don Doctor",
            pubdate: "February 25, 2019", 
            commenttext: "yummerz"
        });
    },

    getUser: function(req, res) {
        res.render('user.hbs', {
            useraccount: {
                username: "bobjohnson",
                uphoto: "BobJohnson.jpg",
                uname: "Bob Johnson",
                ucity: "Manila",
                utype: "Italian",
                ulikes: "Pasta, Soup, Barbeque, Seafood",
            },
    
            reviewsRest: [
                {
                    rPhoto: "meatgarden.jpg",
                    rName: "The Meat Garden",
                    pubdate: "February 25, 2019",
                    rOverallRate: 10.0,
                    foodrate: "8",
                    servicerate: "9",
                    envrate: "8.8",
                    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!"
                 }, 
                 {
                    rPhoto: "mendokoro-ramenba.jpg",
                    rName: "Fair Feeds",
                    pubdate: "February 25, 2019",
                    rOverallRate: 10.0,
                    foodrate: "8",
                    servicerate: "9",
                    envrate: "8.8",
                    reviewText: "My wife and I had our last dinner here more than a year ago. My wife and I just remembered the place. The food did not disappoint! Frazzled Cook, especially their Truffle Pasta, is her new favourite. I am from the South but will definitely eat here again!"
                 }
                ]
            
        });
    }    
}

// exports the object `controller` (defined above)
// when another script exports from this file
module.exports = controller;
