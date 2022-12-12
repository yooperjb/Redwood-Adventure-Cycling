const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../config/connection');
const { User_Routes, User, Routes } = require('../models');
const passport = require('../config/passport');


// GET route /dashboard
router.get('/', ensureLoggedIn('/login'), (req, res) => {

    return Promise.all([

        // find all routes user has completed
        User_Routes.findAll({
            where: {
                // use the ID from the session - need to compound with approved and series year (2023) eventually
                user_id: req.user.id
            },
            attributes: [
                'route_id',
                'photo',
                'ride_time',
                'ride_link',
                'date_completed',
                "approved",
                "user_id",
            ],
            include: [
                // include Route data
                {
                    model: Routes,
                    attributes: ['id', 'name', 'points']
                }
            ]
        })
            .then(dbUserRoutesData => dbUserRoutesData),

        // find all routes in routes table for dropdown
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
            const routes = dbRoutesData.map(route => route.get({ plain: true }))
            
            console.log('userRoutes:', userRoutes);
            console.log('routes:', routes);
            
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