const passport = require('passport');
const StravaStrategy = require('passport-strava').Strategy;
const { User } = require('../models');
const { formatDate, formatTime, formatDistance, formatElevation } = require('../utils/conversion');
const https = require('https');

// configure the STRAVA Strategy for passport
passport.use(new StravaStrategy({
  // client and secret to pass to strava for authentication
  clientID: process.env['STRAVA_CLIENT_ID'],
  clientSecret: process.env['STRAVA_CLIENT_SECRET'],
  callbackURL: '/return',
  // This sets the authentication scope of the App for users!
  // Need "read" and "activity:read_all" to prevent login authorization every time!
  scope: 'read,activity:read_all',
},
  async function (accessToken, refreshToken, expires_at, profile, cb) {

    try {
      // *** This needs to be moved to a separate function similar to getting segment information ***
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
      //Make this a separate function
      const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', async () => {
          try {
            const raw_activities = JSON.parse(data);

            // check for user by primary key in database. if none, add user to db
            // probably want to find user and update user data in case they have changed anything since first logging in
            // or create something on user account that allows them to update the info with the click of a button
            let user = await User.findByPk(profile.id)
            if (!user) {
              user = await User.create({
                id: profile.id,
                name: profile.displayName,
                gender: profile._json.sex,
              });
            }

            // Pull out only needed data from Strava User Profile
            tokenExpire = expires_at.expires_at
            const { id, username, firstname, lastname, bio, city, state, sex, profile_medium } = profile._json;
            
            // Pull out and convert only needed data from last 5 user Strava activities
            const activities = raw_activities.map(activity => ({
              name: activity.name,
              elapsed_time: formatTime(activity.elapsed_time),
              start_date_local: formatDate(activity.start_date_local),
              id: activity.id,
              distance: formatDistance(activity.distance),
              elevation: formatElevation(activity.total_elevation_gain)
            }));

            console.log('activities:', activities)

            // userprofile is req.user that is passed from passport-StravaStrategy. Send user info and tokens with requests. 
            const userprofile = { id, displayName: profile.displayName, username, firstname, lastname, sex, city, state, bio, profile_medium, accessToken, refreshToken, tokenExpire, activities };

            console.log("userprofile:", userprofile)
            // cb function used to pass authenticated user to serializeUser() function
            return cb(null, { ...userprofile, isAdmin: user.admin });
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
  }
));

//serialize users into and deserialize users out of the session. serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;