const router = require('express').Router();
const { Routes } = require('../../models');
const sequelize = require('../../config/connection');
const https = require('https');
const {getPoints, getDifficulty} = require('../../utils/routeCalc');

// api/bikeroutes
router.get('/', (req, res) => {
    Routes.findAll()
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// api/bikeroutes/:id
router.get('/:id', (req, res) => {
    Routes.findOne({
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

// create new bike route api/bikeroutes
router.post('/', (req, res) => {

    const { ridewithgps_id, year } = req.body;

    // get route information from RideWithGps
    https.get(`https://ridewithgps.com/routes/${ridewithgps_id}.json?apikey=${process.env.RWGPS_APIKEY}&auth_token=${process.env.RWGPS_AUTH}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            route = JSON.parse(data).route

            route_name = route.name;
            mileage = route.distance * .0006213712;
            elevation = route.elevation_gain * 3.281;
            points = getPoints(mileage, elevation);
            difficulty = getDifficulty(points);
            description = route.description;

            console.log(route_name, mileage, elevation, points, difficulty)

            Routes.create({
                id: ridewithgps_id,
                year: year,
                name: route_name,
                mileage: mileage,
                elevation: elevation,
                points: points,
                difficulty: difficulty,
                description: description
            })
                .then(dbRoutesData => res.json(dbRoutesData))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    }).on('error', (err) => {
        console.log("Error: ", err.message)
    })
});

router.put('/:id', (req, res) => {
    Routes.update(
        {
            name: req.body.name,
            url: req.body.url,
            mileage: req.body.mileage,
            elevation: req.body.elevation,
            points: req.body.points,
            first_bonus: req.body.first_bonus,
            difficulty: req.body.difficulty,
            map: req.body.map
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbRoutesData => {
        if (!dbRoutesData) {
            res.status(400).json({ message: 'No bike route found with this id' });
            return;
        }
        res.json(dbRoutesData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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