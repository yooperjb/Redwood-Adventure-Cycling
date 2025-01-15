const router = require('express').Router();
const { Routes } = require('../../models');
const sequelize = require('../../config/connection');
const https = require('https');
const { fetchRouteData, fetchSegmentData, getPoints, getDifficulty } = require('../../utils/routeUtils');
const { refresh_Token } = require('../../utils/stravaUtils');

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

// api/bikeroutes/id/:id
router.get('/id/:id', async (req, res) => {
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

// api/bikeroutes/year/:year
router.get('/year/:year', async (req, res) => {
    try {
        const dbRoutesData = await Routes.findAll({
            where: {
                year: req.params.year
            },
            order: [[ 'name', 'ASC']],
        });

        if (!dbRoutesData) {
            res.status(404).json({ message: 'No bike routes found with this year' });
            return;
        }
        res.json(dbRoutesData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});

// create new bike route (ridewithgps) api/bikeroutes
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

// create new route segment (strava) api/bikeroutes/segment
router.post('/segment', async (req, res) => {
    try {
        // Get user data
        const user = req.user;
        // Get values from form passed in req
        const { segmentId, year, description } = req.body;
        // Get tokenExpire
        const tokenExpire = user.tokenExpire
        currentTime = Math.floor(Date.now() / 1000);

        console.log("current Time:", currentTime)
        console.log("tokenExpire:", tokenExpire)
        console.log("user:", user)

        // First check if Token has expired - if expired refresh
        if (currentTime >= tokenExpire) {
            console.log("Access Token expired. Refreshing...")
            // Execute refreshToken function to refresh expired Token
            await refresh_Token(user)
        }

        // Fetch segment information from Strava using the fetchSegmentData utility function
        const segmentData = await fetchSegmentData(segmentId, user.accessToken);

        // ************* Delete me after testing ************
        console.log("segmentData", segmentData)
        
        // If segment not found
        if (!segmentData) {
            return res.status(400).json({ message: 'No Strava segment found with this id' });
        }

        // Extract segment properties
        const { name, distance, elevationGain } = segmentData;

        // Convert mileage and elevation data
        const mileage = distance * .0006213712;
        const elevation = elevationGain * 3.281;
        const points = getPoints(mileage, elevation);
        const difficulty = getDifficulty(points);
        
        // Create a new route (segment)
        const newRoute = await Routes.create({
            id: segmentId,
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

// delete route -- this route is not currently being used
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