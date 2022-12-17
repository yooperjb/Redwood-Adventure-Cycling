//Set calendar date in dashboard submit route form to today.
// Calendar seems to do this automatically
let newDate = new Date();
let today = `${newDate.getMonth()+1} / ${newDate.getDate()} / ${newDate.getFullYear()}`;
document.querySelector("#route-date").value = today;