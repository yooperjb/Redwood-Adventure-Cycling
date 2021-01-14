//Set calendar date in dashboard submit route form to today.
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#today").value = today;


// $(document).ready(function () {
//     $('input.bs-timepicker').timepicker();
// });