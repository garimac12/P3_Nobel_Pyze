
// Define tile layers for different styles
let darkMap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Map data: &copy; OpenStreetMap contributors, Tiles by Stamen Design'
});

let topoMap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: 'Map data: &copy; OpenTopoMap contributors, Tiles by Stamen Design'
});

// Define the default base map
let defaultMap = streetMap;

// Define the map
let map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [defaultMap]
});

// Combine formatting
let baseMaps = {
    "Street Map": streetMap,
    "Topo Map": topoMap
};

// Adding Tectonic Map Data
let tectonicPlates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let overlays = {
    "Tectonic Plates": tectonicPlates,
    "Earthquakes": earthquakes
};

// Add layer control to switch between base maps and overlays
L.control.layers(baseMaps, overlays).addTo(map);


// Creating color function
function getColor(depth) {
    if(depth > 90) {
        return "#ea2c2c"  
    } else if(depth > 70) {
        return "#ea822c"
    } else if(depth > 50) {
        return "#ee9c00"
    } else if(depth > 30) {
        return "#eecc00"
    } else if(depth >10) {
        return "#d4ee00"
    }
    else {
        return "#98ee00"
    }
}

// Creating radius function
function getRadius(magnitude){
    if(magnitude === 0) {
        return 1
    }    
    return magnitude * 4
}

// Calling the GeoJSON data from the USGS api feed
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
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

    // Formatting the Legend
    legend.onAdd = function(){
        let container = L.DomUtil.create("div", "info legend");
        let grades = [-10, 10, 30, 50, 70, 90];
        let colors = ['#98ee00', '#d4ee00', '#eecc00', '#ee9c00', '#ea822c', '#ea2c2c'];
        for (let index = 0; index < grades.length; index++) {
            container.innerHTML += `<i style="background: ${colors[index]}"></i> ${grades[index]}+ <br>`
        }
        return container;
    };

    legend.addTo(map);

    // Pulling Tectonic map from the the Fraxen boundaries json
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData){
        L.geoJson(plateData, {
            color: "orange",
            width: 3,
        }).addTo(tectonicPlates);

        tectonicPlates.addTo(map);

    });
});


