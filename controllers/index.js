const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const bikeRoutesRoutes = require('./bike-routes-routes.js');
const dashBoardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/bikeroutes', bikeRoutesRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashBoardRoutes);

module.exports = router;