const router = require('express').Router();
const { Routes } = require('../models');
const sequelize = require('../config/connection');


router.get('/', async (req, res) => {
    try {
        // eventually need to filter for current year (2023)
        const routes = (await Routes.findAll({
            where: {
                year: 2023
            },
            order:[['name', 'ASC']]
        },

        )).map(route => route.toJSON()) //converts to plain object
        // console.log({ routes }) //flag value
        
        // render bikeroutes page with all bike routes
        res.render('bikeroutes', { routes, user: req.user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

module.exports = router;