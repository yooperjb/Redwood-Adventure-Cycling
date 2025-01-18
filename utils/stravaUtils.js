const https = require('https');

async function refresh_Token(user) {
    const postData = JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: user.refreshToken, // Current refresh token from user profile
    });

    const options = {
        hostname: "www.strava.com",
        path: "/api/v3/oauth/token",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData),
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = "";

            // Collect response data
            res.on("data", (chunk) => {
                data += chunk;
            });

            // Handle end of response
            res.on("end", () => {
                // console.log("Response Body:", data)
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const tokenData = JSON.parse(data);

                        // Update user's tokens and expiration time
                        user.accessToken = tokenData.access_token;
                        user.refreshToken = tokenData.refresh_token;
                        user.tokenExpire = tokenData.expires_at;

                        resolve(user); // Return updated user object
                    } catch (error) {
                        reject(new Error("Error parsing token response: " + error.message));
                    }
                } else {
                    reject(
                        new Error(`Failed to refresh token: ${res.statusCode} - ${res.statusMessage}`)
                    );
                }
            });
        });

        // Handle request errors
        req.on("error", (error) => {
            reject(new Error("Request error: " + error.message));
        });

        req.write(postData);
        req.end();
    });

}

module.exports = { refresh_Token };