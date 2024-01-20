const router = require('express').Router();
const passport = require('../config/passport');
const sequelize = require('../config/connection');

// route to home page
router.get('/', (req, res) => {
  res.render('homepage', {
    title: 'Redwood Adventure Cycling',
    user: req.user,
  });
});

// route to guidelines page /guidelines
router.get('/guidelines',
  function (req, res) {
    res.render('guidelines', { 
      title: 'RAC-Guidelines',
      user: req.user });
});

// route to about page /about
router.get('/about',
  function (req, res) {
    res.render('about', { 
      title: 'RAC-About',
      user: req.user });
});

// route to sponsors page /sponsors
router.get('/sponsors',
  function (req, res) {
    res.render('sponsors', { 
      title: 'RAC-Sponsors',
      user: req.user });
});

// route to northcoast bike rides page /ncbr
router.get('/ncbr',
  function (req, res) {
    res.render('ncbr', { 
      title: 'NCBR',
      user: req.user });
});

// route to soldiers on singletrack page /sost
router.get('/sost',
  function (req, res) {
    res.render('sost', { 
      title: 'SOST',
      user: req.user });
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
router.get('/return',
  // if authentication fails return to login page
  passport.authenticate('strava', { failureRedirect: '/login' }),
  // if user authenticated go to homepage
  function (req, res) {
    res.redirect('/');
  });

//delete or post request and move to api route
router.delete('/logout',
  function (req, res) {
    req.session.destroy(() => {
      res.sendStatus(204) //successful, but not sending info back
    })
  });

module.exports = router;