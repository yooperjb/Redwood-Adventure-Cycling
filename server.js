require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const passport = require('passport');
const StravaStrategy = require('passport-strava').Strategy;
const { User } = require('./models');

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 3001;

//Cookieware
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

// configure the STRAVA Strategy for passport
passport.use(new StravaStrategy({
    clientID: process.env['STRAVA_CLIENT_ID'],
    clientSecret: process.env['STRAVA_CLIENT_SECRET'],
    callbackURL: '/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    
    User.findOne
    // In this example, the user's STRAVA profile is supplied as the user
    // record.  In a production-quality application, the STRAVA profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    console.log("Profile", profile);
    console.log("displayname", profile.displayName);
    //console.log("req", req );
    return cb(null, profile);
  }));

//In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session. Needs to eventually be user ID, not full user
// This occurs after authentication - is passed profile
passport.serializeUser(function(user, cb) {
cb(null, user);
console.log("User:",user);
});
passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});

const hbs = exphbs.create({});

//Configure view engine to render handlebars templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// turn on routes
app.use(routes);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login',
  function(req, res){
    res.render('login');
  });

// route to login via STRAVA
app.get('/login/strava',
    passport.authenticate('strava'));

// Check STRAVA authentication
app.get('/return', 
  // if authentication fails return to login page
  passport.authenticate('strava', { failureRedirect: '/login' }),
  // if user authenticated go to homepage
  function(req, res) {
    res.redirect('/');
  });

//this is the profile page (dashboard) which uses ensureLoggedIn library
app.get('/dashboard',
    //require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('dashboard', { user: req.user });
    });

//turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// module.exports = passport;
// module.exports = StravaStrategy;
// module.exports = express;
// module.exports = app;