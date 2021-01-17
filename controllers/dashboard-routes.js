const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../config/connection');
const { User_Routes, User, Routes } = require('../models');
const passport = require('../config/passport');
// const withAuth = require('../utils/auth');


// router.get('/', ensureLoggedIn('/login'), (req, res) => {
   
//     if (req.user.isAdmin) {
//         User_Routes.findAll({
//             where: {
//                 // use the ID from the session - need to compound with approved
//                 approved: false
//             },
//             attributes: [
//                 'route_id',
//                 'photo',
//                 'ride_time',
//                 'date_completed',
//                 'ride_link',
//                 'user_id',
//                 'approved'
//             ]
//         })
//             .then(dbRoutesData => {
//                 // serialize data before passing to template
//                 const routes = dbRoutesData.map(route => route.get({ plain: true }));
//                 res.render('dashboard', { 
//                     routes,
//                     user: req.user
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     } else {
//         User_Routes.findAll({
//             where: {
//                 // use the ID from the session - need to compound with approved
//                 user_id: req.user.id
//             },
//             attributes: [
//                 'route_id',
//                 'photo',
//                 'ride_time',
//                 'date_completed',
//                 'ride_link',
//                 "user_id"
//             ],
//         })
//             .then(dbRoutesData => {
//                 // serialize data before passing to template
//                 const routes = dbRoutesData.map(route => route.get({ plain: true }));
//                 res.render('dashboard', { 
//                     routes,
//                     user: req.user
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//         Routes.findAll({
//             attributes:[

//             ]
//         })
//     }
// });

// attempt at using multiple findAlls
router.get('/', ensureLoggedIn('/login'), (req, res) => {
   
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
            
            User_Routes.findAll({
                where: {
                    // use the ID from the session - need to compound with approved
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
            })
            .then(dbUserRoutesData => dbUserRoutesData),
                // serialize data before passing to template
                //const userRoutes = dbUserRoutesData.map(route => route.get({ plain: true }))
            
            Routes.findAll({
                attributes:[
                    'id',
                    'name'
                ],
            })
        ])
            .then( ([dbUserRoutesData,dbRoutesData]) => {
                // serialize the promise returns from the db findAll()
                const userRoutes = dbUserRoutesData.map(route => route.get({ plain: true }))
                const routes = dbRoutesData.map(route => route.get({ plain: true }))
                res.render('dashboard', {
                    userRoutes,
                    routes: {routes}
                })
                console.log("userRoutes:", {userRoutes: userRoutes});
                console.log("routes:", {routes: routes});
                console.log({routes});
            })
            
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });   
    }
});

module.exports = router;