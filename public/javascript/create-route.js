
async function createRouteFormHandler(event) {
    event.preventDefault();

    // grab values from create-route form inputs
    const ridewithgps_id = document.querySelector('#ridewithgps-id').value;
    const year = document.querySelector('#year').value;
    
    console.log(ridewithgps_id, year);

    // can't get request to work. Need to work on it. I think it's a CORS issue
    // const response = await fetch(`https://ridewithgps.com/routes/${ridewithgps_id}.json?`, {
        // 
        const response = await fetch(`https://ridewithgps.com/users/current.json?apikey=c7a174c5&version=2&auth_token=1a96414e63564f19ec0e19a2a678565f`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // "apikey": 'c7a174c5',
            // "version": "2",
            // "auth_token": '1a96414e63564f19ec0e19a2a678565f'
        },
        referrerPolicy: 'no-referrer'
    });

    if (response.ok) {
        console.log("ridewithgps response", response);
    } else {
        console.log("Route NOT Created");
        console.log(response);
        alert(response.statusText);
    }

    // routeData = getRouteData(ridewithgps_id);

    // send create-route form variables to api
    // response = await fetch("api/bikeroutes/", {
    //     method: 'POST', 
    //     body: JSON.stringify({
    //         ridewithgps_id,
    //         year
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // if (response.ok) {
    //     console.log(response);
    // } else {
    //     console.log("Route NOT Created");
    //     alert(response.statusText);
    // }
};


// event listener for create-route submit button
document.querySelector('.create-route').addEventListener('submit', createRouteFormHandler);