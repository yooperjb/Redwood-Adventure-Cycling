const router = require('express').Router();
const passport = require('../config/passport');
const sequelize = require('../config/connection');

// route to home page
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      title: 'Redwood Adventure Cycling',
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error")
  }
});

// route to guidelines page /guidelines
router.get('/guidelines', async (req, res) => {
  try {
    res.render('guidelines', {
      title: 'RAC-Guidelines',
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error")
  }
});

// route to about page /about
router.get('/about',
  function (req, res) {
    res.render('about', {
      title: 'RAC-About',
      user: req.user
    });
  });

// route to sponsors page /sponsors
router.get('/sponsors',
  function (req, res) {
    res.render('sponsors', {
      title: 'RAC-Sponsors',
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

// route to soldiers on singletrack page /sos
router.get('/sos',
  function (req, res) {
    res.render('sos', {
      title: 'SOS',
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

//change to post and move to api route
// route to /return occurs after authentication happens
// router.get('/return',
//   // if authentication fails return to login page
//   passport.authenticate('strava', { failureRedirect: '/login' }),
//   // if user authenticated go to homepage
//   function (req, res) {
//     res.redirect('/');
//   });

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