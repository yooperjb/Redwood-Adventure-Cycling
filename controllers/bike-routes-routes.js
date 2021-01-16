const router = require('express').Router();
const sequelize = require('../config/connection');
const { Routes } = require('../models');

router.get('/', (req, res) => {
    res.render('bikeroutes', {
        name: 'test_route',
        difficulty: 'Medium',
        mileage: 33.22,
        elevation: 7777.77,
        points: 56,
        first_bonus: 5
    });
});

module.exports = router;