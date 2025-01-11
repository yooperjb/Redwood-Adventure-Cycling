async function createSegmentFormHandler(event) {
    event.preventDefault();

    // grab values from create-segment form inputs
    const segmentId = document.querySelector('#segmentId').value;
    const year = document.querySelector('#segYear').value;
    
    console.log("segmentId",segmentId);
    console.log("year", year)
    
    // send create-segment form variables to api
    response = await fetch("/api/bikeroutes/segment", {
        method: 'POST',
        body: JSON.stringify({
            segmentId,
            year
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Create success modal here...
    if (response.ok) {
        console.log("Response OK");
        // document.querySelector('#ridewithgps-id').value = "";
        // document.querySelector('#year').value = "";
        // console.log(response);
        openModal("createSegmentModal")
    } else {
        console.log("Segment NOT Created");
        console.log(response)
        alert(response.statusText);
    }
};

// event listener for create-route submit button
document.querySelector('.create-segment').addEventListener('submit', createSegmentFormHandler);