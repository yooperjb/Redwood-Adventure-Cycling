document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-description');

    toggleButtons.forEach(function (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const descriptionContent = toggleButton.previousElementSibling;
            console.log("descriptionContent", descriptionContent)
            descriptionContent.classList.toggle('collapsed');
            toggleButton.textContent = descriptionContent.classList.contains('collapsed') ? 'Read More' : 'Read Less';
        });
    });
});

