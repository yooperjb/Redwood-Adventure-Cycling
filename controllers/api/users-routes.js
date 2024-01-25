const router = require('express').Router();
const { User_Routes, User, Routes } = require('../../models');

// api/users
router.get('/', async (req, res) => {
    try {
        // Fetch all users and sort by name
        const dbUsersData = await User.findAll( { 
            attributes:[
                'id',
                'name',
                'gender',
            ],
            order: [['name', 'ASC']] });

        res.json(dbUsersData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// api/users/:id
router.get('/:id', async (req, res) => {
    try {
        // Fetch selected user
        const dbUserData = await User.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User_Routes,
                    attributes: [
                        'id',
                        'photo',
                        'ride_link',
                        'date_completed',
                        'bonus_points'
                    ],
                    include: [
                        {
                            model: Routes,
                            attributes: ['name']
                        }
                    ]
                },
            ],
        });

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;