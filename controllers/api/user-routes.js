const router = require('express').Router();
const { User_Routes, User } = require('../../models');
const sequelize = require('../../config/connection');
const upload = require('../../utils/upload');
const Resize = require('../../utils/Resize');
const path = require('path');
const multer = require('multer');

// GET /api/user-routes for req testing
router.get('/', (req, res) => {
    res.send("Hey")
    console.log("id:", req.user.id);
});

// create new user route /api/user-routes
router.post('/', upload.single('photo'), (req, res) => {
        
        User_Routes.count({
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
        })
            .then((dbUserRouteCount) => {
                let routeCount = dbUserRouteCount;
                // Assign bonus points based on previous submission count
                if (routeCount === 0) {
                    bonus_points = 5;
                } else if (routeCount === 1 ) {
                    bonus_points = 3;
                } else if ( routeCount === 2) {
                    bonus_points = 1;
                } else {
                    bonus_points = 0;
                }
                // Must return in order to pass to next then!
                return bonus_points;
            })
    
            .then((bonus_points) => {
                // if file submitted resize and save to file
                // create two size files!!!
                if (req.file) {
                    photo_name = `${req.user.id}-${req.body.route_id}.jpg`
                    const photo_dir = 'public/photos/2023';
                    const fileUpload = new Resize(photo_dir,photo_name); // creates new Resize Class
                    
                    const filename = fileUpload.save(req.file.buffer)
                    console.log('filename', filename)
                    console.log(typeof(filename));
                } 
                else {
                    photo_name= ''
                }
                return photo_name;

            })
            .then(photo_name => {
                
                User_Routes.create({
                    photo: photo_name,
                    ride_time: req.body.ride_time,
                    ride_link: req.body.ride_link,
                    date_completed: req.body.date_completed,
                    bonus_points: bonus_points,
                    user_id: req.user.id,
                    // Use this when testing with Insomnia
                    route_id: req.body.route_id,
                    })
            })
            
            .then(dbRoutesData => res.json(dbRoutesData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

// PUT /api/user-routes/ - update a user-route bulk
router.put('/', (req, res) => {
    User_Routes.update(
        {
            approved: true,
        },
        {
            where: {
                id: req.body
            }
        }
    )
        .then(dbUserRouteData => {
            
            if (!dbUserRouteData) {
                res.status(404).json({ message: 'No routes were approved' });
                return;
            }
            res.json(dbUserRouteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;