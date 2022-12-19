module.exports = {
    format_miles: miles => {
        return Math.round(miles*10)/10;
    },

    format_thousands: num => {
        return Number(num).toLocaleString();
    },
    format_time: time_string => {
        return time_string.split(":")[0] +":"+ time_string.split(":")[1];
    }
}