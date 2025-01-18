const https = require('https');

const fetchRouteData = (routeId) => {
    return new Promise((resolve, reject) => {
      https.get(`https://ridewithgps.com/routes/${routeId}.json?apikey=${process.env.RWGPS_APIKEY}&auth_token=${process.env.RWGPS_AUTH}`, (resp) => {
        let data = '';
  
        resp.on('data', (chunk) => {
          data += chunk;
        });
  
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      }).on('error', (err) => {
        console.error("Error: ", err.message);
        reject(err);
      });
    });
  };

const fetchSegmentData = (segmentId, accessToken) => {
    const options = {
        hostname: "www.strava.com",
        path: `/api/v3/segments/${segmentId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token
        },
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = "";

            // Accumulate data chunks
            res.on("data", (chunk) => {
                data += chunk;
            });

            // Handle end of response
            res.on("end", () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const segmentData = JSON.parse(data);

                        // Extract relevant fields
                        const result = {
                            name: segmentData.name,
                            distance: segmentData.distance, // Distance in meters
                            averageGrade: segmentData.average_grade, // Average grade (percentage)
                            elevationGain: segmentData.total_elevation_gain, // Elevation gain in meters
                            climbCategory: segmentData.climb_category, // Climb category
                        };

                        resolve(result);
                    } catch (error) {
                        reject(new Error("Error parsing response: " + error.message));
                    }
                } else {
                    reject(
                        new Error(
                            `Error fetching segment: ${res.statusCode} - ${res.statusMessage}`
                        )
                    );
                }
            });
        });

        // Handle request errors
        req.on("error", (error) => {
            reject(new Error("Request error: " + error.message));
        });

        req.end();
    });
}

const getPoints = (miles,elevation) => {
    
    diff = elevation/miles;
    let ratio_points = 0;
    if (diff <= 40) {
        ratio_points = 10;
    } else if (diff <= 80) {
        ratio_points = 20;
    } else if (diff <= 120) {
        ratio_points = 30;
    } else if (diff <= 160) {
        ratio_points = 40;
    } else {
        ratio_points = 50
    }
    
    let mile_points = 0;
    if (miles < 25) {
        mile_points = 10;
    } else if (miles < 50) {
        mile_points = 20;
    } else if (miles < 75) {
        mile_points = 30;
    } else if (miles < 100) {
        mile_points = 40;
    } else {
        mile_points = 50;
    }

    let elev_points = 0;
    if (elevation < 2000) {
        elev_points = 10;
    } else if (elevation < 4000) {
        elev_points = 20;
    } else if (elevation < 7000) {
        elev_points = 30;
    } else if (elevation < 10000) {
        elev_points = 40;
    } else {
        elev_points = 50;
    }

    return ratio_points + mile_points + elev_points;
}

const getDifficulty = (points) => {
    console.log("points", points)
    if (points >=130) {
        return "Epic";
    } else if (points >= 110) {
        return "Very Difficult";
    } else if (points >= 80) {
        return "Difficult";
    } else if (points >= 50) {
        return "Moderate";
    } else {
        return "Easy"
    }
}

const getBonusPoints = (routeCount) => {
    let bonus_points;

    if (routeCount === 0) {
        bonus_points = 5;
    } else if (routeCount === 1 ) {
        bonus_points = 3;
    } else if ( routeCount === 2) {
        bonus_points = 1;
    } else {
        bonus_points = 0;
    }
    return bonus_points;
}
  
module.exports = {
    fetchRouteData, fetchSegmentData, getPoints, getDifficulty, getBonusPoints
};