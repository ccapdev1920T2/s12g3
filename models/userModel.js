// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    upic: {
        type: String,
        required: false,
        // get: v => `${global}${v}`,
        default: "UserIcon.png"
    },
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: false
    },
    pword: {
        type: String,
        required: true
    },
    ucity: {
        type: String,
        required: false
    },
    utype: {
        type: String,
        required: false
    },
    ulikes:{
        type: String,
        required: false
    }

});

// exports a mongoose.model object based on `UserSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `users` -> plural of the argument `User`
module.exports = mongoose.model('User', UserSchema);
