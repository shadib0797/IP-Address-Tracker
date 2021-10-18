const ipAdd = document.querySelector(".ip-add p");
const position = document.querySelector(".location p");
const timezone = document.querySelector(".timezone p");
const isp = document.querySelector(".isp p");

let mymap = null;
let keys = {};

fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        updateData(data.ip);
    });

fetch("/api")
    .then(response => response.json())
    .then(data => {keys = data})

function updateData(ip) {
    const ipAddress = ip;
    const apiKey = keys.apiKey;
    const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            ipAdd.innerText = data.ip;
            position.innerText = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
            timezone.innerText = `UTC ${data.location.timezone}`;
            isp.innerText = data.isp;

            updateMap(data.location.lat, data.location.lng);
        });

}


function updateMap(lat, lng) {
    mymap = L.map('mapid').setView([lat, lng], 9);

    var myIcon = L.icon({
        iconUrl: "./images/icon-location.svg",
        iconSize: [46, 56]
    });

    L.marker([lat, lng], {
        icon: myIcon
    }).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: keys.accessToken
    }).addTo(mymap);

}


document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();

    const inputValue = document.querySelector("input");
    if (inputValue.value === "") {
        return
    } else {
        mymap.remove();
        updateData(inputValue.value);
    }

})