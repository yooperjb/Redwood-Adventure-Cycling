module.exports = {
    format_miles: miles => {
        return Math.round(miles*10)/10;
    },

    format_thousands: num => {
        return Number(num).toLocaleString();
    },
    format_time: time_string => {
        return time_string.split(":")[0] +":"+ time_string.split(":")[1];
    },
    format_month_day: full_date => {
        date_split = full_date.split("-");
        return date_split[1] +"-"+ date_split[2];
    },
    format_month_day_time: full_date => {
        get_month = full_date.getMonth();
        get_day = full_date.getDate();
        get_hours = full_date.getHours();
        get_minutes = full_date.getMinutes();
        return get_month + "-" + get_day + " " + get_hours + ":" + get_minutes;
    }
}