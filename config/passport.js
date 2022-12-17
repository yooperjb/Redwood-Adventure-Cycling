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
    
    // console.log("profile", profile);
    // check for user by primary key in database. if none, add user to db
    let user = await User.findByPk(profile.id)
        if (!user) {
            user = await User.create({
                id: profile.id,
                name: profile.displayName,
                gender: profile._json.sex,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
            console.log("user", user);
        }
    
    // profile is req.user that is passed from passport-StravaStrategy. I believe this is where I would add tokens if wanting to save them to the session. And send user instead of ...profile to only pass user data across session instead of the whole strava profile. 
    return cb(null, {...profile, isAdmin: user.admin});
  }));

//serialize users into and deserialize users out of the session. serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser(function(user, cb) {
cb(null, user);

});
passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});

module.exports = passport;