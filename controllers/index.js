const router = require('express').Router();
//const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const bikeRoutesRoutes = require('./bike-routes-routes.js');
const dashBoardRoutes = require('./dashboard-routes.js');
const leaderboardRoutes = require('./leaderboard-routes.js');
const adminRoutes = require('./admin-routes.js');

//router.use('/api', apiRoutes);
router.use('/bikeroutes', bikeRoutesRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashBoardRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/admin', adminRoutes);

module.exports = router;