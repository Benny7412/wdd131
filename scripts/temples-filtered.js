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


//Temples 
const templeContainer = document.getElementById('temple-container');
const oldTemplesLink = document.querySelector("#old-temples");
const newTemplesLink = document.querySelector("#new-temples");
const largeTemplesLink = document.querySelector("#large-temples");
const smallTemplesLink = document.querySelector("#small-temples");
const homeLink = document.querySelector("#home");

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "images/aba-nigeria-temple.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "images/manti-temple.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "images/payson-utah-temple.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "images/yigo_guam_temple.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "images/washington_dc_temple.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "images/lima-peru-temple.jpg"
    },
    {
        templeName: "Mexico City",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "images/mexico-city-temple.jpg"
    },
    {
        templeName: "Salt Lake City",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "images/salt-lake-temple.webp"
    },
    {
        templeName: "Sapporo Japan",
        location: "Sapporo, Japan",
        dedicated: "2011, October, 22",
        area: 48480,
        imageUrl:
            "images/sapporo-japan-temple.webp"
    },
    {
        templeName: "Stockholm Sweden",
        location: "Stockholm, Sweden",
        dedicated: "1984, March, 17",
        area: 31000,
        imageUrl:
            "images/stockholm-sweden-temple.webp"
    }
];

if (oldTemplesLink) {
    oldTemplesLink.addEventListener("click", () => {
        //clearing
        templeContainer.innerHTML = "";

        addTempleCards(temples.filter(temple => parseInt(temple.dedicated.slice(0, 4), 10) < 1900));
    })
};

if (newTemplesLink) {
    newTemplesLink.addEventListener("click", () => {
        //clearing
        templeContainer.innerHTML = "";

        addTempleCards(temples.filter(temple => parseInt(temple.dedicated.slice(0, 4), 10) > 2000))
    })
};

if (largeTemplesLink) {
    largeTemplesLink.addEventListener("click", () => {
        //clearing
        templeContainer.innerHTML = "";

        addTempleCards(temples.filter(temple => temple.area > 90000))
    })
};

if (smallTemplesLink) {
    smallTemplesLink.addEventListener("click", () => {
        //clearing
        templeContainer.innerHTML = "";

        addTempleCards(temples.filter(temple => temple.area < 10000))
    })
};

if (home) {
    home.addEventListener("click", () => {

        templeContainer.innerHTML = "";

        addTempleCards(temples)
    })
};


function addTempleCards(filteredTemples) {
    filteredTemples.forEach((temple) => {

        //this creates the container
        let card = document.createElement('div');
        card.classList.add('temple-card');

        //This is used for populating the text later
        //name
        let name = document.createElement('h2');
        name.textContent = temple.templeName;

        //location
        let location = document.createElement('p');
        location.textContent = `Location: ${temple.location}`;

        //dedicated
        let dedicated = document.createElement('p');
        dedicated.textContent = `Dedicated: ${temple.dedicated}`;

        //area
        let area = document.createElement('p');
        area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

        // Create image element with lazy loading
        let image = document.createElement('img');
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";

        // building the card
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);

        //putting card into our container
        templeContainer.appendChild(card);
    });
}

addTempleCards(temples);
