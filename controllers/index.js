const router = require('express').Router();

const apiRoutes = require('./api');
const dashboard = require('./dashboard-Routes');
const homepage = require('./home-Routes');

router.use('/api', apiRoutes);

router.use('/', homepage);
router.use('/dashboard', dashboard);

module.exports = router;