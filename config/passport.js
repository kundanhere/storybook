const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
      },
      // passport callback function
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          profileId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          // find user in database
          let user = await User.findOne({ profileId: profile.id });

          if (!user) {
            // if this user not exist create new user
            user = await User.create(newUser);
            done(null, user);
          } else {
            // otherwise send this user
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  // serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
