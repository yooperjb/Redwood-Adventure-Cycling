const router = require('express').Router();
const { User_Routes } = require('../../models');
const sequelize = require('../../config/connection');


// GET /api/user-routes for testing
router.get('/', (req, res) => {
    console.log("User:", req.user);
    console.log("id:", req.user.id);
});

// POST /api/user-routes - create new user-route
router.post('/', (req, res) => {

    // console.log(req.user);

    User_Routes.create({
        ride_time: req.body.ride_time,
        ride_link: req.body.ride_link,
        date_completed: req.body.date_completed,
        user_id: req.user.id,
        route_id: req.body.route_id,
    })
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/user-routes/ - update a user-route bulk
router.put('/', (req, res) => {
    User_Routes.update(
        {
            approved: true,
        },
        {
            where: {
                id: req.body
            }
        }
    )
        .then(dbUserRouteData => {
            //console.log("dbUserRouteData",dbUserRouteData);
            if (!dbUserRouteData) {
                res.status(404).json({ message: 'No routes were approved' });
                return;
            }
            res.json(dbUserRouteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;