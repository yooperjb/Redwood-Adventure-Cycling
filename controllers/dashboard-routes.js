const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const { User_Routes, Routes } = require('../models');
const modals = require('../public/data/modal.json');
const sequelize = require('../config/connection');

// GET route /dashboard
router.get('/', ensureLoggedIn('/login'), async (req, res) => {
    try{
        const [userRoutesData, routesData] = await Promise.all([
            findUserRoutes(req.user.id),
            findAllRoutes(),
        ]);

        // Serialize data to pass to Handlebar template
        const userRoutes = userRoutesData.map(route => route.get({ plain: true }));
        let routes = routesData.map(route => route.get({ plain: true }));

        // Remove user ridden routes for the CHOOSE THE ROUTE dropdown list
        routes = routes.filter(ar => !userRoutes.find(rm => (rm.route_id === ar.id)));

        // Render dashboard page and pass userRoutes, routes, and loggedIn user
        res.render('dashboard', {
            title: 'Dashboard',
            userRoutes: { userRoutes },
            routes: { routes },
            user: req.user,
            modals,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
    
// Function to find all routes user has completed
// If this function is used elsewhere put in separate js file
const findUserRoutes = (userId) => {
    return User_Routes.findAll({
        where: {
            // use the Id from function call
            user_id: userId,
        },
        attributes: [
                'route_id',
                'photo',
                'ride_time',
                'ride_miles',
                'ride_elevation',
                'ride_link',
                'date_completed',
                'bonus_points',
                'ride_points',
                "approved",
                "user_id",
                // Sum User_Routes 'ride_points' with Routes 'points'
                [
                    sequelize.literal('ride_points + `Route`.`points`'), 'total_ride_points',
                ],
        ],
        include: [
                // include Route data
                {
                    model: Routes,
                    attributes: ['name', 'points', 'year'],
                    // Filter for Series Year in ENV file
                    where: {
                        year: process.env.YEAR
                    },
                }
        ],
        order: [[Routes, 'name', 'ASC']]
    });
};

// Function to find all routes in routes table for dropdown selection
// If this function is used elsewhere put in separate js file
const findAllRoutes = () => {
    return Routes.findAll({
        where: {
            // Filter for Series Year in ENV file
            year: process.env.YEAR
        },
        attributes: ['id','name'],
        order: [['name', 'ASC']]
    });
};

module.exports = router;