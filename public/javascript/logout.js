//IIFE -- immediately invoked function expression - keeps the scope local to the page
(() => {
    const logoutBtn = document.querySelector('#logout')
    console.log(logoutBtn)
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (event) => {
            event.preventDefault()
            const res = await fetch('/logout', {
                method: 'delete'
            })
            if (res.ok) {
                window.location.replace('/')
            }

        })
    }
})()
