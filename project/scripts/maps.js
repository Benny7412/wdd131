document.getElementById("get-location-btn").addEventListener("click", getLocation);
const restaurantTable = document.getElementById(`restaurant-table`);
let map;
let service;

async function initMap() {
    const defaultLocation = { lat: 32.812973, lng: -97.085035 }; // DFW Metroplex
    const [{ Map }, { PlacesService }] = await Promise.all([
        //loading the libraries dynamically using the bootstrapper
        google.maps.importLibrary("maps"),
        google.maps.importLibrary("places"),
    ]);

    map = new Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 9,
        mapId: "DEMO_MAP_ID",
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    });

    service = new PlacesService(map);
    console.log("PlacesService initialized:", service);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                restaurantTable.innerHTML = "Loading...";
                updatePos(lat, lng);
                searchBBQ(lat, lng);
            },
            function (error) {
                console.log("User denied location access or an error occurred.");
                restaurantTable.innerHTML = "Location access denied or error.";
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        restaurantTable.innerHTML = "Geolocation not supported.";
    }
}

function updatePos(lat, lng) {
    if (map) {
        const newCenter = new google.maps.LatLng(lat, lng);
        map.setCenter(newCenter);
        console.log("Map updated to new coordinates:", newCenter);
    } else {
        console.error("Map is not initialized.");
    }
}

async function searchBBQ(lat, lng) {
    if (!service) {
        console.error("PlacesService stopped working again");
        restaurantTable.innerHTML = "Error: PlacesService unavailable.";
        return;
    } else {
        const { Place } = await google.maps.importLibrary("places");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        const request = {
            textQuery: "BBQ",
            fields: [
                "displayName",
                "location",
                "formattedAddress",
                "priceLevel",
                "rating",
                "nationalPhoneNumber",
                "userRatingCount",
                "photos",
            ],
            includedType: "restaurant",
            locationBias: { lat: lat, lng: lng },
            language: "en-US",
            maxResultCount: 10,
            minRating: 0.0,
            region: "us",
            useStrictTypeFiltering: false,
        };

        try {
            const { places } = await Place.searchByText(request);
            if (places.length) {
                console.log(places);

                const { LatLngBounds } = await google.maps.importLibrary("core");
                const bounds = new LatLngBounds();
                let bbqPlaces = [];

                places.forEach((place) => {
                    const markerView = new AdvancedMarkerElement({
                        map,
                        position: place.location,
                        title: place.displayName,
                    });

                    const photoReference = place.photos?.[0]?.Eg?.split("/photos/")[1];
                    const photoUrl = photoReference
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${photoReference}&key=AIzaSyCti6D4xzI5-_D8SgOzAGaBQS9WyIo-bMw`
                        : "default_image.jpg";

                    bbqPlaces.push({
                        name: place.displayName,
                        icon: photoUrl,
                        location: place.formattedAddress,
                        rating: place.rating,
                        ratingCount: place.userRatingCount,
                        priceLevel: place.priceLevel || "N/A",
                        phoneNumber: place.nationalPhoneNumber,
                    });
                    console.log(place.priceLevel)
                });
                console.log(bbqPlaces);

                restaurantTable.innerHTML = "";

                bbqPlaces.forEach((place) => {
                    const infoCard = createBBQInfoCard(place);
                    restaurantTable.appendChild(infoCard);
                });
            } else {
                restaurantTable.innerHTML = "No BBQ places found nearby.";
            }
        } catch (error) {
            console.error("Error searching for BBQ places:", error);
            restaurantTable.innerHTML = "Error searching for BBQ places.";
        }
    }
}

function createBBQInfoCard(place) {
    const card = document.createElement("div");
    card.classList.add("bbq-info-card");

    const image = document.createElement("img");
    image.src = place.icon;
    image.alt = place.name;
    image.loading = "lazy";
    card.appendChild(image);

    const details = document.createElement("div");
    details.classList.add("bbq-details");
    card.appendChild(details);

    const name = document.createElement("h3");
    name.textContent = place.name;
    details.appendChild(name);

    const address = document.createElement("p");
    address.textContent = `Address: ${place.location}`;
    details.appendChild(address);

    const ratingLine = document.createElement("div");
    ratingLine.classList.add("rating-line");
    details.appendChild(ratingLine);

    if (place.rating !== undefined && place.rating !== null) {
        const rating = document.createElement("span");
        rating.textContent = `Rating: ${place.rating} `;
        ratingLine.appendChild(rating);
    }
    if (place.ratingCount !== undefined && place.ratingCount !== null) {
        const ratingCount = document.createElement("span");
        ratingCount.textContent = `(${place.ratingCount} reviews)`;
        ratingLine.appendChild(ratingCount);
    }

    if (place.priceLevel !== undefined && place.priceLevel !== null) {
        const priceLevel = document.createElement("p");
        const priceMap = {
            "FREE": "$",
            "INEXPENSIVE": "$",
            "MODERATE": "$$",
            "EXPENSIVE": "$$$",
            "VERY_EXPENSIVE": "$$$$"
        };
        let priceString = "Price Level: " + (priceMap[place.priceLevel] || "N/A");


        priceLevel.textContent = priceString;
        details.appendChild(priceLevel);
    }

    if (place.phoneNumber) {
        const phone = document.createElement("p");
        phone.textContent = `Phone: ${place.phoneNumber}`;
        details.appendChild(phone);
    }

    const clearDiv = document.createElement("div");
    clearDiv.classList.add("clear");
    card.appendChild(clearDiv);


    return card;
}


window.onload = async function () {
    console.log("Google Maps Loaded");
    await initMap();
    await searchBBQ(32.812973, -97.085035);
};