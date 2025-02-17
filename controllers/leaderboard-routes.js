const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const sequelize = require('../config/connection');
const { Op } = require('sequelize');
require('dotenv').config();

// route to leaderboard page /leaderboard
router.get('/', async (req, res) => {
  try {
 
    const genderOptions = req.query.gender ? { where: { gender: req.query.gender } } : {};
    const gender = req.query.gender === 'M' ? 'Male' : req.query.gender === 'F' ? 'W/T/F' : 'Overall';
    const year = req.query.year || process.env.YEAR;
    const dateRange = [`${year}-01-01`, `${year}-12-01`];

    const [userPoints, userRoutes, attackerPoints] = await Promise.all([
      // Get all ridden, approved routes for "Overall Points" section for selected year
      User_Routes.findAll({
        where: {
          approved: 1,
          date_completed: {
            [Op.between]: dateRange,
          },
        },
        // get user_route info and sum points, elevation, mileage fields. Count ridden routes.
        attributes: [
          'user_id',
          // This adds route points and ride points columns (one of these should be 0)
          [sequelize.fn('sum', sequelize.col('elevation')), 'total_elevation'],
          [sequelize.fn('sum', sequelize.col('mileage')), 'total_miles'],
          [sequelize.fn('count', sequelize.col('user_id')), 'total_routes'],
          [sequelize.fn('sum', sequelize.col('ride_miles')), 'total_ride_miles'],
          [sequelize.fn('sum', sequelize.col('ride_elevation')), 'total_ride_elevation'],
          [sequelize.fn('SUM', sequelize.literal(`
            COALESCE(points, 0) + COALESCE(bonus_points, 0) + COALESCE(ride_points, 0)
        `)), 'total_points']
        ],
        // include User model to get user name and gender
        // include Routes model to get all route data
        include: [
          {
            model: User,
            attributes: ['name', 'gender'],
            where: {
              ...genderOptions.where,
            }
          },
          {
            model: Routes,
            attributes: [],
          },
        ],
        // Group by user_id and order by total_points column
        group: ['user_id'],
        order: sequelize.literal('total_points DESC')
      }),
      // Get all ridden, approved routes for selected year for "Submitted Routes" Table
      // * Does NOT filter in gender query
      User_Routes.findAll({
        where: {
          approved: 1,
          date_completed: {
            [Op.between]: dateRange,
          },
        },
        attributes: [
          'user_id','route_id','photo','date_submitted','ride_link'
        ],
        include: [
          {
            model: User,
            // attributes: ['name', 'gender'],
            attributes: ['name'],
          },
          {
            model: Routes,
            attributes: ['name'],
          },
        ],
        order: [['date_submitted', 'ASC']]
      }),
      
      // Get all approved routes for selected year for "Route Bonus (Attacker) Points" Table
      Routes.findAll({
        attributes: [
          'id', 'name'
        ],
        include: [
          {
            model: User_Routes,

            attributes: ['bonus_points', 'user_id', 'route_id'],
            where: {
              approved: 1,
              bonus_points: [5, 3, 1],
              date_completed: {
                [Op.between]: dateRange,
              },
            },

            include: [
              {
                model: User,
                attributes: ['name', 'gender'],
                where: {
                  ...genderOptions.where,
                }
              }
            ],
          }
        ],
        order: [['name', 'ASC'], [User_Routes, 'bonus_points', 'DESC']]
      })

    ]);

    // serialize user point, user route, and attack point data before passing to template
    // used for Overall Points Table
    const serializedUserPoints = userPoints.map(user => user.get({ plain: true }));

    // used for Submitted Routes Table
    const serializedUserRoutes = userRoutes.map(route => route.get({ plain: true }));

    // used for Bonus Points Attacker Table
    const serializedAttackerPoints = attackerPoints.map(route => route.get({ plain: true }));

    // Render leaderboard page
    res.render('leaderboard', {
      title: `${year} Leaderboard`,
      gender,
      user: req.user,
      userPoints: { userPoints: serializedUserPoints },
      userRoutes: { userRoutes: serializedUserRoutes },
      attackerPoints: { attackerPoints: serializedAttackerPoints },
      year,
    });
  } catch (err) {
    console.error('Error in leaderboard route:', err);
    res.status(500).json(err);
  }
});

module.exports = router;