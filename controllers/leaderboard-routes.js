const router = require('express').Router();
const { Routes, User_Routes, User } = require('../models');
const sequelize = require('../config/connection');


// route to leaderboard page /leaderboard
router.get('/', (req, res) => {
    
    console.log("query", req.query)
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

    // get all ridden routes that have been approved
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

    User_Routes.findAll({
      where: {
        approved: 1,
      },

      attributes: [
        'user_id','date_completed', 'date_submitted', 'bonus_points', 'route_id'
      ], 

      include: [
        {
          model: User,
            attributes: ['name','gender'],
            where: genderOptions.where
        },
        {
          model: Routes,
            attributes: ['name', 'points'],
            where: routeOptions.where
        },
      ],
      order: [['date_submitted', 'ASC']]
    })
    
  ])
      .then(([dbUserPointData, dbUserRouteData]) => {
      
        // serialize data before passing to template
        let place = 1;
        let routes = [];
        const userPoints = dbUserPointData.map(route => {
          let user_route = route.get({ plain: true });
          // create a position value
          user_route.position = place;
          place +=1;
          return user_route;
        });
        const userRoutes = dbUserRouteData.map(route => {
          let user_route = route.get({ plain:true });
          let isRoutePresent = routes.some((id) => id.route_id === user_route.route_id);
          if (!isRoutePresent){
            routes.push({route_id: user_route.route_id, name:user_route.route.name});
          }
          return user_route;
        })

        res.render('leaderboard', {
            title: '2023 Leaderboard',
            gender: gender,
            user: req.user,
            userPoints: { userPoints },
            userRoutes: { userRoutes },
            routes: { routes }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

module.exports = router;