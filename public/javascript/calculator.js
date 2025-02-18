function calculatePoints() {
    // Get input values
    const miles = parseFloat(document.getElementById("mileage").value);
    const elevation = parseFloat(document.getElementById("elevation").value);

    // Validate inputs
    if (isNaN(miles) || isNaN(elevation) || miles <= 0 || elevation < 0) {
        document.getElementById("result").innerHTML = "Please enter valid mileage and elevation.";
        return;
    }

    // Calculate points
    const milePoints = getMilePoints(miles);
    const elevPoints = getElevPoints(elevation);
    const ratioMultiplier = getRatioMultiplier(elevation, miles);
    const totalPoints = (milePoints + elevPoints) * ratioMultiplier;
    
    const results = {
        milePoints: milePoints,
        elevPoints: elevPoints,
        ratioMultiplier: ratioMultiplier,
        totalPoints: totalPoints
    }
    
    console.log("milesPoints", milePoints)
    console.log('elevationPoints', elevPoints)
    console.log('multiplier', ratioMultiplier)
    console.log('totalPoints', totalPoints)
    console.log('results', results)


    // Display the results
    displayResults(results);
}

function getMilePoints(miles) {
    
    let mile_points = 0;
    if (miles < 25) {
        mile_points = 10;
    } else if (miles < 50) {
        mile_points = 20;
    } else if (miles < 75) {
        mile_points = 30;
    } else if (miles < 100) {
        mile_points = 40;
    } else {
        mile_points = 50;
    }
    return mile_points;
}

function getElevPoints(elevation) {

    let elev_points = 0;
    if (elevation < 2000) {
        elev_points = 10;
    } else if (elevation < 4000) {
        elev_points = 20;
    } else if (elevation < 7000) {
        elev_points = 30;
    } else if (elevation < 10000) {
        elev_points = 40;
    } else {
        elev_points = 50;
    }
    return elev_points;
}

function getRatioMultiplier(elevation, miles) {
    diff = elevation/miles;
    let multiplier = 0;

    if (diff <= 40) {
        multiplier = 1.1;
    } else if (diff <= 80) {
        multiplier = 1.2;
    } else if (diff <= 120) {
        multiplier = 1.3;
    } else if (diff <= 160) {
        multiplier = 1.4;
    } else {
        multiplier = 1.5
    }
    return multiplier;
}

function displayResults(results) {
    const resultContainer = document.getElementById("results");

    resultContainer.innerHTML = `
    <div id='box1'>
    <p class='title'>Mileage</p> 
    <p class='point-box'><strong>${results.milePoints}</strong></p>
    </div>

    <div id='box2'>
    <p class='title'>Elevation</p> 
    <p class='point-box'><strong>${results.elevPoints}</strong></p>
    </div>

    <div id='box3'>
    <p class='title'>Multiplier</p> 
    <p class='point-box'><strong>${results.ratioMultiplier}</strong></p>
    </div>

    <div id='box4'>
    <p class='title'>Total</p> 
    <p class='point-box'><strong>${results.totalPoints}</strong></p>
    </div>
    `;
    // resultContainer.innerHTML = `
    // <ul class="no-dot">
    // <li>Mileage Points: <strong>${results.milePoints}</strong></li>
    // <li>Elevation Points: <strong>${results.elevPoints}</strong></li>
    // <li>Ratio Multiplier: <strong>${results.ratioMultiplier}</strong></li>
    // <li>Total Points: <strong>${results.totalPoints}</strong></li>
    // </ul>
    // `;
}