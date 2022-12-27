async function genderFilterHandler(event) {
    filter = document.querySelector("#gender-filter").value;
    const url = window.location.href.split('?')[0];

    if (filter) {
        
        query = `?gender=${filter}`;
        window.location.href = url+query;

    } else {
       window.location.href = url;
    }
}

document.querySelector('#gender-filter').addEventListener('change', genderFilterHandler);