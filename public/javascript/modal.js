// Get the Question Mark that opens the modal
const qMarks = document.getElementsByClassName("question-mark");

// Get the modal
const modals = document.getElementsByClassName("modal");

// Get the <span> element that closes the modal
const spans = document.getElementsByClassName("close");

// When the user clicks on the ? button, open the modal
[...qMarks].forEach((btn, ind) => {
  btn.onclick = () => (modals[ind].style.display = 'block')
});

function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
[...spans].forEach((span, ind) => {
  span.onclick = () => {
    closeModal(modals[ind].id);
  }
});

// When the user clicks anywhere outside of the modal, close it with closeModal()
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
  const inputs = document.getElementsByTagName('input');
  const selects = document.getElementsByTagName('select');

  console.log('inputs', inputs)
  console.log('selects', selects)

  Object.values(inputs).forEach(input => {
    input.value = ''
  })

  Object.values(selects).forEach(select => {
    select.value = ''
  })

  // Close the modal
  modal.style.display = 'none';
  
  // reload the page
  window.location.reload();
}