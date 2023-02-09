const router = require('express').Router();
const { Routes, User_Routes } = require('../models');
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
        
        // If user signed in get routes they've ridden for route checkmark
        if (req.user) {
            const user_routes = (await User_Routes.findAll({
                attributes: [
                    'route_id'
                ]
            })).map(route => route.toJSON().route_id)
            
            routes.map(route => {
                (user_routes.includes(route.id) ? route.ridden="ridden" : route.ridden="unridden")
            })
        }
            
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