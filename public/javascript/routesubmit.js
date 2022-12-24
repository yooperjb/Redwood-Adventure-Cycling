
async function routeSubmitFormHandler(event) {
    event.preventDefault();

    // grab values from route-submit form inputs
    const route_id = document.querySelector('#route-name').value;
    const date_completed = document.querySelector('#route-date').value;
    const ride_time = document.querySelector('#ride-time').value;
    const ride_link = document.querySelector('#ride-link').value.trim();
    const photo_name = document.querySelector('#route-photo').value;
    const photo = document.querySelector('#route-photo').files[0];

    formData = new FormData();
    formData.append('route_id',route_id)
    formData.append('date_completed',date_completed)
    formData.append('ride_time',ride_time)
    formData.append('ride_link',ride_link)
    formData.append('photo_name',photo_name)
    formData.append('photo',photo)
    
    console.log(route_id, date_completed, ride_time, ride_link, photo_name, photo);
    
    if (date_completed && ride_time && ride_link) {
        // POST user ridden route to server
        const response = await fetch('/api/user-routes', {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            console.log("Ride submitted");
            // reload page and reset form values
            document.location.reload();
            
            const inputs = document.querySelectorAll("#route-name, #route-date, #ride-time, #ride-link, #route-photo");

            inputs.forEach(input => {
                input.value = "";
            });
        
        } else {
            console.log("Ride NOT Submitted");
            alert(response.statusText);
        }
    }
};

// event listener for ride submission submit button
document.querySelector('.route-form').addEventListener('submit', routeSubmitFormHandler);