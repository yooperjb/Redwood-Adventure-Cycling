const router = require('express').Router();
const apiRoutes = require('../controllers/api');
const homeRoutes = require('./home-routes.js');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;