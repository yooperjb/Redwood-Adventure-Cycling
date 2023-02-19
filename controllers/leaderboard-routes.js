const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const sequelize = require('../config/connection');


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

    // get all ridden routes that have been approved for Overall Points
    User_Routes.findAll({
      where: {
        approved: 1,
      },
      // get user_route info and sum points, elevation, mileage fields. Count ridden routes.
      attributes: ['user_id',
        [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
        [sequelize.fn('sum', sequelize.col('bonus_points')), 'total_bonus_points'],
        [sequelize.fn('sum', sequelize.where(sequelize.col('points'), '+', sequelize.col('bonus_points'))), 'total_total_points'],
        [sequelize.fn('sum', sequelize.col('elevation')), 'total_elevation'],
        [sequelize.fn('sum', sequelize.col('mileage')), 'total_miles'],
        [sequelize.fn('count', sequelize.col('user_id')), 'total_routes']],
      // include user model to get user name
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
      // group the summed output by the user id and order by total_total_points column
      group: ['user_id'],
      order: sequelize.literal('total_total_points DESC')
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

    // get all Routes that have been ridden for Route Bonus Points Table
    Routes.findAll({
      attributes:[
        'id', 'name'
      ], 
      include:[
        {
          model: User_Routes,
          attributes: ['date_completed', 'date_submitted', 'bonus_points', 'user_id', 'route_id'],
          where: {
            approved: 1,
            bonus_points: [5,3,1]
          },
          // order: [['bonus_points', 'DSC']],
          include:[
            {
            model: User,
            attributes: ['name', 'gender'],
            where: genderOptions.where,
            order: [['bonus_points', 'DESC']]
          }
          ],
          // order: [['bonus_points', 'DSC']]
        }
      ],
      order: [['name', 'ASC']] 
    })
    
  ])
      .then(([dbUserPointData, dbUserRouteData, dbRoutesAttackersData]) => {
        
        // serialize user point data before passing to template
        // used for Overall Points Table
        const userPoints = dbUserPointData.map(user => user.get({ plain:true }));
        
        // serialize user route data before passing to template
        // used for Submitted Routes Table
        const userRoutes = dbUserRouteData.map(route => route.get({ plain:true }))

        // serialize user attack point data before passing to template
        // used for Bonus Points Attacker Table
        const attackerPoints = dbRoutesAttackersData.map(route => route.get({ plain:true }));
       
        res.render('leaderboard', {
            title: '2023 Leaderboard',
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