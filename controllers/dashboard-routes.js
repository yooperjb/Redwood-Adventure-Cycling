const router = require('express').Router();
const sequelize = require('../config/connection');
const { User_Routes, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/dashboard', (req, res) => {
    if (isAdmin) {
        User_Routes.findAll({
            where: {
                // use the ID from the session - need to compound with approved
                unapproved: req.session.unapproved
            },
            attributes: [
                'route_id',
                'photo',
                'ride_time',
                'date_completed',
                'url',
                "user_id"
            ],
            Include: [
                {
                    model: User,
                    attributes: ['admin']
                }
            ]
        })

            .then(dbRoutesData => {
                // serialize data before passing to template
                const routes = dbRoutesData.map(route => route.get({ plain: true }));
                res.render('dashboard', { routes, loggedIn: true });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        User_Routes.findAll({
            where: {
                // use the ID from the session - need to compound with approved
                user_id: req.session.user_id
            },
            attributes: [
                'route_id',
                'photo',
                'ride_time',
                'date_completed',
                'url',
                "user_id"
            ],
            Include: [
                {
                    model: User,
                    attributes: ['admin']
                }
            ]
        })

            .then(dbRoutesData => {
                // serialize data before passing to template
                const routes = dbRoutesData.map(route => route.get({ plain: true }));
                res.render('dashboard', { routes, loggedIn: true });
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

router.post('/dashboard', (req, res) => {

    User_Routes.create({
        photo: req.body.photo,
        ride_time: req.body.ride_time,
        ride_link: req.body.ride_link,
        date_completed: req.body.date_completed,
        route_id: req.body.route_id,
        user_id: req.session.user_id
    })
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'route_id',
            'photo',
            'ride_time',
            'date_completed',
            'url',
            "user_id"
        ],
        Include: [
            {
                model: User,
                attributes: ['admin']
            }
        ]
    })
        .then(dbRouteData => {
            if (!dbRouteData) {
                res.status(404).json({ message: 'No route found with this id' });
                return;
            }
            res.json(dbRouteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    if (isAdmin) {
        Post.update(
            {
                photo: req.body.photo,
                ride_time: req.body.ride_time,
                ride_link: req.body.ride_link,
                date_completed: req.body.date_completed,
                route_id: req.body.route_id,
                user_id: req.session.user_id
            }
        )
            .then(dbRouteData => {
                if (!dbRouteData) {
                    res.status(404).json({ message: 'No route found with this id' });
                    return;
                }
                res.json(dbRouteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    if (isAdmin) {
        Post.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbRouteData => {
                if (!dbRouteData) {
                    res.status(404).json({ message: 'No route found with this id' });
                    return;
                }
                res.json(dbRouteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;