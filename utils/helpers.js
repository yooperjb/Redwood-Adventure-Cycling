module.exports = {
    format_miles: miles => {
        return Math.round(miles*10)/10;
    },

    format_thousands: num => {
        return Number(num.toFixed(1)).toLocaleString();
    },
    
    format_time: time_string => {
        return time_string.split(":")[0] +":"+ time_string.split(":")[1];
    },
    
    format_month_day: full_date => {
        date_split = full_date.split("-");
        return `${date_split[1]}-${date_split[2]}-${date_split[0]}`
    },
    
    format_month_day_time: full_date => {
        get_month = full_date.getMonth();
        get_day = full_date.getDate();
        get_year = full_date.getFullYear();
        get_time = full_date.toLocaleTimeString('en-US',{hour: '2-digit', minute: '2-digit' })
        return `${get_month+1}-${get_day}-${get_year} ${get_time}`;
    },

    add1: num => {
        return num+1;
    },

    uppercase: lowercase => {
        return lowercase.toUpperCase();
    }
}