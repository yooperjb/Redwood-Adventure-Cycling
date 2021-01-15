const router = require('express').Router();
const apiRoutes = require('../controllers/api');
const homeRoutes = require('./home-routes.js');
const bikeRoutesRoutes = require('./bike-routes-routes.js');


router.use('/api', apiRoutes);
router.use('/bikeroutes', bikeRoutesRoutes);
router.use('/', homeRoutes);


module.exports = router;