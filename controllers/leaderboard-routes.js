const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../config/passport');
const sequelize = require('../config/connection');

// route to leaderboard page /leaderboard

router.get('/',
  function (req, res) {
    // get all ridden routes that have been approved
    User_Routes.findAll({
      where: {
        approved: 1,
      },
      // get user_route info and sum points, elevation, mileage fields. Count ridden routes.
      attributes: ['user_id',
        [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
        [sequelize.fn('sum', sequelize.col('elevation')), 'total_elevation'],
        [sequelize.fn('sum', sequelize.col('mileage')), 'total_miles'],
        [sequelize.fn('count', sequelize.col('user_id')), 'total_routes']],
      // include user model to get user name
      include: [
        {
          model: User,
          attributes: ['name','sex'],
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
        //console.log("userPoints: ", userPoints);
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


module.exports = router;