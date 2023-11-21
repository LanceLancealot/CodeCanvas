const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models');

// Dashboard route - Display posts
router.get('/dashboard', async (req, res) => {
  try {
    // Assuming you have a user ID stored in the session after login
    const userId = req.user.id; // Adjust this based on your authentication setup

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

// Dashboard route - Display posts
router.get('/dashboard', async (req, res) => {
  try {
    // Assuming you have a user ID stored in the session after login
    const userId = req.user.id; // Adjust this based on your authentication setup

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

// Route to display the new post form
router.get('/dashboard/new', (req, res) => {
  res.render('new-post'); // Assuming you have a new-post.handlebars template
});

// Route to handle the form submission and create a new blog post
router.post('/dashboard/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming user information is available in the request

    // Create a new blog post in the database
    const newPost = await Post.create({
      title,
      content,
      userId,
    });

    res.redirect('/dashboard'); // Redirect to the dashboard after creating the post
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;