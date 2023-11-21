const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models');

// Dashboard route - Display posts
router.get('/dashboard', async (req, res) => {
  try {
    // Assuming you have a user ID stored in the session after login
    const userId = req.session.user_id; // Adjust this based on your authentication setup

    // Fetch posts for the logged-in user from the database
    const userPosts = await Post.findAll({
      where: { userId }, // Adjust this based on your Post model
      include: [{ model: User, attributes: ['username'] }], // Include the associated user for each post
    });

    res.render('dashboard', { userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other blog-related routes can be added here

module.exports = router;
