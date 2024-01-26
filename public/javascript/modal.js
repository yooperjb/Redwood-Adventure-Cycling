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

// function to open the submit route modal
// change to input parameter into function for different modals. Then open modal with that id. can be used for other pages/modals
function openModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
[...spans].forEach((span, ind) => {
  span.onclick = () => {
    closeModal(modals[ind].id);
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  [...modals].forEach((modal) => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  })
};

// function to improve modal closure ability with different modals
function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  // Check if modal is the route submission modal
  if (modalId === 'successModal') {
    const inputs = document.querySelectorAll("#route_id, #ride_link, #photo");

    // clear the form inputs
    inputs.forEach(input => {
      input.value = "";
    });

    // reload the page
    document.location.reload();
  }

  // add else if and other modals for closing here

  // Close the modal
  modal.style.display = 'none';
}