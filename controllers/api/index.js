const router = require('express').Router();

const routesRoutes = require('./bikeroutes-routes.js');
const userRoutes = require('./user-routes.js');
// const usersRoutes = require('./users-routes.js');

router.use('/bikeroutes', routesRoutes);
router.use('/user-routes', userRoutes);
// router.use('/users', usersRoutes);

module.exports = router;