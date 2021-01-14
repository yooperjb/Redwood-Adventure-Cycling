const router = require('express').Router();

// trying to access passport.authenticate function
//const passport = require('../server');
//const passport = require('passport');
// const StravaStrategy = require('../server');
//const express = require('../server');
//const app = require('../server');

// Initialize Passport and restore authentication state, if any, from the
// session.
//app.use(passport.initialize());
//app.use(passport.session());

// route to home page
router.get('/', (req, res) => {
    console.log("req",{user: req.user});
    res.render('homepage',
    // don't think anything needs to be passed to homepage
    { user: req.user });
    
});

// route to login page
router.get('/login',
  function(req, res){
    res.render('login');
  });

// need to figure out how to get these routes here
// // route to login via STRAVA
// router.get('/login/strava',
//     passport.authenticate('strava'));

// // If STRAVA authentication successful 
// router.get('/return', 
//   passport.authenticate('strava', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

//this is the profile page (dashboard) which uses ensureLoggedIn library
// router.get('/dashboard',
//     require('connect-ensure-login').ensureLoggedIn(),
//     function(req, res){
//         res.render('dashboard', { user: req.user });
//     });

module.exports = router;
// module.exports = passport;