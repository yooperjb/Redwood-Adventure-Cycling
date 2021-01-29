const router = require('express').Router();
const { Routes } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    try {
        const routes = (await Routes.findAll(
            {
            order: [['name', 'ASC']]
            }
        )).map(route => route.toJSON()) //converts to plain object
        // console.log({ routes }) //flag value
        res.render('bikeroutes', { routes, user: req.user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

module.exports = router;