const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');

// route to home page
router.get('/', (req, res) => {
    res.render('homepage', { user: req.user });
});

// route to login page
router.get('/login',
  function(req, res){
    res.render('login');
  });

// route to login/strava authentication
router.get('/login/strava',
    passport.authenticate('strava'));

// route to /return occurs after authentication happens
router.get('/return',
    // if authentication fails return to login page
    passport.authenticate('strava', { failureRedirect: '/login' }),
    // if user authenticated go to homepage
    function(req, res) {
      res.redirect('/');
    });

// route to profile page (dashboard) which uses ensureLoggedIn library
// router.get('/dashboard',
//     ensureLoggedIn('/login'),
//     function(req, res){
//         res.render('dashboard', { user: req.user });
//     });

// route to guidelines page /guidelines
router.get('/guidelines',
  function(req, res){
    res.render('guidelines');
});

module.exports = router;
