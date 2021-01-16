async function editFormHandler(event) {
    event.preventDefault();
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];
    const response = await fetch(`/user_routes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            approved,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.approve-form').addEventListener('submit', editFormHandler);