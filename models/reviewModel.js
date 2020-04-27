// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var ReviewSchema = new mongoose.Schema({
    // authorID -> used to identify which restaurant the review is for
    authorID: {
        type: String,
        required: true
    },
    reviewID:{
        type: String,
        required: false
    },
    restaurantID: {
        type: String,
        required: true,
    },
    restaurantName:{    //
        type: String,
        required: false
    },
    authoruname: {
        type: String,
        required: true
    },
    pubdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
    // rOverallRate: {
    //     type: Number,
    //     required: true
    // },
    // v is this suppuse to be string v
    foodrate: {
        type: Number,
        required: true
    },
    // v is this suppuse to be string v
    servicerate: {
        type: Number,
        required: true
    },
    // v is this suppuse to be string v
    envrate: {
        type: Number,
        required: true
    },
    rOverallRate:{
        type: Number,
        required: false
    },
    reviewText: {
        type: String,
        required: true
    },
    rPhoto:{
        type: String,
        required: false
    },
    rName:{
        type: String,
        required: false
    }

});
// exports a mongoose.model object based on `UserSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `users` -> plural of the argument `User`
module.exports = mongoose.model('review', ReviewSchema);
