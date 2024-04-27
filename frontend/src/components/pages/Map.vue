<template>
  <div>
    <div id="map" style="height:90vh;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const initialMap = ref(null);
let geoJson = null;


function getColor(d) {
  return d > 6 ? '#800026' :
      d > 5  ? '#BD0026' :
          d > 4  ? '#E31A1C' :
              d > 3  ? '#FC4E2A' :
                  d > 2   ? '#FD8D3C' :
                      d > 1   ? '#FEB24C' :
                          d > 0   ? '#FED976' :
                              '#FFEDA0';

}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.ID_1),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  layer.bringToFront();
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geoJson.resetStyle(e.target);
  info.update();
}


var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML = '<h4>Flood propability</h4>' +  (props ?
      '<b>' + props.NAME_1 + '</b><br />' + props.ID_1
      : 'Hover over a state');
};



onMounted(async ()=> {
  initialMap.value = L.map('map').setView([24.523120, 54.435570], 8);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);


  function zoomToFeature(e) {
    initialMap.value.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  const response = await fetch('/assets/united-arab-emirates-with-regions_.js');
  if (response.ok) {
    const data = await response.json();

    geoJson = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(initialMap.value);

    info.addTo(initialMap.value);

    console.log(data);
  } else {
    console.error('Failed to load GeoJSON data');
  }

});
</script>

<style>
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;
}
.info h4 {
  margin: 0 0 5px;
  color: #777;
}

</style>
