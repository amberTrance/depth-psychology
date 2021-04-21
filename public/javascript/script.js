let links = document.getElementById('links')

links.addEventListener('click', () => {
    links.classList.toggle('responsive')
})

// Error/success message handling
let xs = document.querySelectorAll('.x')

xs.forEach(x => {
    x.addEventListener('click', () => {
        x.parentElement.classList.add('hide')
    })
})
