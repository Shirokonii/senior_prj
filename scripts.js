
  fetch('https://raw.githubusercontent.com/Shirokonii/senior_prj/main/data_ta_geojson.geojson')
    .then(response => response.json())
    .then(data => {
      // Loop through the features and add markers to the map
      data.features.forEach(feature => {
        var latA = feature.geometry.coordinates[1]; // Assuming GeoJSON has a Point geometry
        var lonA = feature.geometry.coordinates[0];

        // You can customize the marker popup content here
        var popupContentA = `<p>${feature.properties.title}</p>`;

        // Add marker to the map
        var markerA = L.marker([latA, lonA], { icon: iconTypeB, id: 'marker-type-b' }).addTo(map).bindPopup(popupContentA);

        function toggleMarkers(markerType) {
          switch (markerType) {
            case 'typea':
              markerA.setStyle({ opacity: document.getElementById('checkbox1').checked ? 1 : 0 });
              break;
          }
        }
      })
    });


  fetch('https://raw.githubusercontent.com/Shirokonii/senior_prj/main/data_res_geojson.geojson')
    .then(response => response.json())
    .then(data => {
      // Loop through the features and add markers to the map
      data.features.forEach(feature => {
        var latB = feature.geometry.coordinates[1]; // Assuming GeoJSON has a Point geometry
        var lonB = feature.geometry.coordinates[0];

        // You can customize the marker popup content here
        var popupContentB = `<p>${feature.properties.title}</p>`;

        // Add marker to the map
        var markerB = L.marker([latB, lonB], { icon: iconTypeA, id: 'marker-type-a' }).addTo(map).bindPopup(popupContentB);
        function toggleMarkers(markerType) {
          switch (markerType) {
            case 'typeb':
              markerB.setStyle({ opacity: document.getElementById('checkbox2').checked ? 1 : 0 });
              break;
          }
        }
      })
    });

  fetch('https://raw.githubusercontent.com/Shirokonii/senior_prj/main/data_acc_geojson.geojson')
    .then(response => response.json())
    .then(data => {
      // Loop through the features and add markers to the map
      data.features.forEach(feature => {
        var latC = feature.geometry.coordinates[1]; // Assuming GeoJSON has a Point geometry
        var lonC = feature.geometry.coordinates[0];

        // You can customize the marker popup content here
        var popupContentC = `<p>${feature.properties.title}</p>`;

        // Add marker to the map
        var markerC = L.marker([latC, lonC], { icon: iconTypeC, id: 'marker-type-c' }).addTo(map).bindPopup(popupContentC);
        function toggleMarkers(markerType) {
          switch (markerType) {
            case 'typec':
              markerC.setStyle({ opacity: document.getElementById('checkbox3').checked ? 1 : 0 });
              break;
          }
        }
      })
    });