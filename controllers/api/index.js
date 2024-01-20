const router = require('express').Router();
const bikeroutesRoutes = require('./bikeroutes-routes.js');
const userroutesRoutes = require('./userroutes-routes.js');
const usersRoutes = require('./users-routes.js');

router.use('/bikeroutes', bikeroutesRoutes);
router.use('/user-routes', userroutesRoutes);
router.use('/users', usersRoutes);

module.exports = router;