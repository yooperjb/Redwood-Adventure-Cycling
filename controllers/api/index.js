const router = require('express').Router();

const routesRoutes = require('./bikeroutes-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/bikeroutes', routesRoutes);
router.use('/user-routes', userRoutes);

module.exports = router;