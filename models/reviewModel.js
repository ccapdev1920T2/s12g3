// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var ReviewSchema = new mongoose.Schema({
    // uPhoto: {
    //     type: String,
    //     required: true
    // },
    // uName: {
    //     type: String,
    //     required: true
    // },

    // authorID -> used to identify which restaurant the review is for
    authorID: {
        type: Object,
        required: true
    },
    
    pubdate: {
        type: Date,
        required: true
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
    reviewText: {
        type: String,
        required: true
    }

});
// exports a mongoose.model object based on `UserSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `users` -> plural of the argument `User`
module.exports = mongoose.model('reviews', ReviewSchema);
