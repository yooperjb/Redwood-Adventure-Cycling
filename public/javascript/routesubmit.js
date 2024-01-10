
async function routeSubmitFormHandler(event) {
    event.preventDefault();

    // acceptable image file types
    const file_types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    // grab values from route-submit form inputs
    const inputs = document.querySelectorAll("#route_id, #ride_link, #photo");
    rideData = document.querySelector("#ride_link").selectedOptions[0]
    
    console.log('rideData',rideData)
    console.log('inputs', inputs)

    const photoFile = document.querySelector('#photo').files[0];
    const sizeError = document.querySelector('.size-error');
    const typeError = document.querySelector('.type-error');
    
    formData = new FormData();
    
    inputs.forEach(input => {
        formData.append(input.id, input.value.trim());
    })
    formData.append('ride_time', rideData.getAttribute("data-ride-time"))
    formData.append('date_completed', rideData.getAttribute("data-ride-date"))


    console.log('formData', formData);

    // if photo file submitted check file type and size
    if (photoFile) {
        if (!file_types.includes(photoFile.type) ) {
            console.log("image type not supported!");
            // turn on hidden span here
            typeError.setAttribute('class', 'type-error active');
            return
        } else if (photoFile.size > 12500000) {
            console.log("File size must be < 12mb")
            // turn on hidden span here
            sizeError.setAttribute('class', 'size-error active');
            return
        } else {
            formData.append('photo', photoFile)
        }
    }
    

    // POST user ridden route to server
    const response = await fetch('/api/user-routes', {
        method: 'POST',
        body: formData
    })
    if (response.ok) {
        console.log("Ride Submitted!");
        // reload page and reset form values
        document.location.reload();
        
        // clear form values
        const inputs = document.querySelectorAll("#route_id, #ride_link #photo");
        inputs.forEach(input => {
            input.value = "";
        });
    
    } else {
        console.log("Ride NOT Submitted");
        alert(response.statusText);
    }
};


async function clearErrorHandler(event) {
    document.querySelector('.type-error').setAttribute('class', 'type-error inactive');
    document.querySelector('.size-error').setAttribute('class', 'size-error inactive');
}

// event listeners
document.querySelector('.route-form').addEventListener('submit', routeSubmitFormHandler);
document.querySelector('#photo').addEventListener('click', clearErrorHandler);