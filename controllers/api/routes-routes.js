const router = require('express').Router();
const { Routes } = require('../../models');
const sequelize = require('../../config/connection');

// get all routes
router.get('/', (req, res) => {
    Routes.findAll()
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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

router.post('/', (req, res) => {
    Routes.create({
        name: req.body.name,
        url: req.body.url,
        mileage: req.body.mileage,
        elevation: req.body.elevation,
        points: req.body.points,
        first_bonus: req.body.first_bonus,
        difficulty: req.body.difficulty
    })
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
            difficulty: req.body.difficulty
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