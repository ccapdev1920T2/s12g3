// import module `express`
const express = require('express');

// import module `routes` from `routes/routes.js`
const routes = require('./routes/routes.js');

// import module `hbs`
const hbs = require('hbs');

// import module `express-session`
const session = require('express-session');

// import module `connect-mongo`
const MongoStore = require('connect-mongo')(session);

// import module `mongoose`
const mongoose = require('mongoose');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
// const port = 3000;

// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `routes/routes.js`
app.use('/', routes);

// connects to the database
db.connect();

// binds the server to a specific port
// app.listen(port, function () {
//     console.log('app listening at port ' + port);
// });

let port = process.env.PORT || 3000;
// if (port == null || port == "") {
//   port = 3000;
// }
app.listen(port, function () {
    console.log('app listening at port ' + port);
});
