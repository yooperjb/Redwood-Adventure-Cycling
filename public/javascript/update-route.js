async function updateRouteFormHandler(event) {
    event.preventDefault();

    // grab values from update-route form inputs
    const route_id = document.querySelector('#route_id').value;

    // send route id to api for updating
    response = await fetch("/api/bikeroutes/", {
        method: 'PUT',
        body: JSON.stringify({
            route_id,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log("Response OK");
        openModal('updateRouteModal')
        // document.querySelector('#route-id').value = "";
        // console.log(response);
    } else {
        console.log("Route NOT Created");
        console.log(response)
        alert(response.statusText);
    }

};
document.querySelector('.update-route').addEventListener('submit', updateRouteFormHandler);