const router = require('express').Router();
const negotiate =require('express-negotiate');
const sequelize = require('../config/connection');
const { User_Routes, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/dashboard', (req, res) => {
    req.negotiate({
    User_Routes.findAll({
        where: {
            // use the ID from the session - need to compund with approved
            user_id: req.session.user_id
        },
        attributes: [
            'route_id',
            'photo',
            'ride_time',
            'date_completed',
            'url',
            "user_id"
            Include - user model'admin'
        ]
    })
        .then(dbRouteData => {
            // serialize data before passing to template
            const route = dbRouteData.map(route => route.get({ plain: true }));
            res.render('dashboard', { routes, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

// router.get('/edit/:id', withAuth, (req, res) => {
//     User_Routes.findByPk(req.params.id, {
//         attributes: [
//                 'id',
//                 'time',
//                 'date',
//                 'link'
//             ]
//     })
//         .then(dbRouteData => {
//             if (dbRouteData) {
//                 const route = dbRouteData.get({ plain: true });

//                 res.render('edit-route', {
//                     route,
//                     loggedIn: true
//                 });
//             } else {
//                 res.status(404).end();
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// });

module.exports = router;