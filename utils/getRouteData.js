
async function getRouteData(id) {
    
    const response = await fetch(`https://ridewithgps.com/routes/${id}.json`, {
        method: 'GET', 
        body: JSON.stringify({
            "apikey": process.env.RWGPS_APIKEY,
            "version": "2",
            "auth_token": process.env.RWGPS_AUTH
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log("ridewithgps response", response);
    } else {
        console.log("Route NOT Created");
        alert(response.statusText);
    }
};

getRouteData(41552966);
module.exports = getRouteData;