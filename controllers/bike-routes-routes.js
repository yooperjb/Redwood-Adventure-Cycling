const router = require('express').Router();
const { Routes } = require('../models');
const sequelize = require('../config/connection');


// /bikeroutes
router.get('/', async (req, res) => {
    try {
        // filter for current year (2023) - Look into creating a config file
        const routes = (await Routes.findAll({
            where: {
                year: 2023
            },
            order:[['name', 'ASC']]
        },

        )).map(route => route.toJSON()) //converts to plain object
        // console.log({ routes }) //flag value
        
        // render bikeroutes page with all bike routes
        res.render('bikeroutes', { 
            title: '2023 Bike Routes',
            routes, 
            user: req.user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

module.exports = router;