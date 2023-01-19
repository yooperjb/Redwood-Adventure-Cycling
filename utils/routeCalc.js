
const getPoints = (miles,elevation) => {
    
    diff = elevation/miles;
    let ratio_points = 0;
    if (diff <= 40) {
        ratio_points = 10;
    } else if (diff <= 80) {
        ratio_points = 20;
    } else if (diff <= 120) {
        ratio_points = 30;
    } else if (diff <= 160) {
        ratio_points = 40;
    } else {
        ratio_points = 50
    }
    
    let mile_points = 0;
    if (miles < 25) {
        mile_points = 5;
    } else if (miles < 50) {
        mile_points = 10;
    } else if (miles < 75) {
        mile_points = 15;
    } else if (miles < 100) {
        mile_points = 20;
    } else {
        mile_points = 25;
    }

    let elev_points = 0;
    if (elevation < 2000) {
        elev_points = 5;
    } else if (elevation < 4000) {
        elev_points = 10;
    } else if (elevation < 7000) {
        elev_points = 15;
    } else if (elevation < 10000) {
        elev_points = 20;
    } else {
        elev_points = 25;
    }

    return ratio_points + mile_points + elev_points;
}

const getDifficulty = (points) => {
    console.log("points", points)
    if (points >80) {
        return "Epic";
    } else if (points >= 66) {
        return "Very Difficult";
    } else if (points >= 51) {
        return "Difficult";
    } else if (points >= 36) {
        return "Moderate";
    } else {
        return "Easy"
    }
}

module.exports = {getPoints, getDifficulty};