const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');
const sequelize = require('../config/connection');

// route to home page
router.get('/', (req, res) => {
  // console.log("session", req.session);
  res.render('homepage', {
    user: req.user,
    //loggedIn: req.session.loggedIn
  });
});

// route to guidelines page /guidelines
router.get('/guidelines',
  function (req, res) {
    res.render('guidelines', { user: req.user });
});

// route to about page /about
router.get('/about',
  function (req, res) {
    res.render('about', { user: req.user });
});

// route to sponsors page /sponsors
router.get('/sponsors',
  function (req, res) {
    res.render('sponsors', { user: req.user });
});

// route to login page /login
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

// route to admin page /admin *Redirect non-ADMIN to home page
router.get('/admin', ensureLoggedIn('/'),
  function (req, res) {
    // redirect non-Admin to home page
    if (!req.user.isAdmin) {
      res.redirect('/')
    };

    User_Routes.findAll({
      where: {
        // use the ID from the session - need to compound with approved
        approved: 0
      },
      attributes: [
        'id', // need for update
        'route_id',
        'ride_time',
        'date_completed',
        'date_submitted',
        'ride_link',
        'approved'
      ],
      include: [
        {
          model: Routes,
          attributes: ['name']
        },
        {
          model: User,
          attributes: ['name']
        }
      ],
      order: sequelize.literal('date_submitted ASC')
    })
      .then(dbUserRoutesData => {
        // serialize data before passing to template
        const userRoutes = dbUserRoutesData.map(route => route.get({ plain: true }));
      
        res.render('admin', {
          user: req.user,
          userRoutes: { userRoutes },
        });
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

// route to create-route page /create-route
router.get('/create-route',
  function(req,res) {
    res.render('create-route', { user: req.user });
  });

//delete or post request and move to api route
router.delete('/logout',
  function (req, res) {
    req.session.destroy(() => {
      res.sendStatus(204) //successful, but not sending info back
    })
  });

module.exports = router;