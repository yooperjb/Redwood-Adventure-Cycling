const router = require('express').Router();
const { Routes } = require('../../models');
const sequelize = require('../../config/connection');
const https = require('https');
const { fetchRouteData, getPoints, getDifficulty } = require('../../utils/routeUtils');

// api/bikeroutes
router.get('/', async (req, res) => {
    try {
        // Fetch all routes and sort by name
        const dbRoutesData = await Routes.findAll( { order: [['name', 'ASC']] });

        res.json(dbRoutesData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// api/bikeroutes/:id
router.get('/:id', async (req, res) => {
    try {
        const dbRoutesData = await Routes.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!dbRoutesData) {
            res.status(404).json({ message: 'No bike route found with this id' });
            return;
        }
        res.json(dbRoutesData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});

// create new bike route api/bikeroutes
router.post('/', async (req, res) => {
    try {
        const { ridewithgps_id, year } = req.body;

        // Fetch route information from RideWithGps using the utility function
        const routeData = await fetchRouteData(ridewithgps_id);

        if (!routeData) {
            return res.status(400).json({ message: 'No bike route found with this id' });
        }

        // Extract route properties
        const { name, distance, elevation_gain, description } = routeData.route;

        // Calculate points and difficulty using utility functions
        const mileage = distance * .0006213712;
        const elevation = elevation_gain * 3.281;
        const points = getPoints(mileage, elevation);
        const difficulty = getDifficulty(points);

        // Create a new route
        const newRoute = await Routes.create({
            id: ridewithgps_id,
            year,
            name,
            mileage,
            elevation,
            points,
            difficulty,
            description
        });

        res.json(newRoute);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// update bike route api/bikeroutes
router.put('/', async (req, res) => {
    try {
        const { route_id } = req.body;

        const routeData = await fetchRouteData(route_id);

        if (!routeData) {
            console.log('NO routeData')
            return res.status(400).json({ message: 'No bike route found with this id' });
        }

        const { name, distance, elevation_gain, description } = routeData.route;
        const mileage = distance * .0006213712;
        const elevation = elevation_gain * 3.281;

        // Update route in the database
        const updatedRoute = await Routes.update(
            {
                name,
                mileage,
                elevation,
                description,
            },
            {
                where: { id: route_id }
            }
        );
        res.json(updatedRoute);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// this route is not currently being used
router.delete('/:id', (req, res) => {
    Routes.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbRoutesData => {
        if (!dbRoutesData) {
            res.status(404).json({ message: 'No bike route found with this id' });
            return;
        }
        res.json(dbRoutesData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;