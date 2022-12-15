const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../config/connection');
const { User_Routes, Routes } = require('../models');
const passport = require('../config/passport');
// This module doesn't seem to work
// const htmlDurationPicker = require("html-duration-picker");


// GET route /dashboard
router.get('/', ensureLoggedIn('/login'), (req, res) => {

    return Promise.all([

        // find all routes user has completed
        User_Routes.findAll({
            where: {
                // use the ID from the session - need to compound with series year (2023) eventually
                user_id: req.user.id
            },
            attributes: [
                'route_id',
                'photo',
                'ride_time',
                'ride_link',
                'date_completed',
                'bonus_points',
                "approved",
                "user_id",
            ],
            include: [
                // include Route data
                // Filter for Series Year (needs to be in config file)
                {
                    model: Routes,
                    attributes: ['id', 'name', 'points', 'year'],
                    where: {
                        year: 2023
                    }
                }
            ]
        })
            .then(dbUserRoutesData => dbUserRoutesData),

        // find all routes in routes table for dropdown selection
        Routes.findAll({
            attributes: [
                'id',
                'name'
            ],
            order: [['name', 'ASC']]
        })
    ])
        .then(([dbUserRoutesData, dbRoutesData]) => {
            // serialize the promise returns from both of the db findAll()
            const userRoutes = dbUserRoutesData.map(route => route.get({ plain: true }))
            let routes = dbRoutesData.map(route => route.get({ plain: true }))
            
            // Remove user ridden routes for the submit dropdown list
            routes = routes.filter(ar => !userRoutes.find(rm => (rm.route_id === ar.id)))
            
            // render dashboard page and pass userRoutes, routes, and loggedIn user 
            res.render('dashboard', {
                userRoutes: { userRoutes },
                routes: { routes },
                user: req.user
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

module.exports = router;