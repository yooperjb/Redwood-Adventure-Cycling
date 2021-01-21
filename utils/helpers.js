module.exports = {
    format_miles: miles => {
        return Math.round(miles*10)/10;
    },

    format_thousands: num => {
        return Number(num).toLocaleString();
    },
}