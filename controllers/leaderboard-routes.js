const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const sequelize = require('../config/connection');
const { Op } = require('sequelize');
require('dotenv').config();

// route to leaderboard page /leaderboard
router.get('/', (req, res) => {
    
    // check if query was sent, pass to where object for filtering
    if (req.query.gender) {
        genderOptions = {
            where: {
                gender: req.query.gender
            }
        }
        switch(req.query.gender) {
            case 'M':
                gender = "Male";
                break;
            case 'F':
                gender = "W/T/F";
                break;
        }

    } else {
        genderOptions = {
            where: {}
        }
        gender = "Overall";
    }

    // not sure why this is here?
    if (req.query.route) {
      routeOptions = {
        where: {
            id: req.query.route
        }
      }
    } else {
      routeOptions = {
        where:{}
      }
    }

    return Promise.all([

    // get all ridden routes that have been approved for Overall Points Section
    // and is current year
    User_Routes.findAll({
      where: {
        approved: 1,
        date_completed:  {
          [Op.between]: [`${process.env.YEAR}/1/31`, `${process.env.YEAR}/12/1`],
        },
      },
      // get user_route info and sum points, elevation, mileage fields. Count ridden routes.
      attributes: ['user_id',
        [sequelize.fn('sum', sequelize.col('points')), 't_points'],
        [sequelize.fn('sum', sequelize.col('bonus_points')), 't_bonus_points'],
        [sequelize.fn('sum', sequelize.where(sequelize.col('points'), '+', sequelize.col('bonus_points'))), 'total_points'],
        [sequelize.fn('sum', sequelize.col('elevation')), 'total_elevation'],
        [sequelize.fn('sum', sequelize.col('mileage')), 'total_miles'],
        [sequelize.fn('count', sequelize.col('user_id')), 'total_routes']],
      
        // include user model to get user name and gender
        // include Routes model to get all route data
      include: [
        {
          model: User,
            attributes: ['name','gender'],
            where: genderOptions.where
        },
        {
          model: Routes,
          attributes: [],
        },
      ],
      // group the summed output by the user_id and order by total_points column
      group: ['user_id'],
      order: sequelize.literal('total_points DESC')
    })
      .then(dbUserPointData => dbUserPointData),
    
    // get all ridden routes that have been approved for Submitted Routes Table
    User_Routes.findAll({
      where: {
        approved: 1,
      },

      attributes: [
        'user_id','date_completed', 'date_submitted', 'bonus_points', 'route_id', 'photo'
      ], 

      include: [
        {
          model: User,
            attributes: ['name','gender'],
        },
        {
          model: Routes,
            attributes: ['name', 'points'],
        },
      ],
      order: [['date_submitted', 'ASC']]
    }).then(dbUserRouteData => dbUserRouteData),

    // get all approved Routes for Route Bonus Points Table
    Routes.findAll({
      attributes:[
        'id', 'name'
      ], 
      include:[
        {
          model: User_Routes,
          // attributes: ['date_completed', 'date_submitted', 'bonus_points', 'user_id', 'route_id'],
          attributes: ['bonus_points', 'user_id', 'route_id'],
          where: {
            approved: 1,
            bonus_points: [5,3,1]
          },
          
          include:[
            {
            model: User,
            attributes: ['name', 'gender'],
            where: genderOptions.where,
          }
          ],
        }
      ],
      order: [['name', 'ASC'],[User_Routes, 'bonus_points', 'DESC']]
    })
    
  ])
      .then(([dbUserPointData, dbUserRouteData, dbRoutesAttackersData]) => {
        
        // serialize user point, user route, and attack point data before passing to template
        // used for Overall Points Table
        const userPoints = dbUserPointData.map(user => user.get({ plain:true }));
        
        // used for Submitted Routes Table
        const userRoutes = dbUserRouteData.map(route => route.get({ plain:true }))

        // used for Bonus Points Attacker Table
        const attackerPoints = dbRoutesAttackersData.map(route => route.get({ plain:true }));
       
        console.log('userRoutes', userRoutes)
        console.log('attackerPoints', attackerPoints)

        res.render('leaderboard', {
            title: '2024 Leaderboard',
            gender: gender,
            user: req.user,
            userPoints: { userPoints },
            userRoutes: { userRoutes },
            attackerPoints: { attackerPoints },
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

module.exports = router;