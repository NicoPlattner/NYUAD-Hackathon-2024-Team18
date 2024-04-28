<template>
  <div>
    <div id="map" style="height:90vh;"></div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import eventBus from "@/eventBus.js";

const initialMap = ref(null);
let geoJson = null;
let features = [];
let data = null;


function getColor(d) {
  d = d*10;
  return d > 9 ? '#800026' :
          d > 7 ? '#E31A1C' :
                  d > 5 ? '#FD8D3C' :
                          d > 2 ? '#FED976' :
                              '#FFEDA0';

}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.PROB),
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
  this._div.innerHTML = '<h4>Flood probability</h4>' + (props ?
      '<b>' + props.NAME_1 + '</b><br />' + props.ID_1
      : 'Hover over a state');
};


onMounted(async () => {
  initialMap.value = L.map('map').setView([24.523120, 54.435570], 8);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);

  await fetch('https://nyuad-hackathon-2024-team18.onrender.com/read_csv')
      .then(response => response.json())
      .then(d => {
        data = d;
      })


  function zoomToFeature(e) {
    initialMap.value.fitBounds(e.target.getBounds());
  }

  eventBus.$on('citySelected', (city) => {
    zoomToFeature({target: Object.values(geoJson._layers).filter(f => f.feature.properties.ID_1 === parseInt(city))[0]})
  })

  eventBus.$on('dateSelected', async (date) => {
    const formatedDate = date.substring(8,10) + '.' + date.substring(5,7) + '.' + date.substring(0,4)
    const dateData = data.data.filter(d => d[0] === formatedDate);

    const r = await fetch('/assets/united-arab-emirates-with-regions_.js');


    if (r.ok) {
      const d = await r.json();
      d.features.forEach(feature => {
        const regionName = feature.properties.NAME_1;
        const regionData = dateData.filter(d => d[1] === regionName);
        if (regionData.length === 0) {
          return;
        }
        feature.properties.PROB = regionData[0][2];
      })

      console.log(d)

      geoJson = L.geoJson(d, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(initialMap.value);
    }
  })

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

    console.log(geoJson)
    info.addTo(initialMap.value);
    features = data.features;
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
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.info h4 {
  margin: 0 0 5px;
  color: #777;
}

</style>
