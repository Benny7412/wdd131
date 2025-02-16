const topSpotsContainer = document.querySelector(`#top-spots-container`);
const informationalSection = document.querySelector(`#informational-section`);


const bestSpots = [
    {
        //#1 restaurant
        restaurantName: "The Salt Lick",
        website: "",
        ranking: 1,
        imageURL: "images/salt-lick-front.jpg",
        locations: [
            { lat: 30.13200681403259, lng: -98.01348601719303, address: "18300 Ranch to Market Rd 1826, Driftwood, TX 78619", phone: "+15128584959" }
        ],

        //Information
        infoImageURL: "images/salt-lick-bbq.webp",
        infoText: `The Salt Lick was opened in Driftwood in 1967 by Thurman Roberts, Sr. and his wife Hisako T. Roberts. It quickly grew in popularity and went from being open just a few times a year to seven days a week. Roberts and Hisako built the Salt Lick restaurant on the ranch where he was born, using locally quarried limestone. Hisako's Hawaiian heritage inspired the sweet barbecue sauce used in the restaurant. Thurman died in 1981, leaving Hisako in charge of The Salt Lick until 1985, when she passed control of the restaurant to its current owners, Scott Roberts and Scott's wife Susan.`,
    },
    {
        //#2 restaurant
        restaurantName: "Hutchins BBQ",
        website: "hutchinsbbq.com",
        ranking: 2,
        imageURL: "images/hutchins-front.jpg",
        locations: [
            { lat: 33.154559851431294, lng: -96.80476525336695, address: "9225 Preston Rd, Frisco, TX 75033", phone: "+19723772046" },
            { lat: 33.21594952837449, lng: -96.61383862847727, address: "1301 N Tennessee St, McKinney, TX 75069", phone: "+19725482629" }
        ],

        //Information
        infoImageURL: "images/hutchins-bbq.jpg",
        infoText: `Hutchin's journey began in 1978 when our parents, Roy and Delores, attached a BBQ restaurant to our family home in Princeton, Texas. From a young age, we’ve been immersed in the rich traditions of Texas BBQ. It’s hard work, certainly, but for us it’s more than that. It’s a way of life. We’re passionate about BBQ, and we want our guests to feel that intuitively every time they visit us in McKinney or Frisco. We were also voted “Best BBQ in DFW” in a Dallas Morning News reader poll, Along the way, we even invented the iconic Texas Twinkie!`,
    },
    {
        //#3 restaurant
        restaurantName: "Tender Smokehouse",
        website: "",
        ranking: 3,
        imageURL: "images/tender-front.jpg",
        locations: [
            { lat: 33.232906604216595, lng: -96.91976779325398, address: "26781 US-380, Aubrey, TX 76227", phone: "+12146120059" },
            { lat: 33.131763593151334, lng: -96.80166476954331, address: "4226 Preston Rd, Frisco, TX 75034", phone: "+12144942080" },
            { lat: 33.17085541482577, lng: -96.94242709431477, address: "100 Hardwicke Ln, Little Elm, TX 75068", phone: "+19722929516" },
            { lat: 33.329343206505136, lng: -96.7790054703835, address: "224 W Pecan St, Celina, TX 75009", phone: "+14692023000" }
        ],

        //Information
        infoImageURL: "images/tender-bbq.jpg",
        infoText: "Tender offers handcrafted Pit BBQ along with other “Fave & Crave” items, as well as friendly service in a relaxed atmosphere. Although Tender restaurants will ultimately be found across the Texas landscape, Celina will always be the heart of Tender Smokehouse. Tender smokehouse has been in operation since 2017.",
    }

]


function createBBQSpot(spot) {
    const bbqContainer = document.createElement("div");
    bbqContainer.id = `number-${spot.ranking === 1 ? "one" : spot.ranking === 2 ? "two" : "three"}`;
    bbqContainer.classList.add("bbq-spot-container", "info-card-styling");

    const name = document.createElement("h2");
    name.classList.add("bbq-spot-header");
    name.textContent = `#${spot.ranking} ${spot.restaurantName}`;

    const restaurantImage = document.createElement("img");
    restaurantImage.src = spot.imageURL;
    restaurantImage.alt = spot.restaurantName;
    restaurantImage.loading = "lazy";

    const showLocation = document.createElement("a");
    showLocation.textContent = "Show Locations";
    showLocation.classList.add("expand-button");
    showLocation.href = "#";

    const locationDropdown = document.createElement("div");
    locationDropdown.classList.add("location-dropdown");
    locationDropdown.style.position = "absolute";
    locationDropdown.style.display = "none";

    spot.locations.forEach(location => {
        const locationItem = document.createElement("p");
        locationItem.textContent = `${location.address} - Phone: ${location.phone}`;
        locationDropdown.appendChild(locationItem);
    });

    showLocation.addEventListener("click", (event) => {
        event.preventDefault();
        const isCurrentlyHidden = locationDropdown.style.display === "none";
        locationDropdown.style.display = isCurrentlyHidden ? "block" : "none";

        if (isCurrentlyHidden) {
            localStorage.setItem('lastExpandedSpot', spot.restaurantName);
        } else {
            localStorage.removeItem('lastExpandedSpot');
        }
    });

    bbqContainer.append(name, restaurantImage, showLocation, locationDropdown);
    return bbqContainer;
}


function createInfoCard(spot) {
    const infoContainer = document.createElement("div");
    infoContainer.id = `number-${spot.ranking}-info-container`;
    infoContainer.classList.add("info-card", "info-card-styling");

    const infoHeader = document.createElement("h3");
    infoHeader.classList.add("info-card-header");
    infoHeader.textContent = spot.restaurantName

    const infoImage = document.createElement("img");
    infoImage.src = spot.infoImageURL;
    infoImage.alt = `Image for ${spot.restaurantName} info`;
    infoImage.loading = "lazy";

    const infoText = document.createElement("p");
    infoText.textContent = spot.infoText;

    infoContainer.append(infoHeader, infoImage, infoText);
    return infoContainer;
}

function addBestSpots() {
    bestSpots.forEach((spot) => {
        const bbqSpotElement = createBBQSpot(spot);
        const infoCardElement = createInfoCard(spot);

        topSpotsContainer.appendChild(bbqSpotElement);
        informationalSection.appendChild(infoCardElement);
    });

    const lastExpandedSpotName = localStorage.getItem('lastExpandedSpot');
    if (lastExpandedSpotName) {
        const spotToExpand = bestSpots.find(spot => spot.restaurantName === lastExpandedSpotName);
        if (spotToExpand) {
            const spotElement = topSpotsContainer.querySelector(`#number-${spotToExpand.ranking === 1 ? "one" : spotToExpand.ranking === 2 ? "two" : "three"}`);
            if (spotElement) {
                const showLocationLink = spotElement.querySelector('.expand-button');
                if (showLocationLink) {
                    const locationDropdown = spotElement.querySelector('.location-dropdown');
                    locationDropdown.style.display = "block";
                }
            }
        }
    }
}

addBestSpots();