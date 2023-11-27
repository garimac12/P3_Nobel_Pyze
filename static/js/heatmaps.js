// Define the map
let map = L.map('map').setView([25, -30], 2.5);

let darkMap = L.tileLayer(
    'https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=gyY5igTqRQf5an0OvTN6', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

let marker = L.marker([51.5, -0.09]).addTo(map);

// Combine formatting
let baseMaps = {
    "Dark Map": darkMap,
    "Topo Map": topoMap
};


// Add layer control to switch between base maps and overlays
L.control.layers(baseMaps, overlays).addTo(map);


// Calling the GeoJSON data from the USGS api feed
d3.json("https://api.nobelprize.org/2.1/nobelPrizes?offset=1&limit=100000&sort=desc&nobelPrizeYear=1901&yearTo=2023&format=json").then(function(data) {
    console.log(data);
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.6
        }
    }

    // Creating the markers
    L.geoJson(data, {
        pointToLayer: function(feature, latling) {
            return L.circleMarker(latling);
        },
        style: styleInfo,
        // Creating the clickable pop-ups
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`
                Magnitude: ${feature.properties.mag} <br>
                Depth: ${feature.geometry.coordinates[2]} <br>
                Location: ${feature.properties.place}
            `);
        }
    }).addTo(earthquakes);

    earthquakes.addTo(map);

    // Creating the Legend
    let legend = L.control({
        position: "bottomright"
    });

});