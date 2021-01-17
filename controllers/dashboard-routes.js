const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../config/connection');
const { User_Routes, User } = require('../models');
const passport = require('../config/passport');
// const withAuth = require('../utils/auth');


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
    }
});



// router.get('/dashboard',
//     (req, res, next) => {
//         if (admin === true) {
//             User_Routes.findAll({
//                 attributes: [
//                     'route_id',
//                     'photo',
//                     'ride_time',
//                     'date_completed',
//                     'url',
//                     "user_id"
//                 ],
//                 Include: [
//                     {
//                         model: User,
//                         attributes: ['admin']
//                     }
//                 ]
//             })

//                 .then(dbRoutesData => {
//                     // serialize data before passing to template
//                     const routes = dbRoutesData.map(route => route.get({ plain: true }));
//                     res.render('dashboard', { routes, loggedIn: true });
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     res.status(500).json(err);
//                 });
//         } else {
//             next();
//         }
//     },
//     (req, res, next) => {
//         User_Routes.findAll({
//             where: {
//                 // use the ID from the session - need to compound with approved
//                 user_id: req.session.user_id
//             },
//             attributes: [
//                 'route_id',
//                 'photo',
//                 'ride_time',
//                 'date_completed',
//                 'url',
//                 "user_id"
//             ],
//             Include: [
//                 {
//                     model: User,
//                     attributes: ['admin']
//                 }
//             ]
//         })

//             .then(dbRoutesData => {
//                 // serialize data before passing to template
//                 const routes = dbRoutesData.map(route => route.get({ plain: true }));
//                 res.render('dashboard', { routes, loggedIn: true });
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     }
// );

module.exports = router;