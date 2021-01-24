const passport = require('passport');
const StravaStrategy = require('passport-strava').Strategy;
const { User } = require('../models');

// configure the STRAVA Strategy for passport
passport.use(new StravaStrategy({
    // client and secret to pass to strava for authentication
    clientID: process.env['STRAVA_CLIENT_ID'],
    clientSecret: process.env['STRAVA_CLIENT_SECRET'],
    callbackURL: '/return'
  },
  async function(accessToken, refreshToken, profile, cb) {
    
    // check for user by primary key in database. if none, add to db
    let user = await User.findByPk(profile.id)
        if (!user) {
            user = await User.create({
                id: profile.id,
                name: profile.displayName,
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        }
    
    // profile is req.user that is passed from passport-strava strategy
    return cb(null, {...profile, isAdmin: user.admin});
  }));

//serialize users into and deserialize users out of the session.
passport.serializeUser(function(user, cb) {
cb(null, user);

});
passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});

module.exports = passport;