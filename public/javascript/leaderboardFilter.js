
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

async function routeFilterHandler(event) {
    filter = document.querySelector("#route-filter").value;
    const url = window.location.href.split('?')[0];
    console.log(filter)
    if (filter) {
        query = `?route=${filter}`;
        window.location.href = url+query;
    } else {
        window.location.href = url;
    }
}

document.querySelector('#gender-filter').addEventListener('change', genderFilterHandler);
document.querySelector('#route-filter').addEventListener('change', routeFilterHandler);