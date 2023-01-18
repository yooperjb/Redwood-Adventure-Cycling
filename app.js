require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers'); // import helper functions
const passport = require('./config/passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// create handlebars - pass in helper functions document
const hbs = exphbs.create({ helpers });

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 443;

const sess = {
    secret: process.env.SESSION_SECRET,
    
    rolling: true, // <-- Set `rolling` to `true`
    secureProxy: true,
    cookie: {
        httpOnly: true,
        maxAge: 8 * 60 * 60 * 1000 //8 hours;
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//Configure view engine to render handlebars templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('cookie-parser')()); // supposedly no longer need cookie-parser
// app.use(session({ secret: [process.env.SESSION_SECRET], resave: true, saveUninitialized: true }));
app.use(session(sess));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// turn on express routes
app.use(routes);

//turn on connection to db and server
// force:false if set to true would drop and re-create database on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});