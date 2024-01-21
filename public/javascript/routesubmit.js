async function routeSubmitFormHandler(event) {
    event.preventDefault();

    // acceptable image file types
    const file_types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    // grab values from route-submit form inputs
    const inputs = document.querySelectorAll("#route_id, #ride_link, #photo");
    let rideData = document.querySelector("#ride_link").selectedOptions[0];
    const photoFile = document.querySelector('#photo').files[0];
    const sizeError = document.querySelector('.size-error');
    const typeError = document.querySelector('.type-error');
    let formData = new FormData();
    
    inputs.forEach(input => {
        formData.append(input.id, input.value.trim());
    })
    formData.append('ride_time', rideData.getAttribute("data-ride-time"))
    formData.append('date_completed', rideData.getAttribute("data-ride-date"))

    // if photo file submitted check file type and size
    if (photoFile) {
        if (!file_types.includes(photoFile.type) ) {
            console.log("Image type not supported!");
            // turn on hidden span here
            typeError.setAttribute('class', 'type-error active');
            return;
        } else if (photoFile.size > 12500000) {
            console.log("File size must be < 12mb")
            // turn on hidden span here
            sizeError.setAttribute('class', 'size-error active');
            return;
        } else {
            formData.append('photo', photoFile)
        }
    }
    
    // POST user ridden route to server
    const response = await fetch('/api/user-routes', {
        method: 'POST',
        body: formData
    });

    const responseData = await response.json();

    if (response.ok) {
        console.log("Ride Submitted!");
        // Open the Ride Submit Success Modal
        openModal();
    
    } else {
        console.log("Ride NOT Submitted");
        // Check if the response includes an 'error field'
        if (responseData.error) {
            // Display the error message to the user (Customize in utils/date.js)
            alert(responseData.message);
        } else {
            // If no specific error message, alert with the status text.
            alert(response.statusText);
        }
    }
};

async function clearErrorHandler(event) {
    document.querySelector('.type-error').setAttribute('class', 'type-error inactive');
    document.querySelector('.size-error').setAttribute('class', 'size-error inactive');
}

// event listeners
document.querySelector('.route-form').addEventListener('submit', routeSubmitFormHandler);
document.querySelector('#photo').addEventListener('click', clearErrorHandler);
// document.querySelector('.modal-close').addEventListener('click', closeModal);