const { Routes } = require('../models');

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Routes } = require('../models');

router.get('/', (req, res) => {
<<<<<<< HEAD
    res.render('bikeroutes', {
        name: 'test_route',
        difficulty: 'Medium',
        mileage: 33.22,
        elevation: 7777.77,
        points: 56,
        first_bonus: 5
=======
    Routes.findAll({
        // Query configuration
        attributes: [
            'name',
            'mileage',
            'elevation',
            'points',
            'first_bonus',
            'difficulty',
            'map',
            'note'
        ]
    }).then(dbRoutesData => {
        const routes = dbRoutesData.map(route => route.get({ plain: true }));
        res.render('bikeroutes', { routes });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
>>>>>>> feature/cycle-routes
    });
});

module.exports = router;