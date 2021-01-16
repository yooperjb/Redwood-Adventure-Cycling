const { Routes } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
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
    });
});

module.exports = router;