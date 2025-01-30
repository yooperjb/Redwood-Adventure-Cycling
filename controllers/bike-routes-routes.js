const router = require('express').Router();
const { Routes, User_Routes } = require('../models');
const sequelize = require('../config/connection');
require('dotenv').config();

// /bikeroutes
router.get('/', async (req, res) => {
    try {
        const routeType = process.env.ROUTE_TYPE || 'routes'; // default to 'routes'

        const bikeRoutes = (await Routes.findAll({
                where: {
                    // YEAR is set in ENV file
                    year: process.env.YEAR
                },
                order:[['name', 'ASC']]
            },
            )).map(route => route.toJSON()) //converts to plain object
        
        // If user signed in get routes they've ridden for route check mark
        let userRoutes = [];
        if (req.user) {
            userRoutes = (await User_Routes.findAll({
                where: {
                    user_id: req.user.id
                },
                attributes: [
                    'route_id'
                ]
            })).map(route => route.toJSON().route_id)
            
            // add ridden attribute to routes/segments to specify if current user has ridden.
            bikeRoutes.map(route => {
                (userRoutes.includes(route.id) ? route.ridden="ridden" : route.ridden="unridden")
            })
        }

        // Pass the correct data key based on route type
        const templateData = {
            title: process.env.YEAR + ' Bike Routes',
            user: req.user,
            routeData: routeType === 'routes' ? bikeRoutes : null,
            segmentData: routeType === 'segments' ? bikeRoutes : null
        };
        
        // render bikeroutes page with all bike routes
        res.render('bikeroutes', templateData)

    } catch (err) {
        console.error("Error fetching bike routes:", err);
        res.status(500).json({ error: true, message: "Failed to load bike routes." })
    }
})

module.exports = router;