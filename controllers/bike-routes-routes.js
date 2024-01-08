const router = require('express').Router();
const { Routes, User_Routes } = require('../models');
const sequelize = require('../config/connection');
require('dotenv').config();

// /bikeroutes
router.get('/', async (req, res) => {
    try {
        // filter for current year set in ENV file
        const routes = (await Routes.findAll({
            where: {
                // YEAR is set in ENV file
                year: process.env.YEAR
            },
            order:[['name', 'ASC']]
        },

        )).map(route => route.toJSON()) //converts to plain object
        
        // console.log("routes",routes);
        console.log("user",req.user);
        // If user signed in get routes they've ridden for route checkmark
        if (req.user) {
            const user_routes = (await User_Routes.findAll({
                where: {
                    user_id: req.user.id
                },
                attributes: [
                    'route_id'
                ]
            })).map(route => route.toJSON().route_id)
            
            // add ridden attribute to routes to specify if current user has ridden.
            routes.map(route => {
                (user_routes.includes(route.id) ? route.ridden="ridden" : route.ridden="unridden")
            })
        }
        
        // render bikeroutes page with all bike routes
        res.render('bikeroutes', { 
            title: '2024 Bike Routes',
            routes,
            user: req.user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

module.exports = router;