const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // for password hashing
const passport = require('passport'); // for user authentication

const { User } = require('../models'); // assuming your User model is in models/index.js

router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login.handlebars view
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.verifyPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      res.redirect('/dashboard');
    });

  } catch (err) {
    res.status(400).json(err);
  }
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


// Signup route - Handle signup form submission
/* router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      // User with the given username already exists
      // You might want to handle this case appropriately (e.g., display an error message)
      return res.redirect('/signup');
    }

    // Create a new user in the database
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Redirect to login page after successful signup
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});*/

module.exports = router;