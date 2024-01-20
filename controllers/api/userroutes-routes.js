const router = require('express').Router();
const { User_Routes, User, Routes } = require('../../models');
// const sequelize = require('../../config/connection'); chatgpt thinks i don't need this. 
const upload = require('../../utils/upload');
const Resize = require('../../utils/Resize');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { checkSubmissionDate } = require('../../utils/date');
const { getBonusPoints } = require('../../utils/routeUtils');

// GET /api/user-routes
router.get('/', async (req, res) => {
    try {
        const userRoutesData = await User_Routes.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Routes,
                    attributes: ['name']
                }
            ]
        });

        res.json(userRoutesData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// create new user route /api/user-routes
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        
        // Check if submission is currently allowed
        checkSubmissionDate();
        
        const activity = req.user.activities;
        // Count the number of routes submitted for bonus points
        // this could be moved to a separate function
        const routeCount = await User_Routes.count({
            where: {
                route_id: req.body.route_id
            },
            include: [
                // include user data for gender query
                {
                    model: User,
                    attributes:['id', 'gender'],
                    where: {
                        gender: req.user.sex
                    }
                }
            ],     
        });
           
        // Assign bonus points based on route submission counts
        const bonus_points = getBonusPoints(routeCount);
    
        // if photo submitted resize and save to file
        // create two size files!!!
        let photo_name = '';
        if (req.file) {
            photo_name = `${req.user.id}-${req.body.route_id}.jpg`;
            const photo_dir = `public/photos/${process.env.YEAR}`;

            // check if directory exists, create if not
            await fs.mkdir(photo_dir, {recursive: true });

            const fileUpload = new Resize(photo_dir,photo_name); // creates new Resize Class
            const filename = await fileUpload.save(req.file.buffer)
        }

        // Create user route    
        const dbRoutesData = await User_Routes.create({
            photo: photo_name,
            ride_time: req.body.ride_time,
            ride_link: `https://www.strava.com/activities/${req.body.ride_link}`,
            date_completed: req.body.date_completed,
            bonus_points,
            user_id: req.user.id,
            // Use this when testing with Insomnia
            route_id: req.body.route_id,
        });
            
        res.json(dbRoutesData);
    } catch (err) {
        console.error(err);
        res.status(403).json({ error: true, message: err.message });
    }
});

// PUT /api/user-routes/ - update a user-route bulk (for route approval)
router.put('/', async (req, res) => {
    
    try {
        const dbUserRouteData = await User_Routes.update(
            { approved: true,},
            { where: {
                id: req.body }}
    );
            
        if (!dbUserRouteData[0]) {
            res.status(404).json({ message: 'No routes were approved' });
            return;
        }
            
        res.json(dbUserRouteData);
    } catch (err) {
        console.error(err);
         res.status(500).json(err);
    }
});

module.exports = router;