const router = require('express').Router();

const routesRoutes = require('./routes-routes.js');


router.use('/bikeroutes', routesRoutes);


module.exports = router;