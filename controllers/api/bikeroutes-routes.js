const router = require('express').Router();
const { Routes } = require('../../models');
const sequelize = require('../../config/connection');

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
// router.post('/', (req, res) => {
//     Routes.create({
//         name: req.body.name,
//         url: req.body.url,
//         mileage: req.body.mileage,
//         elevation: req.body.elevation,
//         points: req.body.points,
//         first_bonus: req.body.first_bonus,
//         difficulty: req.body.difficulty,
//         map: req.body.map
//     })
//         .then(dbRoutesData => res.json(dbRoutesData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// attempt at creating new bike route
router.post('/', (req, res) => {
    
    const { ridewithgps_id, year} = req.body;
    console.log(ridewithgps_id, year);
    console.log(process.env.RWGPS_APIKEY);
    
    // get route information from RideWithGps
    const response = fetch(`https://ridewithgps.com/routes/${ridewithgps_id}.json`, {
        method: 'GET', 
        body: JSON.stringify({
            "apikey": process.env.RWGPS_APIKEY,
            "version": "2",
            "auth_token": process.env.RWGPS_AUTH
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log("ridewithgps response", response);
    } else {
        console.log("Route NOT Created");
        alert(response.statusText);
    }
    // Routes.create({
    //     name: req.body.name,
    //     url: req.body.url,
    //     mileage: req.body.mileage,
    //     elevation: req.body.elevation,
    //     points: req.body.points,
    //     first_bonus: req.body.first_bonus,
    //     difficulty: req.body.difficulty,
    //     map: req.body.map
    // })
    //     .then(dbRoutesData => res.json(dbRoutesData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
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