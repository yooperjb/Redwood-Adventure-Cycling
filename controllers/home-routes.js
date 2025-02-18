const router = require('express').Router();
const passport = require('../config/passport');
const sequelize = require('../config/connection');
const quotes = require('../utils/quotes.js');
require('dotenv').config();

// route to home page
router.get('/', async (req, res) => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    randomQuote.text = randomQuote.text.replace(/\n/g, '<br>'),

    res.render('homepage', {
      title: 'Redwood Adventure Cycling',
      user: req.user,
      quote: randomQuote
    });
  } catch (err) {
    console.error("Error loading homepage:", err);
    res.status(500).json({ error: true, message: "Failed to load homepage." })
  }
});

// route to about page /about
router.get('/about', async (req, res) =>{
  try{
    res.render('about', {
      title: 'RAC-About',
      user: req.user,
      year: process.env.YEAR
    });
  } catch (error) {
    console.err(error);
    res.status(500).send("Internal Server Error")
  }
});

// route to guidelines page /guidelines
router.get('/guidelines', async (req, res) => {
  try {
    res.render('guidelines', {
      title: 'RAC-Guidelines',
      user: req.user,
      year: process.env.YEAR
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error")
  }
});

// route to sponsors page /sponsors
router.get('/sponsors', async (req, res) => {
  try {
    res.render('sponsors', {
      title: 'RAC-Sponsors',
      user: req.user,
      year: process.env.YEAR
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error")
  }
});

// route to point calculator page /calculator
router.get('/calculator', async (req, res) => {
  try {
    res.render('calculator', {
      title: 'Calculator',
      user: req.user,
      year: process.env.YEAR
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error")
  }
});

// route to humboldt composite mtb page /hcmtb
router.get('/hcmtb',
  function (req, res) {
    res.render('hcmtb', {
      title: 'HCMTB',
      user: req.user
    });
  });

// route to northcoast bike rides page /ncbr
router.get('/ncbr',
  function (req, res) {
    res.render('ncbr', {
      title: 'NCBR',
      user: req.user
    });
  });

// route to mountain bike tribal trail alliance page /mbtta
router.get('/mbtta',
  function (req, res) {
    res.render('mbtta', {
      title: 'MBTTA',
      user: req.user
    });
  });

// route to login page /login
router.get('/login',
  function (req, res) {
    res.render('login', {
      title: 'RAC-Login'
    });
  });

//change to post and move to api route
// route to login/strava authentication
router.get('/login/strava',
  passport.authenticate('strava'));

router.get('/return', async (req, res, next) => {
  passport.authenticate('strava', async (err, user, info) => {
    try {
      if (err) {
        // Handle error
        console.error(err);
        return res.redirect('/login');
      }

      if (!user) {
        // User not authenticated, redirect to login
        return res.redirect('/login');
      }

      // Full authentication occurred, redirect to homepage
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return res.redirect('/login');
        }

        return res.redirect('/');
      });
    } catch (error) {
      console.error(error);
      return res.redirect('/login');
    }
  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  req.logout(); // This is a function provided by Passport to terminate a login session
  res.sendStatus(204);
});

module.exports = router;