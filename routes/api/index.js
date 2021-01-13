const router = require('express').Router();

const routesRoutes = require('./routes-routes.js');

router.use('/routes', routesRoutes);

module.exports = router;