const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');
const { DataTypes } = require('sequelize');
const User = sequelize.define('User', {
  // other fields...
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;

// Login route - Handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

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
