const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');
const sequelize = require('../config/connection');
// const { route } = require('./leaderboard-routes');

// route to approvals page /admin/approvals *Redirect non-ADMIN to home page
router.get('/approvals', ensureLoggedIn('/'),
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
      
        res.render('approvals', {
          user: req.user,
          userRoutes: { userRoutes },
        });
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

// create-route page /admin/create-route *Redirect non-ADMIN to home page
  router.get('/create-route', ensureLoggedIn('/'),
  function (req, res) {
    // redirect non-Admin to home page
    if (!req.user.isAdmin) {
      res.redirect('/')
    };

    res.render('create-route', { user: req.user });
  });

module.exports = router;