// Footer Content
const year = new Date().getFullYear();
let oLastModif = new Date(document.lastModified);

// Hamburger menu
const mainnav = document.querySelector('.navigation')
const hamburger = document.querySelector('#menu')

document.querySelector("#currentyear").textContent = "\u00A9" + year;
document.querySelector("#lastModified").textContent = oLastModif;


hamburger.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hamburger.classList.toggle('show');
});