var mymap = L.map('main_map').setView([41.38089905,2.12292250075175], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

L.marker([41.38089905,2.12292250075175]).addTo(mymap);
L.marker([41.38189905,2.12392250075175]).addTo(mymap);
L.marker([41.38289905,2.12492250075175]).addTo(mymap);