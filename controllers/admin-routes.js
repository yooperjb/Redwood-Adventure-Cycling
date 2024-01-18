const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');
const sequelize = require('../config/connection');
require('dotenv').config();

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
          title: 'Admin Approvals',
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
  router.get('/create-route', ensureLoggedIn('/'), async function (req, res) {
    // redirect non-Admin to home page
    if (!req.user.isAdmin) {
      return res.redirect('/');
    }

    try {
      // Fetch all routes for given year
      const allRoutes = await Routes.findAll({
        where: {
          year: process.env.YEAR,
        },
        order: [['name', 'ASC']],
        attributes:[
          'id',
          'name',
        ],
        
      });

      const serializedRoutes = allRoutes.map(route => route.get({ plain: true }));

      // console.log('allRoutes', serializedRoutes);
      res.render('create-route', { 
        title: 'Admin Routes',
        user: req.user,
        routes: serializedRoutes, // Pass routes to template
      });

    } catch (error) {
      console.err('Error fetching routes:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;