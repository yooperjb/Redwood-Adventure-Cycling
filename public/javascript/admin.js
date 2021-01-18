

async function approvalFormHandler(event) {
    event.preventDefault();
    
    const container = document.querySelector('.approve-form');
    const approve = container.querySelectorAll('input, checkbox');
    //console.log("approve",approve);
    //console.log(typeof(approve));

    ids = [];
    
    approve.forEach(route => {
        if (route.checked){
            ids.push(parseInt(route.value));
        }
    });

    console.log("ids",ids)

    const response = await fetch('/api/user_routes/', {
        method: 'PUT',
        body: ids,
        
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.approve-form').addEventListener('submit', approvalFormHandler);