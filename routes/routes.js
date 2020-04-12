// import module `express`
const express = require('express');

// import module `homeCntroller` from `../controllers/controller.js`
const homeController = require('../controllers/homeController.js')

// import module `registerController` from `../controllers/registerController.js`
const registerController = require('../controllers/registerController.js');

// import module `useraccountsettingController` from `../controllers/loginController.js`
const loginController = require('../controllers/loginController.js');

// import module `useraccountsettingController` from `../controllers/logoutController.js`
const logoutController = require('../controllers/logoutController.js');

// import module `userController` from `../controllers/userController.js`
const userController = require('../controllers/userController.js');

// import module `useraccountsettingController` from `../controllers/useraccountsettingController.js`
const useraccountsettingController = require('../controllers/useraccountsettingController.js');

// import module `restaurantController` from `../controllers/restaurantController.js`
const restaurantController = require('../controllers/restaurantController.js');

// import module `reviweEditController` from `../controllers/reviewEditController.js`
const reviewEditController = require('../controllers/reviewEditController.js');

// import module `deleteControllerController` from `../controllers/deleteController.js`
const deleteController = require('../controllers/deleteController.js');

// import module `searchController` from `../controllers/searchController.js`
const searchController = require('../controllers/searchController.js');

const app = express();

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));



//CONTROLLER.JS




//REVIEWEDITCONTROLLER.JS
//goes to the edit review page
app.get('/editreview/:reviewID', reviewEditController.getReviewEdit);
//post to edit review page
app.post('/editreview', reviewEditController.postReviewEdit);


//RESTAURANTCONTROLLER.JS
//goes to the restaurant page
app.get('/restaurant', restaurantController.getReview);
//goes to a specific restaurant page
app.get('/restaurant/:id', restaurantController.getRestaurant);
//post to the restaurant page
app.post('/restaurant', restaurantController.postReview);


//LOGINCONTROLLER.JS
//goes to login page
app.get('/login', loginController.getLogin);
//post to login page
app.post('/login', loginController.postLogin);
//goes to the HARDCODED restaurant page
app.post('/home/:uname', loginController.postLogin);


//HOMECONTROLLER.JS
//goes to the home page
app.get('/', homeController.getRestaurants);
//goes to the HARDCODED restaurant page
app.get('/home/:username', homeController.getRestaurants);


//DELETECONTROLLER.JS
//goes to a specific restaurant page to delete review
//reviewID is the ObjectID of the review. Used to identify what review is being deleted
app.get('/restaurant/delete/:reviewID', deleteController.deleteReview);


//LOGOUTCONTROLLER.JS
//logs out current logged in user
app.get('/logout', logoutController.getLogout);


//REGISTERCONTROLLER.JS
//goes to register page
app.get('/register', registerController.getSignUp);
//post to register page
app.post('/register', registerController.postSignUp);


//USERACCOUNTSETTINGCONTROLLER.JS
//goes to user account setting page
app.get('/useraccountsetting', useraccountsettingController.getUAS);
//post to user account setting page
app.post('/useraccountsetting', useraccountsettingController.postUAS);
//goes to account setting page of user with that username
app.get('/useraccountsetting/:username', useraccountsettingController.getUAS);
//post to account setting page of user with that username
app.post('/useraccountsetting/:username', useraccountsettingController.postUAS);


//USERCONTROLLER.JS
//goes to user profile page
app.get('/user', userController.getUser);
//goes to specfic user profile page
app.get('/user/:username', userController.getUserByUN);

module.exports = app;