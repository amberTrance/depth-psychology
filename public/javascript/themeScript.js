const themeSwitch = document.getElementById('theme-switch')
const lightBtn = document.querySelector('.light-btn')
const darkBtn = document.querySelector('.dark-btn')

let style = localStorage.getItem('style')

if (style == null) {
    setTheme('light');
} else {
    setTheme(style);
}

lightBtn.addEventListener('click', () => {
    let theme = 'light'

    setTheme(theme)
})

darkBtn.addEventListener('click', () => {
    let theme = 'dark'

    setTheme(theme)
})

function setTheme(theme) {
    if (theme == 'light') {
      themeSwitch.href = '/stylesheets/themes/light.css'
    } else {
    //   themeSwitch.href = '/stylesheets/themes/dark.css'
    }
    localStorage.setItem('style', theme);
}
