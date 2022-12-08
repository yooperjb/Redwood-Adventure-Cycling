require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers'); // import helper functions
const passport = require('./config/passport');
// create handlebars - pass in helper functions document
const hbs = exphbs.create({ helpers });

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 3001;



// const sess = {
//     secret: process.env.SESSION_SECRET,
//     //process.env.SESSION_SECRET
//     rolling: true, // <-- Set `rolling` to `true`
//     secureProxy: true,
//     cookie: {
//         httpOnly: true,
//         maxAge: 120000 //short test

//         // 2 * 60 * 60 * 1000 2 hours;
//     },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };
// app.use(session(sess));

//Configure view engine to render handlebars templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')());
app.use(session({ secret: [process.env.SESSION_SECRET], resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// turn on express routes
app.use(routes);

//turn on connection to db and server
// force:false if set to true would drop and re-create database on startup
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});