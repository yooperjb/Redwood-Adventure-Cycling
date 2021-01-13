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