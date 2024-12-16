
let input = document.querySelector(`#ip-input`);
const address = document.querySelector(`#address`);
const myLocation = document.querySelector(`#location`);
const zone = document.querySelector(`#zone`);
const isp = document.querySelector(`#isp`);
const verify = document.querySelector(`.verify`);

let cords = [34.08057, -118.07285];

async function getIpData(ip){
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7paJeRBjYAmXJSrsDF3M755NuD3eD&ipAddress=${ip}`);
        const ipData = await response.json();
        console.log(ipData);
        address.textContent = `${ipData.ip}`;
        myLocation.textContent = `${ipData.location.city}, ${ipData.location.country}`;
        zone.textContent = `${ipData.location.timezone}`;
        isp.textContent = `${ipData.isp}`;
        input.value = '';
        cords = [ipData.location.lat, ipData.location.lng];

        map.flyTo(cords, 13);
        L.marker(cords).addTo(map)
            .bindPopup(`<p style="text-align: center;">Your current location <br> on the map.</p>`)
            .openPopup();
    } catch (error) {
        console.error('Error fetching IP data:', error);
    }
}

function validateIP(ip){
    const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(regex.test(ip)){
        getIpData(ip);
    }
}

verify.addEventListener('click', ()=>{
    const ip = input.value.trim();
    validateIP(ip);
});


var map = L.map('map').setView(cords, 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

L.marker(cords).addTo(map)
    .bindPopup('<p style="text-align: center;">You are here now <br> on the map.</p>')
    .openPopup();