// require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

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

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});