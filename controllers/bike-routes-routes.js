const router = require('express').Router();
const { Routes } = require('../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Routes.findAll()
        .then(routesData => res.json(routesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

    .then(routesData => {
        // serialize data before passing to template
        const routes = routesData.map(routes => routes.get({ plain: true }));
        res.render('dashboard', { routes });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

// router.get('/', (req, res) => {
//     res.render('bikeroutes');
// })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });



module.exports = router;