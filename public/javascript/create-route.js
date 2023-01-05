
async function createRouteFormHandler(event) {
    event.preventDefault();

    // grab values from create-route form inputs
    const ridewithgps_id = document.querySelector('#ridewithgps-id').value;
    const year = document.querySelector('#year').value;
    
    // send create-route form variables to api
    response = await fetch("api/bikeroutes/", {
        method: 'POST', 
        body: JSON.stringify({
            ridewithgps_id,
            year
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(response);
    } else {
        console.log("Route NOT Created");
        alert(response.statusText);
    }
};

// event listener for create-route submit button
document.querySelector('.create-route').addEventListener('submit', createRouteFormHandler);