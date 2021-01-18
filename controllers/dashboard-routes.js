const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../config/connection');
const { User_Routes, User, Routes } = require('../models');
const passport = require('../config/passport');


// GET route /dashboard
router.get('/', ensureLoggedIn('/login'), (req, res) => {

    // check if user is admin (from user table)
    if (req.user.isAdmin) {
        User_Routes.findAll({
            where: {
                // use the ID from the session - need to compound with approved
                approved: false
            },
            attributes: [
                'route_id',
                'photo',
                'ride_time',
                'date_completed',
                'ride_link',
                'user_id',
                'approved'
            ]
        })
            .then(dbRoutesData => {
                // serialize data before passing to template
                const routes = dbRoutesData.map(route => route.get({ plain: true }));
                res.render('dashboard', {
                    routes,
                    user: req.user
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        // if user not admin get all routes for dropdown and list all routes user has completed.
        return Promise.all([

            // find all routes user has completed
            User_Routes.findAll({
                where: {
                    // use the ID from the session - need to compound with approved eventually
                    user_id: req.user.id
                },
                attributes: [
                    'route_id',
                    'photo',
                    'ride_time',
                    'date_completed',
                    'ride_link',
                    "user_id"
                ],
                include: [
                    // include Route data
                    {
                        model: Routes,
                        attributes: ['name', 'points', 'map']
                    }
                ]
            })
                .then(dbUserRoutesData => dbUserRoutesData),

            // find all routes in routes table for dropdown
            Routes.findAll({
                attributes: [
                    'id',
                    'name',
                    'map'
                ],
            })
        ])
            .then(([dbUserRoutesData, dbRoutesData]) => {
                // serialize the promise returns from both of the db findAll()
                const userRoutes = dbUserRoutesData.map(route => route.get({ plain: true }))
                const routes = dbRoutesData.map(route => route.get({ plain: true }))

                // render dashboard page and pass userRoutes, routes, and loggedIn user 
                res.render('dashboard', {
                    userRoutes: { userRoutes },
                    routes: { routes },
                    user: req.user
                })
                console.log("userRoutes:", { userRoutes });
                console.log("routes:", { routes });
                console.log("userRoutes.route:", userRoutes[0].route);
                //console.log({routes});
            })

            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;