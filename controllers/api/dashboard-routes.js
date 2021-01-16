const router = require('express').Router();
const { User_Routes } = require('../../models');
// const sequelize = require('../../config/connection');

router.post('/', (req, res) => {

    User_Routes.create({
        photo: req.body.photo,
        ride_time: req.body.ride_time,
        ride_link: req.body.ride_link,
        date_completed: req.body.date_completed,
        route_id: req.body.route_id,
        user_id: req.session.user_id
    })
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', (req, res) => {
    if (req.user.isAdmin) {
        User_Routes.update(
            {
                photo: req.body.photo,
                ride_time: req.body.ride_time,
                ride_link: req.body.ride_link,
                date_completed: req.body.date_completed,
                route_id: req.body.route_id,
                user_id: req.session.user_id
            }
        )
            .then(dbRouteData => {
                if (!dbRouteData) {
                    res.status(404).json({ message: 'No route found with this id' });
                    return;
                }
                res.json(dbRouteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// router.delete('/:id', (req, res) => {
//     if (req.user.isAdmin) {
//         User_Routes.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//             .then(dbRouteData => {
//                 if (!dbRouteData) {
//                     res.status(404).json({ message: 'No route found with this id' });
//                     return;
//                 }
//                 res.json(dbRouteData);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     } 
// });

module.exports = router;