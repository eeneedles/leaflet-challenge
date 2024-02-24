//Store URL with earthquake data as a constant variable
const earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Create a Leaflet map that is centered on the world
const world_map = L.map("map").setView([0, 0], 2);

// Add a tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(world_map);

// Use fetch to get the earthquake data
fetch(earthquake_url)
  .then(response => response.json())
  .then(data => {
    data.features.forEach(feature => {
      const coordinates = feature.geometry.coordinates;
      const magnitude = feature.properties.mag;
      const depth = feature.geometry.coordinates[2];

      // Create a marker with size and color based on magnitude and depth
      const marker = L.circleMarker([coordinates[1], coordinates[0]], {
        radius: magnitude * 2,
        color: 'black',
        fillColor: 'red',
        weight: 0.5,
        //stroke = true,
        //weight = 1,
        //fillColor: 'red',
        fillOpacity: 0.5
      });

      // Add a popup with additional information
      marker.bindPopup(`<b>Location:</b> ${feature.properties.place}<br><b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km`);

      // Add the marker to the map
      marker.addTo(world_map);
    });
  });

// Create a legend to provide context for your map data
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (world_map) {
  const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<h4>Depth Legend</h4>';
    div.innerHTML += '<i style="background:red"></i><span>(-10-10)</span><br>';
    div.innerHTML += '<i style="background: orange"></i><span>(10-30)</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>(30-50)</span><br>';
    div.innerHTML += '<i style="background: green"></i><span>(50-70)</span><br>';
    div.innerHTML += '<i style="background: blue"></i><span>(70-90)</span><br>';
    div.innerHTML += '<i style="background: purple"></i><span>(90+)</span><br>';

  return div;
};

legend.addTo(world_map);