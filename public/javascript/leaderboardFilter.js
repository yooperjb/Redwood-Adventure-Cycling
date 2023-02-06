
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
    // const url = new URL(window.location.href.split('?')[0])
    // console.log("filter",filter)
    if (filter) {
        query = `?route=${filter}`;
        window.location.href = url+query;
        // url.searchParams.set("route", filter)
        // window.history.pushState({}, '', url.toString());
    } else {
        window.location.href = url;
    }
    console.log('url', url)
    console.log("filter",filter)
    console.log(window.location.href)
}

document.querySelector('#gender-filter').addEventListener('change', genderFilterHandler);
// document.querySelector('#route-filter').addEventListener('change', routeFilterHandler);