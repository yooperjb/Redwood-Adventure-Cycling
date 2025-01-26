const router = require('express').Router();
const { User_Routes, User, Routes } = require('../../models');
const upload = require('../../utils/upload');
const Resize = require('../../utils/Resize');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { checkSubmissionDate } = require('../../utils/date');
const { getPoints, getBonusPoints, getRouteCount } = require('../../utils/routeUtils');

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

// POST /api/user-routes - create new user route
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        let routeCount;
        let bonus_points;

        // Check if submission is currently allowed for this date
        try {
            checkSubmissionDate();
        } catch (err) {
            console.error("Error checking submission date:", err);
            return res.status(400).json({ error: true, message: err.message});
        }
        
        // Get Route User count for bonus points
        try {
            routeCount = await getRouteCount(req.body.route_id, req.user.sex);
        } catch (err) {
            console.error("Error getting route count:", err);
            return res.status(500).json({ error: true, message: err.message });
        }
        
        // Assign bonus points based on route submission counts
        try {
            bonus_points = getBonusPoints(routeCount);
        } catch (err) {
            console.error('Error calculating bonus points:', err);
            return res.status(500).json({ error: true, message: 'Error calculating bonus points.' });
        }

        // Calculate Ride points based on mileage and elevation
        const ride_miles = req.body.ride_miles * 0.000621371;
        const ride_elevation = req.body.ride_elevation * 3.28084;
        const ride_points = getPoints(ride_miles, ride_elevation);
    
        // if photo submitted resize and save to file
        // create two size files!!!
        let photo_name = '';
        if (req.file) {
            photo_name = `${req.user.id}-${req.body.route_id}.jpg`;
            const photo_dir = `public/photos/${process.env.YEAR}`;

            // check if directory exists, create if not
            await fs.mkdir(photo_dir, {recursive: true });

            const fileUpload = new Resize(photo_dir,photo_name); // creates new Resize Class
            const filename = await fileUpload.save(req.file.buffer);
        }

        // Create user route
        const dbRoutesData = await User_Routes.create({
            photo: photo_name,
            ride_time: req.body.ride_time,
            ride_miles,
            ride_elevation,
            ride_link: `https://www.strava.com/activities/${req.body.ride_link}`,
            date_completed: req.body.date_completed,
            ride_points,
            bonus_points,
            user_id: req.user.id,
            route_id: req.body.route_id, // Use this when testing with Insomnia
        });
            
        res.json(dbRoutesData);
    } catch (err) {
        console.error(err);
        res.status(403).json({ error: true, message: err.message });
    }
});

// PUT /api/user-routes - update a user-route bulk (for route approval)
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