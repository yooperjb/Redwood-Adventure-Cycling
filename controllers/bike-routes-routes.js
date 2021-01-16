const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('bikeroutes');
});

module.exports = router;