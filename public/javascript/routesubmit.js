
async function routeSubmitFormHandler(event) {
    event.preventDefault();

    // grab values from route-submit form inputs
    const route_id = document.querySelector('#route-name').value;
    const date_completed = document.querySelector('#route-date').value;
    const ride_time = document.querySelector('#ride-time').value;
    const ride_link = document.querySelector('#ride-link').value.trim();
    // const photo = document.querySelector('#upload').value;

    console.log(route_id, date_completed, ride_time, ride_link);
    
    if (date_completed && ride_time && ride_link) {
        // POST user ridden route to server
        const response = await fetch('/api/user-routes', {
            method: 'POST',
            body: JSON.stringify({
                route_id,
                date_completed,
                ride_time,
                ride_link,
                // photo,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log("Ride submitted");
            // reload page and reset form values
            document.location.reload();
            
            const inputs = document.querySelectorAll("#route-name", "#route-date", "#ride-time", "#ride-link");

            inputs.forEach(input => {
                input.value = "";
            });
            
            // document.querySelector('#route-name').value = "";
            // document.querySelector('#route-date').value = "";
            // document.querySelector('#ride-time').value = "";
            // document.querySelector('#ride-link').value = "";
        
        } else {
            console.log("Ride NOT Submitted");
            alert(response.statusText);
        }
    }
};

// event listener for ride submission submit button
document.querySelector('.route-form').addEventListener('submit', routeSubmitFormHandler);