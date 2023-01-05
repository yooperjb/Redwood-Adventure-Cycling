
const getPoints = (miles,elevation) => {
    
    diff = elevation/miles;
    let diff_points = 0;
    switch(true) {
        case (diff < 50):
            diff_points = 10;
            // break;
        case (diff >= 50 && diff < 100):
            diff_points = 20;
            // break;
        case (diff >= 100 && diff < 125):
            diff_points = 30;
            // break;
        case (diff >= 125 && diff < 150):
            diff_points = 40;
            // break;
        case (diff >= 150):
            diff_points = 50;
            // break;
    }
    let mile_points = 0;
    switch(miles) {
        case (miles < 25):
            mile_points = 5;
            break;
        case (miles >= 25 && miles < 50):
            mile_points = 10;
            break;
        case (miles >= 50 && miles < 75):
            mile_points = 15;
            break;
        case (miles >= 75 && miles < 100):
            mile_points = 20;
            break;
        case (miles >= 100):
            mile_points = 25;
            break;
    }
    let elev_points = 0;
    switch(elevation) {
        case (elevation < 2000):
            elev_points = 5;
            break;
        case (elevation >=2000 && elevation < 4000):
            elev_points = 10;
            break;
        case (elevation >= 4000 && elevation < 8000):
            elev_points = 15;
            break;
        case (elevation >= 8000 && elevation < 10000):
            elev_points = 20;
            break;
        case (elevation >= 10000):
            elev_points = 25;
            break;
    }

    return diff_points + mile_points + elev_points;
}

const getDifficulty = (points) => {
    console.log("points", points)
    if (points >=80) {
        return "Epic";
    } else if (points >= 65) {
        return "Very Difficult";
    } else if (points >= 50) {
        return "Difficult";
    } else if (points >= 35) {
        return "Moderate";
    } else {
        return "Easy"
    }
}

module.exports = {getPoints, getDifficulty};