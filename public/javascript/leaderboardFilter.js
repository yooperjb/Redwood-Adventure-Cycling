
async function genderFilterHandler(event) {
    const genderFilter = document.querySelector("#gender-filter").value;
    const urlParams = new URLSearchParams(window.location.search);

    if (genderFilter) {
        urlParams.set('gender', genderFilter);

    } else {
       urlParams.delete('gender');
    }

    // Preserve year filter if exists
    const yearFilter = document.querySelector("#year-filter").value;
    if (yearFilter) {
        urlParams.set('year', yearFilter)
    }
    window.location.href = window.location.pathname + '?' + urlParams.toString();
};

async function yearFilterHandler(event) {
    const yearFilter = document.querySelector("#year-filter").value;
    const urlParams = new URLSearchParams(window.location.search);

    if (yearFilter) {
        urlParams.set('year', yearFilter); // Update or add year filter
    } else {
        urlParams.delete('year'); // Remove year filter if none is selected
    }

    // Preserver gender filter if exists
    const genderFilter = document.querySelector("#gender-filter").value;
    if (genderFilter) {
        urlParams.set('gender', genderFilter);
    } else {
        urlParams.delete('gender'); // Remove gender filter if none is selected
    }

    window.location.href = window.location.pathname + '?' + urlParams.toString();
};


document.querySelector('#gender-filter').addEventListener('change', genderFilterHandler);
document.querySelector('#year-filter').addEventListener('change', yearFilterHandler);