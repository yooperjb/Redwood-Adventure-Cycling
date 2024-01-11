const passport = require('passport');
const StravaStrategy = require('passport-strava').Strategy;
const { User } = require('../models');
const { formatDate, formatTime } = require('../utils/conversion');
const https = require('https');

// configure the STRAVA Strategy for passport
passport.use(new StravaStrategy({
    // client and secret to pass to strava for authentication
    clientID: process.env['STRAVA_CLIENT_ID'],
    clientSecret: process.env['STRAVA_CLIENT_SECRET'],
    callbackURL: '/return',
    // This sets the authentication scope of the App for users!
    scope: 'activity:read_all',
  },
  async function(accessToken, refreshToken, profile, cb) {

    try {
      // Define request options
      const options = {
        hostname: 'www.strava.com',
        path: '/api/v3/athlete/activities?per_page=5', // Get the last 5 activities
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      //Make a request to Strava API
      const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', async () => {
          try {
            const raw_activities = JSON.parse(data);

            // check for user by primary key in database. if none, add user to db
            // probably want to find user and update user name in case they have changed it since first logging in
            let user = await User.findByPk(profile.id)
            if (!user) {
              user = await User.create({
                id: profile.id,
                name: profile.displayName,
                gender: profile._json.sex,
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            }
                
            // Pull out only needed data from Strava User Profile
            const { id, username, firstname, lastname, bio, city, state, sex, profile_medium } = profile._json;
            // Pull out and convert only needed data from last 5 user Strava activities
            const activities = raw_activities.map(activity => ({
              name: activity.name,
              elapsed_time: formatTime(activity.elapsed_time),
              start_date_local: formatDate(activity.start_date_local),
              id: activity.id
            }));
            
            // userprofile is req.user that is passed from passport-StravaStrategy. I believe this is where I would add tokens if wanting to save them to the session. And send userprofile instead of ...profile to only pass user data across session instead of the whole strava profile.
            const userprofile = {id, displayName: profile.displayName, username, firstname, lastname, sex, city, state, bio, profile_medium, activities };

            console.log('userprofile', userprofile)

            return cb(null, {...userprofile, isAdmin: user.admin});
          } catch (error) {
            return cb(error);
          }
        });
      });

      req.on('error', error => {
        return cb(error);
      });

      req.end();
    } catch (error) {
      return cb(error);
    }
    
  }));

//serialize users into and deserialize users out of the session. serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser(function(user, cb) {
cb(null, user);

});
passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});

module.exports = passport;