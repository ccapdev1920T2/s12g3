// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `restaurants`
var RestaurantSchema = new mongoose.Schema({
    rPhoto: {
        type: String,
        required: true
    },
    rName: {
        type: String,
        required: true
    },
    rCity: {
        type: String,
        required: true
    },
    rType: {
        type: String,
        required: true
    },
    rCuisine: {
        type: String,
        required: true
    },
    rServes: {
        type: String,
        required: true
    },
    rOverallRate: {
        type: Number,
        required: true
    },
    restReview:{
        type: Object,
        required: false
    }
    
});
// exports a mongoose.model object based on `UserSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `users` -> plural of the argument `User`
module.exports = mongoose.model('restaurants', RestaurantSchema);
