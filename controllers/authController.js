const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // for password hashing
const passport = require('passport'); // for user authentication

const { User } = require('../models'); // assuming your User model is in models/index.js

router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login.handlebars view
});

router.get('/signup', (req, res) => {
  res.render('signup'); // Assuming you have a signup.handlebars view
});

// Registration route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Redirect to login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route using passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout(); // passport function to clear the login session
  res.redirect('/');
});

// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Example of a protected route (accessible only when authenticated)
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user }); // assuming you are using handlebars and passing user information to the view
});

module.exports = router;