
async function approvalFormHandler(event) {
    event.preventDefault();
    
    const container = document.querySelector('.approve-form');
    const approve = container.querySelectorAll('input, checkbox');

    ids = [];
    
    approve.forEach(route => {
        if (route.checked){
            ids.push(parseInt(route.value));
        }
    });

    // console.log("ids",JSON.stringify(ids));
    
    const response = await fetch('/api/user-routes/', {
        method: 'PUT',
        body: JSON.stringify(ids),
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