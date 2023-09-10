// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL (Mon4thSep activity10)
d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function (Mon4thSep activity10).
    createFeatures(data.features);
  });

//create a function: data markers should reflect the magnitude of the earthquake by their size
function markerSize(magnitude) {
    return magnitude * 3;
};

//create a function: depth of the earthquake by colour
function markerColor(depth) {
    if (depth < 10) return "#FACFCE";
    else if (depth < 30) return "#EAAAC7";
    else if (depth < 50) return "#DB9648";
    else if (depth < 70) return "#B34029";
    else if (depth < 90) return "#D50812";
    else return "#503984";
}  

function createFeatures(earthquakeData) {  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the magnitude of the earthquake by their size and the depth of the earthquake by colour
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.75
            });
        },
        onEachFeature: onEachFeature,
    });

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    
    });

    // Define topography layer
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Define a baseMaps object to hold our base layers
    let baseMaps = {
        "Street map": street,
        "Topographic Map": topo
    };
    
    // Create overlay object to hold our overlay layer
    let overlayMaps = {
        Earthquakes: earthquakes
    };

       // Create our map, giving it the streetmap and earthquakes layers to display on load
    let myMap = L.map("map", {
        center: [
            -25.3444, 131.0369
        ],
        zoom: 4,
        layers: [street, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function(map) {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [-10, 10, 30, 50, 70, 90];
        const labels = [];
        const legendInfo = "<strong>Depth</strong>";
        div.innerHTML = legendInfo;

    // Loop through the magnitudes array and generate the legend HTML
    for (let i = 0; i < magnitudes.length; i++) {
    const from = magnitudes[i];
    const to = magnitudes[i + 1];
    labels.push(
        '<li style="background-color:' +
        markerColor(from + 1) +
        '"> <span>' +
        from +
        (to ? '&ndash;' + to : '+') +
        '</span></li>'
      );
    }

    // Add label items to the div under the <ul> tag
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};

// Add legend to the map
legend.addTo(myMap);
};

