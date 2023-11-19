const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// Login route - Display login form
router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login.handlebars view
});

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false);
      }

      const isPasswordValid = await user.verifyPassword(password);

      if (!isPasswordValid) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));


// Login route - Handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Signup route - Display signup form
router.get('/signup', (req, res) => {
  res.render('signup'); // Assuming you have a signup.handlebars view
});

// Signup route - Handle signup form submission
router.post('/signup', async (req, res) => {
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
});

// Other user-related routes can be added here

module.exports = router;
