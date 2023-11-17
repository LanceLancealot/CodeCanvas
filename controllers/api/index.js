const express = require('express');
const router = express.Router();

// Import and use the sub-routers for specific functionalities
const blogRoutes = require('./blogroutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/blog', blogRoutes);
//router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;