const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');
const sequelize = require('../config/connection');

// route to home page
router.get('/', (req, res) => {
  res.render('homepage', {
    user: req.user,
    //loggedIn: req.session.loggedIn
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

// route to leaderboard page /leaderboard
router.get('/leaderboard',
  function (req, res) {
    // get all ridden routes that have been approved
    User_Routes.findAll({
      where: {
        approved: 1,
      },
      // get user_route info and sum points, elevation, and mileage fields
      attributes: ['user_id',
        [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
        [sequelize.fn('sum', sequelize.col('elevation')), 'total_elevation'],
        [sequelize.fn('sum', sequelize.col('mileage')), 'total_miles']],
      // include user model to get user name
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Routes,
          attributes: [],
        },
      ],
      // group the summed output by the user id and order by total_points column
      group: ['user.id'],
      order: sequelize.literal('total_points DESC')
    })
      .then(dbUserPointData => {
        // serialize data before passing to template
        const userPoints = dbUserPointData.map(route => route.get({ plain: true }));
        res.render('leaderboard', {
          user: req.user,
          userPoints: { userPoints },
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

// route to admin page /admin
router.get('/admin', ensureLoggedIn('/'),
  function (req, res) {
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
        'ride_link',
        'approved'
      ],
      include: [
        // include Route information
        {
          model: Routes,
          attributes: ['name']
        },
        // include User information
        {
          model: User,
          attributes: ['name']
        }
      ],
    })
      .then(dbUserRoutesData => {
        // serialize data before passing to template
        const userRoutes = dbUserRoutesData.map(route => route.get({ plain: true }));
        res.render('admin', {
          user: req.user,
          userRoutes: { userRoutes },
        });
        console.log(userRoutes);
        console.log(req.user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

//delete or post request and move to api route
router.delete('/logout',
  function (req, res) {
    req.session.destroy(() => {
      res.sendStatus(204) //successful, but not sending info back
    })
  });

module.exports = router;
