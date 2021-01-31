const buttonDiv = document.querySelector('.leader-buttons');
const tableRow = document.querySelectorAll('[data-gender]');

const leaderBoardFilter= function(event) {
    event.preventDefault();
    // get id of clicked button
    const sex = event.target.id;

    if (sex === "overall") {
        tableRow.forEach(row => {
            row.style.display = "";
        })
    } else if (sex === "male") {
        tableRow.forEach(row => {
            if (row.dataset.gender === "M") {
                row.style.display = ""
            } else {
                row.style.display = "none"
            }
        })
    } else if (sex === "female") {
        tableRow.forEach(row => {
            if (row.dataset.gender === "F") {
                row.style.display = ""
            } else {
                row.style.display = "none"
            }
        })
    }
};

// event listener for filter buttons div
buttonDiv.addEventListener('click', leaderBoardFilter);