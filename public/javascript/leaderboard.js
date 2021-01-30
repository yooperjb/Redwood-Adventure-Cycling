const buttonDiv = document.querySelector('.buttons');
const tableRow = document.querySelectorAll('[data-gender]');

const leaderBoardFilter= function(event) {
    event.preventDefault();
    console.log("Event:",event.target.id);
    console.log(tableRow);
    //const maleRow = document.querySelectorAll('[data-gender=M]');
    //console.log(maleRow);
    //console.log(typeof(tableRow));
    const sex = event.target.id;
    //console.log("this",this);
    if (sex === "overall") {
        //console.log("Sex:", sex);
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
    } else {
        tableRow.forEach(row => {
            if (row.dataset.gender === "F") {
                row.style.display = ""
            } else {
                row.style.display = "none"
            }
        //console.log("Sex",sex);
    })
    }
};




// event listener for filter buttons
buttonDiv.addEventListener('click', leaderBoardFilter);