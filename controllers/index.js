const router = require('express').Router();

const apiRoutes = require('./api');
const authControl = require('./authController');

router.use('/', authControl);
router.use('/api', apiRoutes);

module.exports = router;