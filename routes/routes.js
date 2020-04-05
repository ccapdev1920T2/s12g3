
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js')

// import module `homeCntroller` from `../controllers/controller.js`
const homeController = require('../controllers/homeController.js')

// import module `registerController` from `../controllers/registerController.js`
const registerController = require('../controllers/registerController.js');

// import module `userController` from `../controllers/userController.js`
const userController = require('../controllers/userController.js');

// import module `restaurantController` from `../controllers/restaurantController.js`
const restaurantController = require('../controllers/restaurantController.js');

// import module `useraccountsettingController` from `../controllers/useraccountsettingController.js`
const useraccountsettingController = require('../controllers/useraccountsettingController.js');

// import module `useraccountsettingController` from `../controllers/loginController.js`
const loginController = require('../controllers/loginController.js');

// import module `useraccountsettingController` from `../controllers/logoutController.js`
const logoutController = require('../controllers/logoutController.js');

// import module `deleteControllerController` from `../controllers/deleteController.js`
const deleteController = require('../controllers/deleteController.js');

const app = express();

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// execute function getFavicon()
// defined in object `controller` in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/favicon.ico`
// app.get('/favicon.ico', controller.getFavicon);

// execute function getFavicon()
// defined in object `controller` in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:username`
// where `username` is a parameter

// app.get('/:username', controller.getProfile);

// exports the object `app` (defined above)
// when another script exports from this file

//module.exports = app;


//goes to homepage
//app.get('/', controller.getRestaurants);

//goes to the HARDCODED restaurant page
app.get('/restaurant', controller.getOneRestaurant);

//goes to the HARDCODED restaurant page
app.get('/home/:username', homeController.getRestaurants);

//goes to a specific restaurant page
app.get('/restaurant/:id', restaurantController.getRestaurant);

app.get('/restaurant/delete/:reviewID', deleteController.deleteReview);


//goes to login page
app.get('/login', controller.getLogin);

//post to login page
app.post('/login', loginController.postLogin);

//logs out current logged in user
app.get('/logout', logoutController.getLogout);

app.post('/home/:uname', loginController.postLogin);

//goes to register page
// execute function getSignUp()
// defined in object `signupController` in `../controllers/registerController.js`
// when a client sends an HTTP GET request for `/register`
app.get('/register', registerController.getSignUp);

//goes to register page
// execute function postSignUp()
// defined in object `signupController` in `../controllers/registerController.js`
// when a client sends an HTTP POST request for `/register`
app.post('/register', registerController.postSignUp);

//goes to user account setting page
app.get('/useraccountsetting', useraccountsettingController.getUAS);

//goes to register page
// execute function putUAS()
// defined in object `signupController` in `../controllers/uasController.js`
// when a client sends an HTTP POST request for `/useraccountsetting`
//app.put('/useraccountsetting', useraccountsettingController.putUAS);

//goes to account setting page of user with that username
app.post('/useraccountsetting', useraccountsettingController.postUAS);

//goes to account setting page of user with that username
app.get('/useraccountsetting/:username', useraccountsettingController.getUAS);

app.post('/useraccountsetting/:username', useraccountsettingController.postUAS);

//goes to review page
app.get('/review', controller.getReview);

//goes to edit review page
app.get('/editreview', controller.getEditReview);

//goes to edit comment page
app.get('/editcomment', controller.getEditComment);

//goes to user profile page
app.get('/user', userController.getUser);

//goes to user profile page
app.get('/user/:username', userController.getUserByUN);

//app.get('/:rname', restaurantController.getrest_Info);
// try codes
app.get('/', homeController.getRestaurants);

module.exports = app;