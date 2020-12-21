//create map & Layer

var myMap = L.map("map", {
    center: [
      37.09, -95.71  
    ],
    zoom: 5,
  });


//tile layer

var Layer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoicmFpbmVycGVycnkiLCJhIjoiY2tpeHJwb2llMG50czJ0cXBkZGc2ajB3bSJ9.FfOQfyZGVXOf8ga8330Dyw"
  }).addTo(myMap);

  function getColor(depth) {
    switch (true) {
    case depth > 90:
      return "#ea2c2c";
    case depth > 70:
      return "#ea822c";
    case depth > 50:
      return "#ee9c00";
    case depth > 30:
      return "#eecc00";
    case depth > 10:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }

 var GeoJSONURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
// Perform a GET request to the query URL
d3.json(GeoJSONURL, function(data) {
  // console.log(data)   
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {

            return L.circleMarker(latlng, {
                radius: (feature.properties.mag)*4,
                fillColor:getColor(feature.geometry.coordinates[2]),
                // color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
        },
        onEachFeature: function(feature, layer) {  
            layer.bindPopup("<h2>" + feature.properties.place + "</h2> <hr> <h2>" + feature.properties.mag + "</h2>");
    }
  }).addTo(myMap);
  
  // Create legend , available on stackover flow
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 1, 2, 3, 4, 5],
      labels = [];

    // loop through density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap);
})


