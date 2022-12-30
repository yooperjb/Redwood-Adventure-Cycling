// Get the Question Mark that opens the modal
const qMarks = document.getElementsByClassName("question-mark");

// Get the modal
const modals = document.getElementsByClassName("modal");

// Get the <span> element that closes the modal
const spans = document.getElementsByClassName("close");

// When the user clicks on the button, open the modal
[...qMarks].forEach((btn, ind) => {
    btn.onclick = () => (modals[ind].style.display = 'block')
});

// qMark.onclick = function() {
//     console.log("button clicked");
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
[...spans].forEach(( span, ind) => {
    span.onclick = () => (modals[ind].style.display = 'none');
});

// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  [...modals].forEach(( modal) => {
        if (event.target === modal) {
    modal.style.display = "none";
  }
  })
}