const router = require('express').Router();

const routesRoutes = require('./routes-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/bikeroutes', routesRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;