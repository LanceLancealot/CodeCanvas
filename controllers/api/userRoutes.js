const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../../models');


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


// Signup route - Display signup form


// Other user-related routes can be added here

module.exports = router;