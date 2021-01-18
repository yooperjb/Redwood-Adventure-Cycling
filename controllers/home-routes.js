const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');

// route to home page
router.get('/', (req, res) => {
  res.render('homepage', {
    user: req.user,
    loggedIn: req.session.loggedIn
  });
});

// route to login page
router.get('/login',
  function (req, res) {
    res.render('login');
  });
//change to post and move to api route
// route to login/strava authentication
router.get('/login/strava',
  passport.authenticate('strava'));

//change to post and move to api route
// route to /return occurs after authentication happens
router.get('/return',
  // if authentication fails return to login page
  passport.authenticate('strava', { failureRedirect: '/login' }),
  // if user authenticated go to homepage
  function (req, res) {
    res.redirect('/');
  });

// route to guidelines page /guidelines
router.get('/guidelines',
  function (req, res) {
    res.render('guidelines', { user: req.user });
  });

//delete or post request and move to api route
router.delete('/logout',
  function (req, res) {
    req.session.destroy(() => {
      res.sendStatus(204) //successful, but not sending info back
    })
  }
)

// route to leaderboard page
router.get('/leaderboard',
  function (req, res) {
    res.render('leaderboard');
  });

module.exports = router;
