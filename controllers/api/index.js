const express = require('express');
const router = express.Router();


// Import and use the sub-routers for specific functionalities
const postRoutes = require('./postRoutes');
//const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/post', postRoutes);
//router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;